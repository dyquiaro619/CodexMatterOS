import { TopNav } from "@/components/top-nav";

const pipeline = [
  {
    step: "Detect",
    title: "Signal Captured",
    body: "External policy changes are logged as immutable events. The ledger never overwrites history."
  },
  {
    step: "Classify",
    title: "Exposure Mapped",
    body: "Deterministic rules cross-reference changes against all active matters and affected stages."
  },
  {
    step: "Surface",
    title: "Risk Scored",
    body: "Affected matters are prioritized by exposure score so partners see signal before noise."
  },
  {
    step: "Protect",
    title: "Decision Anchored",
    body: "Strategy response is attached to a policy snapshot for legal explainability and auditability."
  }
];

const states = [
  {
    title: "All Clear",
    body: "No active exposure. Silence means operational stability."
  },
  {
    title: "Watch Mode",
    body: "Volatility is being absorbed and mapped without unnecessary escalation."
  },
  {
    title: "Escalation",
    body: "Partner judgment is required now with full context and deterministic rationale."
  }
];

export default function PolicyWhiplashPage() {
  return (
    <>
      <TopNav />
      <main className="exp-shell">
        <section className="exp-hero">
          <p className="exp-eyebrow">Visual Explainer</p>
          <h1>Policy whiplash is a volatility absorption problem.</h1>
          <p>
            Immigration policy changes are constant. MatterOS absorbs that volatility at infrastructure
            level so attorneys can focus on judgment, not emergency triage.
          </p>
        </section>

        <section className="exp-grid exp-grid-2">
          <article className="exp-card exp-card-danger">
            <h2>Without MatterOS</h2>
            <ul className="exp-list">
              <li>Manual scramble across spreadsheets and memory</li>
              <li>Affected matters discovered late</li>
              <li>Higher chance of missed deadlines and malpractice exposure</li>
              <li>Attorneys become volatility bottlenecks</li>
            </ul>
          </article>

          <article className="exp-card exp-card-success">
            <h2>With MatterOS</h2>
            <ul className="exp-list">
              <li>Policy signal ingested and logged immediately</li>
              <li>Exposure mapped across active matters in minutes</li>
              <li>Prioritized intervention list for partner review</li>
              <li>Full audit trail linked to policy state and decisions</li>
            </ul>
          </article>
        </section>

        <section className="exp-section">
          <h2>The Volatility Engine Pipeline</h2>
          <div className="exp-grid exp-grid-4">
            {pipeline.map((item) => (
              <article className="exp-card exp-card-soft" key={item.title}>
                <p className="exp-step">{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="exp-section">
          <h2>Three states, not two</h2>
          <div className="exp-grid exp-grid-3">
            {states.map((item) => (
              <article className="exp-card exp-card-soft" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="exp-note">
            Watch Mode is the critical layer. Traditional tools jump from silence to panic.
          </p>
        </section>
      </main>
    </>
  );
}
