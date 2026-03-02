"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PRIMARY_ITEMS = [
  { href: "/command-center", label: "Command Bridge" },
  { href: "/matters", label: "Matters" },
  { href: "/policy-snapshots", label: "Policy Snapshots" },
  { href: "/", label: "Value to Firm" }
] as const;

const LEARN_ITEMS = [
  { href: "/landing/index.html", label: "Overview" },
  { href: "/landing/how-it-works.html", label: "How It Works" },
  { href: "/landing/policy-whiplash.html", label: "Policy Whiplash" },
  { href: "/landing/signal-authority.html", label: "Signal Authority" },
  { href: "/landing/command-bridge.html", label: "Command Bridge" }
] as const;

export function TopNav() {
  const pathname = usePathname();
  const [learnOpen, setLearnOpen] = useState(false);
  const learnMenuRef = useRef<HTMLDivElement | null>(null);

  const isLearnActive = LEARN_ITEMS.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("matteros-theme");
    const preferredLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const nextTheme = saved === "light" || (!saved && preferredLight) ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("matteros-theme", nextTheme);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!learnMenuRef.current) {
        return;
      }

      if (!learnMenuRef.current.contains(event.target as Node)) {
        setLearnOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("matteros-theme", nextTheme);
  }

  function isPrimaryActive(href: string): boolean {
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav className="mtr-nav" aria-label="MatterOS sections">
      <div className="mtr-nav-inner">
        <Link href="/" className="mtr-nav-logo">
          Matter<span>OS</span>
        </Link>

        <div className="mtr-nav-links">
          {PRIMARY_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mtr-nav-link${isPrimaryActive(item.href) ? " active" : ""}`}
              onClick={() => setLearnOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="mtr-nav-dropdown" ref={learnMenuRef}>
            <button
              type="button"
              className={`mtr-nav-link mtr-nav-dropdown-trigger${
                isLearnActive ? " active" : ""
              }`}
              onClick={() => setLearnOpen((current) => !current)}
              aria-expanded={learnOpen}
              aria-haspopup="menu"
              aria-label="Open Learn menu"
            >
              Learn
              <span className="mtr-nav-caret">▾</span>
            </button>

            <div className={`mtr-nav-dropdown-menu${learnOpen ? " open" : ""}`} role="menu">
              {LEARN_ITEMS.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mtr-nav-dropdown-item${active ? " active" : ""}`}
                    role="menuitem"
                    onClick={() => setLearnOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mtr-nav-actions">
          <button className="mtr-theme-btn" onClick={toggleTheme} type="button">
            Toggle theme
          </button>

          <a
            className="mtr-nav-cta"
            href="https://calendly.com/automationlegal/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Request Demo
          </a>
        </div>
      </div>
    </nav>
  );
}
