import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MatterOS Command Bridge",
  description: "Operational command surface for legal risk posture and escalation decisions."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
