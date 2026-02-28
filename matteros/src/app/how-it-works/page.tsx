import { TopNav } from "@/components/top-nav";

const architecture = [
  {
    id: "01",
    title: "Append-only Event Ledger",
    body: "Stage changes, policy attachments, and risk flags are immutable events with actor and timestamp."
  },
  {
    id: "02",
    title: "Policy Snapshot Binding",
    body: "Every meaningful decision is linked to its policy state so future review is reconstructable and defensible."
  },
  {
    id: "03",
    title: "Controlled Stage Machine",
    body: "Only permitted stage transitions are accepted; invalid transitions are rejected before they cause exposure."
  },
  {
    id: "04",
    title: "Deterministic Risk Detection",
    body: "Freshness, dependency, and time-pressure scores drive explainable risk states for each matter."
  },
  {
    id: "05",
    title: "Tenant Isolation",
    body: "All queries are organization scoped with role-based access and transactional invite onboarding."
  },
  {
    id: "06",
    title: "Explainable by Design",
    body: "No black-box legal recommendations. Every output maps to explicit rules, events, and policy context."
  }
];

const capabilityRows = [
  ["Immutable event history", "Provable chain of decisions from intake to resolution"],
  ["Policy whiplash mapping", "Affected matters surfaced by deterministic exposure scoring"],
  ["Partner command surface", "5-layer view for rapid governance decisions"],
  ["Watch Mode absorption", "Escalation only when partner judgment has high leverage"],
  ["Org-level isolation", "Hard boundary between firms and role-scoped access"]
];

export default function HowItWorksPage() {
  return (
    <>
      <TopNav />
      <main className="exp-shell">
        <section className="exp-hero">
          <p className="exp-eyebrow">Architecture</p>
          <h1>How MatterOS works and why it is defensible.</h1>
          <p>
            The platform is built for legal explainability, deterministic risk handling, and audit
            integrity under policy volatility.
          </p>
        </section>

        <section className="exp-grid exp-grid-2">
          <article className="exp-card exp-card-soft">
            <h2>Guiding principle</h2>
            <p>
              Legal explainability over black-box AI. Deterministic audit trails over probabilistic
              suggestions. Compliance you can prove.
            </p>
          </article>
          <article className="exp-card exp-card-soft">
            <h2>Operational posture</h2>
            <p>
              Detection, interpretation, and direction are coupled. If intervention is needed, it
              arrives scored, contextualized, and ready for partner judgment.
            </p>
          </article>
        </section>

        <section className="exp-section">
          <h2>Core architecture layers</h2>
          <div className="exp-grid exp-grid-3">
            {architecture.map((item) => (
              <article className="exp-card exp-card-soft" key={item.id}>
                <p className="exp-step">Layer {item.id}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="exp-section">
          <h2>Capabilities map</h2>
          <div className="exp-table">
            <div className="exp-table-row exp-table-head">
              <span>Capability</span>
              <span>Why it matters</span>
            </div>
            {capabilityRows.map(([capability, value]) => (
              <div className="exp-table-row exp-table-row-2" key={capability}>
                <span>{capability}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
