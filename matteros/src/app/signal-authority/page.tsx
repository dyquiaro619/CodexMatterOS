import { TopNav } from "@/components/top-nav";

const principles = [
  {
    title: "Deterministic Rules",
    body: "Alerts fire on explicit rules, not model speculation."
  },
  {
    title: "Exposure Scoring",
    body: "Risk is prioritized by deadline compression, complexity, and policy volatility."
  },
  {
    title: "Absorption Layer",
    body: "Watch Mode absorbs low-leverage drift before it reaches partner attention."
  },
  {
    title: "Full Context",
    body: "When surfaced, each signal includes trigger, impact, policy state, and recommended action."
  }
];

const scenarios = [
  {
    case: "Client uploads a document",
    typical: "Generates notifications across channels",
    matteros: "Logged silently without partner interruption"
  },
  {
    case: "Case stage changes",
    typical: "Broadcast status updates to multiple people",
    matteros: "Recorded in ledger and visible on 48-hour docket"
  },
  {
    case: "Deadline within 7 days",
    typical: "Competes with noisy reminder stream",
    matteros: "Scored escalation with full context"
  },
  {
    case: "Policy change affects active matters",
    typical: "Discovered manually after delay",
    matteros: "Mapped and prioritized automatically"
  },
  {
    case: "No issues for weeks",
    typical: "Still sends low-value summaries",
    matteros: "Silence confirms stable posture"
  }
];

export default function SignalAuthorityPage() {
  return (
    <>
      <TopNav />
      <main className="exp-shell">
        <section className="exp-hero">
          <p className="exp-eyebrow">Visual Explainer</p>
          <h1>Signal Authority</h1>
          <p>
            MatterOS speaks rarely. When it does, everyone listens. Silence is not absence; it is
            verified stability.
          </p>
        </section>

        <section className="exp-grid exp-grid-2">
          <article className="exp-card exp-card-soft">
            <h2>Alert fatigue problem</h2>
            <p>
              Most legal software confuses activity with relevance. High-volume notifications train
              users to ignore everything, including critical interventions.
            </p>
          </article>
          <article className="exp-card exp-card-soft">
            <h2>MatterOS response</h2>
            <p>
              The system earns interruption rights by proving discretion first. Low-value drift is
              absorbed; high-leverage interventions are escalated with context.
            </p>
          </article>
        </section>

        <section className="exp-section">
          <h2>How Signal Authority works</h2>
          <div className="exp-grid exp-grid-4">
            {principles.map((item) => (
              <article className="exp-card exp-card-soft" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="exp-section">
          <h2>Signal Authority in practice</h2>
          <div className="exp-table">
            <div className="exp-table-row exp-table-head">
              <span>Scenario</span>
              <span>Typical Tool</span>
              <span>MatterOS</span>
            </div>
            {scenarios.map((entry) => (
              <div className="exp-table-row" key={entry.case}>
                <span>{entry.case}</span>
                <span>{entry.typical}</span>
                <span>{entry.matteros}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
