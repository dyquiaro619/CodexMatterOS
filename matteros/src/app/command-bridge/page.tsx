import { TopNav } from "@/components/top-nav";

const layers = [
  {
    title: "Firm Pulse",
    body: "Binary posture signal: stable or attention required."
  },
  {
    title: "Exposure Window",
    body: "Only matters in Watch Mode or escalation with scored context."
  },
  {
    title: "48-Hour Docket",
    body: "Bounded execution horizon for partner-relevant decisions."
  },
  {
    title: "Practice Health Snapshot",
    body: "Cross-firm stage distribution, throughput, and posture trends."
  },
  {
    title: "Operational Closure",
    body: "Proves what was completed today and what risk was neutralized."
  }
];

const trust = [
  {
    title: "Mechanical Trust",
    body: "Every event is immutable. Every policy state is captured. Every score is deterministic."
  },
  {
    title: "Judgment Trust",
    body: "MatterOS does not cry wolf. Signals are sparse, contextual, and partner-relevant."
  }
];

export default function CommandBridgePage() {
  return (
    <>
      <TopNav />
      <main className="exp-shell">
        <section className="exp-hero">
          <p className="exp-eyebrow">Visual Explainer</p>
          <h1>The Partner Command Bridge</h1>
          <p>
            Five intentional layers of information so a managing partner can understand firm health
            in 30 seconds.
          </p>
        </section>

        <section className="exp-quote">
          <p>
            Most dashboards show everything. The Command Bridge shows only what earns the right to
            reach partner attention.
          </p>
        </section>

        <section className="exp-section">
          <h2>Five layers of intentional clarity</h2>
          <div className="exp-stack">
            {layers.map((layer, index) => (
              <article className="exp-layer" key={layer.title}>
                <span className="exp-layer-num">{index + 1}</span>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="exp-grid exp-grid-2">
          <article className="exp-card exp-card-soft">
            <h2>Typical dashboard</h2>
            <ul className="exp-list">
              <li>Shows everything, forcing manual triage</li>
              <li>High alert volume erodes urgency</li>
              <li>Partner still connects the dots manually</li>
            </ul>
          </article>

          <article className="exp-card exp-card-soft">
            <h2>MatterOS command bridge</h2>
            <ul className="exp-list">
              <li>Surfaces only scored, contextualized interventions</li>
              <li>Silence communicates stability</li>
              <li>System does triage, partner provides judgment</li>
            </ul>
          </article>
        </section>

        <section className="exp-grid exp-grid-2">
          {trust.map((item) => (
            <article className="exp-card exp-card-soft" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
