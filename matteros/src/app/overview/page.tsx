import Link from "next/link";
import { TopNav } from "@/components/top-nav";

const conceptCards = [
  {
    href: "/policy-whiplash",
    title: "Policy Whiplash",
    body: "How MatterOS absorbs policy volatility before it becomes attorney panic.",
    tag: "Explainer 1"
  },
  {
    href: "/command-bridge",
    title: "Partner Command Bridge",
    body: "Five intentional layers so a managing partner can assess firm health in 30 seconds.",
    tag: "Explainer 2"
  },
  {
    href: "/signal-authority",
    title: "Signal Authority",
    body: "The system earns the right to interrupt by proving it knows when not to.",
    tag: "Explainer 3"
  }
];

const pillars = [
  {
    title: "Event Ledger",
    body: "Append-only matter history. Every stage change, risk flag, and policy attachment is immutable."
  },
  {
    title: "Policy Snapshot",
    body: "Decision context is frozen at the moment of action so legal reasoning remains auditable later."
  },
  {
    title: "Risk Engine",
    body: "Deterministic IF/THEN rules score exposure and surface only partner-relevant interventions."
  }
];

export default function OverviewPage() {
  return (
    <>
      <TopNav />
      <main className="exp-shell">
        <section className="exp-hero">
          <p className="exp-eyebrow">Firm Stability Platform</p>
          <h1>The operating system for immigration law.</h1>
          <p>
            MatterOS is legal orchestration infrastructure: converting external chaos into internal
            clarity before it reaches your team.
          </p>
        </section>

        <section className="exp-quote">
          <p>
            Stripe stabilizes payments. AWS stabilizes computing. MatterOS stabilizes legal execution.
          </p>
        </section>

        <section className="exp-grid exp-grid-3">
          {conceptCards.map((card) => (
            <Link className="exp-card" key={card.title} href={card.href}>
              <span className="exp-card-tag">{card.tag}</span>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
              <span className="exp-card-link">Read Explainer</span>
            </Link>
          ))}
        </section>

        <section className="exp-grid exp-grid-3">
          {pillars.map((pillar) => (
            <article className="exp-card exp-card-soft" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
