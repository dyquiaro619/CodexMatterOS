"use client";

import { useMemo, useState } from "react";

type Tier = {
  name: string;
  fit: string;
  scope: string;
};

type RoleTrack = {
  id: string;
  label: string;
  title: string;
  text: string;
};

const tiers: Tier[] = [
  { name: "Essential", fit: "Solo and small teams", scope: "Pilot Scope" },
  { name: "Professional", fit: "Growing partner groups", scope: "Core Adoption" },
  { name: "Enterprise", fit: "Multi-office operations", scope: "Firmwide Control" },
  { name: "Mission-Critical", fit: "High-exposure firms", scope: "Advanced Coverage" }
];

const roleTracks: RoleTrack[] = [
  {
    id: "managing-partner",
    label: "Managing Partner",
    title: "What This Means For Your Firm",
    text: "Your firm already has systems to organize matters. What you are buying here is decision integrity under policy volatility: earlier risk detection, less emergency intervention, and faster evidence when a decision must be defended."
  },
  {
    id: "practice-lead",
    label: "Practice Lead",
    title: "What This Means For Your Team",
    text: "Your team gets one clear operational model for how policy changes affect active matters. That reduces interpretation drift across attorneys, lowers avoidable rework, and gives you consistent quality at scale."
  },
  {
    id: "operations",
    label: "Operations",
    title: "What This Means For Day-to-Day Control",
    text: "You get a live command surface where matter risk states, policy snapshots, and escalation signals are connected. This turns late surprises into trackable interventions while there is still time to act."
  }
];

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});

function formatMoney(value: number): string {
  return moneyFormatter.format(value);
}

function formatNumber(value: number): string {
  return numberFormatter.format(Math.round(value));
}

function chooseTier(price: number, matterVolume: number): Tier {
  if (price >= 300000 || matterVolume >= 2200) {
    return tiers[3];
  }

  if (price >= 150000 || matterVolume >= 1100) {
    return tiers[2];
  }

  if (price >= 75000 || matterVolume >= 420) {
    return tiers[1];
  }

  return tiers[0];
}

export function ValueToFirmView() {
  const [matters, setMatters] = useState(900);
  const [avgFee, setAvgFee] = useState(7500);
  const [policySensitiveShare, setPolicySensitiveShare] = useState(62);
  const [incidentRate, setIncidentRate] = useState(5);
  const [incidentCost, setIncidentCost] = useState(90000);
  const [captureRate, setCaptureRate] = useState(12);
  const [confidence, setConfidence] = useState(75);
  const [activeRole, setActiveRole] = useState<RoleTrack["id"]>(roleTracks[0].id);

  const model = useMemo(() => {
    const atRiskMatters = matters * (policySensitiveShare / 100);
    const incidentsPerYear = (matters / 100) * incidentRate;

    const incidentLoss = incidentsPerYear * incidentCost;
    const reworkLoss = atRiskMatters * avgFee * 0.08;

    const partnerHours = incidentsPerYear * 14 + atRiskMatters * 0.45;
    const partnerTimeLoss = partnerHours * 520;

    const totalExposure = incidentLoss + reworkLoss + partnerTimeLoss;
    const protectedValue = totalExposure * (captureRate / 100) * (confidence / 100);

    return {
      atRiskMatters,
      incidentsPerYear,
      incidentLoss,
      reworkLoss,
      partnerHours,
      partnerTimeLoss,
      totalExposure,
      protectedValue,
      selectedTier: chooseTier(protectedValue, matters)
    };
  }, [matters, policySensitiveShare, incidentRate, incidentCost, avgFee, captureRate, confidence]);

  const activeTrack = roleTracks.find((track) => track.id === activeRole) ?? roleTracks[0];
  return (
    <main className="value-shell">
      <section className="value-hero">
        <p className="value-eyebrow">Value To Firm</p>
        <h1>Operational Risk Control For Immigration Firms</h1>
      </section>

      <section className="value-section">
        <h2>What Policy Volatility Is Likely Costing Your Firm Each Year</h2>
        <p>
          Set your firm profile. The model estimates the financial impact of late risk discovery,
          avoidable rework, and partner escalation time.
        </p>

        <div className="value-grid value-grid-main">
          <article className="value-panel">
            <label className="value-field" htmlFor="matters-range">
              <span>Annual active matters</span>
              <strong>{formatNumber(matters)}</strong>
              <input
                id="matters-range"
                type="range"
                min={120}
                max={3200}
                step={20}
                value={matters}
                onChange={(event) => setMatters(Number(event.currentTarget.value))}
              />
            </label>

            <label className="value-field" htmlFor="fee-range">
              <span>Average fee per matter</span>
              <strong>{formatMoney(avgFee)}</strong>
              <input
                id="fee-range"
                type="range"
                min={2000}
                max={22000}
                step={250}
                value={avgFee}
                onChange={(event) => setAvgFee(Number(event.currentTarget.value))}
              />
            </label>

            <label className="value-field" htmlFor="sensitive-range">
              <span>Policy-sensitive matter share</span>
              <strong>{policySensitiveShare}%</strong>
              <input
                id="sensitive-range"
                type="range"
                min={15}
                max={95}
                step={1}
                value={policySensitiveShare}
                onChange={(event) => setPolicySensitiveShare(Number(event.currentTarget.value))}
              />
            </label>

            <label className="value-field" htmlFor="incident-rate-range">
              <span>Late risk incidents per 100 matters</span>
              <strong>{incidentRate} / 100</strong>
              <input
                id="incident-rate-range"
                type="range"
                min={1}
                max={18}
                step={1}
                value={incidentRate}
                onChange={(event) => setIncidentRate(Number(event.currentTarget.value))}
              />
            </label>

            <label className="value-field" htmlFor="incident-cost-range">
              <span>Average cost per incident</span>
              <strong>{formatMoney(incidentCost)}</strong>
              <input
                id="incident-cost-range"
                type="range"
                min={15000}
                max={260000}
                step={5000}
                value={incidentCost}
                onChange={(event) => setIncidentCost(Number(event.currentTarget.value))}
              />
            </label>
          </article>

          <article className="value-panel value-metrics">
            <div className="value-metric-card">
              <span>At-risk matters</span>
              <strong>{formatNumber(model.atRiskMatters)}</strong>
            </div>
            <div className="value-metric-card">
              <span>Expected incidents</span>
              <strong>{formatNumber(model.incidentsPerYear)} / year</strong>
            </div>
            <div className="value-metric-card">
              <span>Partner escalation time</span>
              <strong>{formatNumber(model.partnerHours)} hours</strong>
            </div>
            <div className="value-metric-card danger">
              <span>Estimated preventable exposure</span>
              <strong>{formatMoney(model.totalExposure)}</strong>
            </div>

            <div className="value-breakdown">
              <div>
                <span>Incident loss</span>
                <strong>{formatMoney(model.incidentLoss)}</strong>
              </div>
              <div>
                <span>Rework leakage</span>
                <strong>{formatMoney(model.reworkLoss)}</strong>
              </div>
              <div>
                <span>Partner time drain</span>
                <strong>{formatMoney(model.partnerTimeLoss)}</strong>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="value-section">
        <h2>How MatterOS Protects Decisions Your Firm Must Defend</h2>

        <div className="value-grid value-grid-3">
          <article className="value-panel">
            <h3>Policy Snapshots</h3>
            <p>
              Every clearance decision is anchored to the exact rule-set active at that moment, so your
              firm can explain past decisions even after policy changes.
            </p>
          </article>

          <article className="value-panel">
            <h3>Command Bridge Signals</h3>
            <p>
              Matter exposure, deadlines, and policy dependencies are surfaced together so your team can
              act while risk is still controllable.
            </p>
          </article>

          <article className="value-panel">
            <h3>Immutable Event Ledger</h3>
            <p>
              Matter actions are recorded in sequence with no retroactive rewrite, creating durable
              evidence for partner review, client communication, and audits.
            </p>
          </article>
        </div>
      </section>

      <section className="value-section">
        <h2>What Value Realization Can Look Like For Your Firm</h2>
        <p>
          This estimate focuses on risk-value protected for your firm. Commercial terms are scoped
          separately after workflow and risk-baseline review.
        </p>

        <div className="value-grid value-grid-main">
          <article className="value-panel">
            <label className="value-field" htmlFor="capture-range">
              <span>Value Capture Rate</span>
              <strong>{captureRate}%</strong>
              <input
                id="capture-range"
                type="range"
                min={8}
                max={50}
                step={1}
                value={captureRate}
                onChange={(event) => setCaptureRate(Number(event.currentTarget.value))}
              />
            </label>

            <label className="value-field" htmlFor="confidence-range">
              <span>Execution Confidence</span>
              <strong>{confidence}%</strong>
              <input
                id="confidence-range"
                type="range"
                min={60}
                max={100}
                step={1}
                value={confidence}
                onChange={(event) => setConfidence(Number(event.currentTarget.value))}
              />
            </label>

            <div className="value-anchor">
              <span>Estimated Annual Value Protected</span>
              <strong>{formatMoney(model.protectedValue)}</strong>
              <p>
                Based on {captureRate}% capture of estimated preventable exposure with {confidence}%
                confidence.
              </p>
            </div>
          </article>

          <article className="value-panel">
            <div className="value-tier-header">
              <span>Recommended Rollout Stage</span>
              <strong>{model.selectedTier.scope}</strong>
            </div>

            <div className="value-tier-list">
              {tiers.map((tier) => {
                const active = tier.name === model.selectedTier.name;

                return (
                  <div className={`value-tier${active ? " active" : ""}`} key={tier.name}>
                    <div>
                      <strong>{tier.name}</strong>
                      <span>{tier.fit}</span>
                    </div>
                    <strong>{tier.scope}</strong>
                  </div>
                );
              })}
            </div>

            <p className="value-founding-note">
              Investment is finalized after firm-specific discovery. Early conversations stay focused on
              operational outcomes and risk reduction priorities.
            </p>
          </article>
        </div>
      </section>

      <section className="value-section">
        <h2>How This Value Appears Across Your Leadership Team</h2>

        <div className="value-role-tabs" role="tablist" aria-label="Role-based messaging">
          {roleTracks.map((track) => {
            const active = track.id === activeRole;
            return (
              <button
                key={track.id}
                className={`value-role-tab${active ? " active" : ""}`}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveRole(track.id)}
              >
                {track.label}
              </button>
            );
          })}
        </div>

        <article className="value-panel value-role-card">
          <h3>{activeTrack.title}</h3>
          <p>{activeTrack.text}</p>
        </article>
      </section>
    </main>
  );
}
