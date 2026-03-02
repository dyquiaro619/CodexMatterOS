import Link from "next/link";
import type { CSSProperties } from "react";
import type {
  AtRiskMatter,
  CommandCenterData,
  ExposureState,
  OperationalPosture
} from "@/lib/types";

const exposureOrder: Record<ExposureState, number> = {
  STRATEGIC_RISK: 3,
  REVIEW_REQUIRED: 2,
  MONITORING: 1,
  STABLE: 0
};

type MatterRowStatus = "AT_RISK" | "WATCH" | "ON_TRACK";

type DocketItem = {
  id: string;
  title: string;
  dueText: string;
  action: string;
  status: MatterRowStatus;
};

function hoursUntil(deadlineAt?: string): number | null {
  if (!deadlineAt) {
    return null;
  }

  const due = Date.parse(deadlineAt);
  if (Number.isNaN(due)) {
    return null;
  }

  return (due - Date.now()) / (1000 * 60 * 60);
}

function formatLastEvaluated(timestamp: string): string {
  const parsed = Date.parse(timestamp);
  if (Number.isNaN(parsed)) {
    return "Last evaluated: unknown";
  }

  const minutes = Math.max(1, Math.round((Date.now() - parsed) / (1000 * 60)));
  if (minutes < 60) {
    return `Last evaluated ${minutes}m ago`;
  }

  const hours = Math.round(minutes / 60);
  return `Last evaluated ${hours}h ago`;
}

function derivePosture(data: CommandCenterData): OperationalPosture {
  const strategicRisk = data.dashboard.riskCounts.strategicRisk;
  const hasUrgentDeadline = data.atRiskMatters.some((matter) => {
    const hours = hoursUntil(matter.deadlineAt);
    return hours !== null && hours <= 24;
  });

  if (strategicRisk > 0 || hasUrgentDeadline) {
    return "IMMEDIATE_RISK";
  }

  const attentionSignals =
    data.dashboard.escalations > 0 ||
    data.dashboard.deadlinesNext7Days > 0 ||
    data.dashboard.riskCounts.reviewRequired > 0;

  return attentionSignals ? "ATTENTION_REQUIRED" : "STABLE";
}

function postureText(posture: OperationalPosture): string {
  if (posture === "IMMEDIATE_RISK") {
    return "Immediate Risk";
  }

  if (posture === "ATTENTION_REQUIRED") {
    return "Attention Required";
  }

  return "Stable";
}

function postureTone(posture: OperationalPosture): "red" | "amber" | "mint" {
  if (posture === "IMMEDIATE_RISK") {
    return "red";
  }

  if (posture === "ATTENTION_REQUIRED") {
    return "amber";
  }

  return "mint";
}

function formatCountdown(deadlineAt?: string): string {
  const hours = hoursUntil(deadlineAt);
  if (hours === null) {
    return "no due date";
  }

  if (hours <= 0) {
    return "overdue";
  }

  if (hours < 24) {
    return `${Math.max(1, Math.round(hours))}h left`;
  }

  return `${Math.round(hours / 24)}d left`;
}

function deriveRowStatus(matter: AtRiskMatter): MatterRowStatus {
  const hours = hoursUntil(matter.deadlineAt);

  if (matter.exposureState === "STRATEGIC_RISK" || (hours !== null && hours <= 72)) {
    return "AT_RISK";
  }

  if (matter.exposureState === "REVIEW_REQUIRED" || matter.exposureState === "MONITORING") {
    return "WATCH";
  }

  return "ON_TRACK";
}

function toneFromStatus(status: MatterRowStatus): string {
  if (status === "AT_RISK") {
    return "tone-red";
  }

  if (status === "WATCH") {
    return "tone-amber";
  }

  return "tone-mint";
}

function compactMatterType(type: string): string {
  return type
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (x) => x.toUpperCase());
}

function splitClientName(title: string): string {
  const cleaned = title.replace(/\s*-\s*/g, " ").trim();
  return cleaned.length > 26 ? `${cleaned.slice(0, 25)}...` : cleaned;
}

function nextAction(matter: AtRiskMatter): string {
  if (matter.exposureState === "STRATEGIC_RISK") {
    return "Partner review now";
  }

  if (matter.exposureState === "REVIEW_REQUIRED") {
    return "Attorney check today";
  }

  return "Monitor";
}

function buildDocket(matters: AtRiskMatter[]): DocketItem[] {
  const withHorizon = matters
    .map((matter) => ({ matter, hours: hoursUntil(matter.deadlineAt) }))
    .filter(({ hours }) => hours !== null && hours > 0 && hours <= 48)
    .sort((a, b) => (a.hours ?? 999) - (b.hours ?? 999))
    .slice(0, 6)
    .map(({ matter }) => ({
      id: matter.id,
      title: matter.title,
      dueText: formatCountdown(matter.deadlineAt),
      action: nextAction(matter),
      status: deriveRowStatus(matter)
    }));

  if (withHorizon.length > 0) {
    return withHorizon;
  }

  return matters
    .filter((matter) => matter.exposureState !== "STABLE")
    .slice(0, 4)
    .map((matter) => ({
      id: matter.id,
      title: matter.title,
      dueText: formatCountdown(matter.deadlineAt),
      action: nextAction(matter),
      status: deriveRowStatus(matter)
    }));
}

function exposureRingStyle(data: CommandCenterData): CSSProperties {
  const counts = data.dashboard.riskCounts;
  const total = Math.max(
    1,
    counts.stable + counts.monitoring + counts.reviewRequired + counts.strategicRisk
  );

  const red = (counts.strategicRisk / total) * 100;
  const amber = (counts.reviewRequired / total) * 100;
  const blue = (counts.monitoring / total) * 100;
  const mint = (counts.stable / total) * 100;

  const stop1 = red;
  const stop2 = stop1 + amber;
  const stop3 = stop2 + blue;
  const stop4 = stop3 + mint;

  return {
    background: `conic-gradient(
      #ff596e 0 ${stop1}%,
      #ffb547 ${stop1}% ${stop2}%,
      #58b8ff ${stop2}% ${stop3}%,
      #22d3a2 ${stop3}% ${stop4}%
    )`
  };
}

export function CommandCenter({ data }: { data: CommandCenterData }) {
  const posture = derivePosture(data);

  const rows = [...data.atRiskMatters]
    .sort((a, b) => {
      const riskDelta = exposureOrder[b.exposureState] - exposureOrder[a.exposureState];
      if (riskDelta !== 0) {
        return riskDelta;
      }

      const aHours = hoursUntil(a.deadlineAt) ?? Number.POSITIVE_INFINITY;
      const bHours = hoursUntil(b.deadlineAt) ?? Number.POSITIVE_INFINITY;
      return aHours - bHours;
    })
    .slice(0, 6);

  const atRiskCount = rows.filter((item) => deriveRowStatus(item) === "AT_RISK").length;
  const ringStyle = exposureRingStyle(data);
  const docketItems = buildDocket(rows);

  return (
    <main className="shell">
      <header className="hero-head">
        <div>
          <p className="eyebrow">MatterOS / Command Bridge</p>
          <h1>Command Bridge</h1>
          <p className="bridge-note">Layer 1 · Firm Pulse: {formatLastEvaluated(data.dashboard.lastEvaluatedAt)}</p>
        </div>
        <div className="hero-actions">
          <Link className="hero-link" href="/">
            Value to Firm
          </Link>
          <div className={`posture-chip posture-${postureTone(posture)}`}>
            <span className="status-dot" />
            {postureText(posture)}
          </div>
        </div>
      </header>

      <section className="meta-strip">
        <div>
          <p>Active matters</p>
          <strong>{data.dashboard.activeMatters}</strong>
        </div>
        <div>
          <p>Escalations</p>
          <strong>{data.dashboard.escalations}</strong>
        </div>
        <div>
          <p>Deadlines under 7d</p>
          <strong>{data.dashboard.deadlinesNext7Days}</strong>
        </div>
        <div>
          <p>Stalled matters</p>
          <strong>{data.dashboard.stalledMatters}</strong>
        </div>
      </section>

      <section className="surface-grid">
        <article className="surface panel-wide">
          <div className="surface-head">
            <h2>Layer 2 · Exposure Window</h2>
            <p>
              <span className="live-dot" /> {atRiskCount} at risk
            </p>
          </div>

          <div className="table-head">
            <span>ID</span>
            <span>Client</span>
            <span>Matter Type</span>
            <span>Timeline</span>
            <span>Status</span>
            <span>Details</span>
          </div>

          <ul className="matter-list">
            {rows.map((matter) => {
              const status = deriveRowStatus(matter);

              return (
                <li key={matter.id} className="matter-row">
                  <span className="mono id">#{matter.id.replace("MAT-", "")}</span>
                  <span className="client">{splitClientName(matter.title)}</span>
                  <span className="matter-type">{compactMatterType(matter.type)}</span>
                  <span className="mono timeline">{formatCountdown(matter.deadlineAt)}</span>
                  <span className={`status-pill ${toneFromStatus(status)}`}>
                    {status.replace("_", " ")}
                  </span>
                  <Link className="bridge-link" href={`/matters/${matter.id}`}>
                    Details
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>

        <article className="surface panel-docket">
          <div className="surface-head">
            <h2>Layer 3 · 48-Hour Docket</h2>
            <p>Execution horizon</p>
          </div>

          {docketItems.length === 0 ? (
            <p className="panel-empty">No partner interventions in the next 48 hours.</p>
          ) : (
            <ul className="docket-list">
              {docketItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <h3>{splitClientName(item.title)}</h3>
                    <p>{item.action}</p>
                  </div>
                  <span className={`status-pill ${toneFromStatus(item.status)}`}>{item.dueText}</span>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="surface panel-ring">
          <div className="surface-head">
            <h2>Layer 4 · Practice Health Snapshot</h2>
            <p>Cross-firm posture</p>
          </div>
          <div className="ring-wrap">
            <div className="ring" style={ringStyle}>
              <div className="ring-inner">
                <strong>{data.dashboard.activeMatters}</strong>
                <span>active</span>
              </div>
            </div>
            <ul className="ring-legend">
              <li>
                <span className="swatch tone-red" /> Strategic Risk
                <strong>{data.dashboard.riskCounts.strategicRisk}</strong>
              </li>
              <li>
                <span className="swatch tone-amber" /> Review Required
                <strong>{data.dashboard.riskCounts.reviewRequired}</strong>
              </li>
              <li>
                <span className="swatch tone-blue" /> Monitoring
                <strong>{data.dashboard.riskCounts.monitoring}</strong>
              </li>
              <li>
                <span className="swatch tone-mint" /> Stable
                <strong>{data.dashboard.riskCounts.stable}</strong>
              </li>
            </ul>
          </div>
        </article>

        <article className="surface panel-closure panel-wide">
          <div className="surface-head">
            <h2>Layer 5 · Operational Closure</h2>
            <p>Today</p>
          </div>
          <div className="closure-grid">
            <div>
              <p>Prevented</p>
              <strong>{data.dashboard.closure.prevented}</strong>
            </div>
            <div>
              <p>Surfaced</p>
              <strong>{data.dashboard.closure.surfaced}</strong>
            </div>
            <div>
              <p>Resolved</p>
              <strong>{data.dashboard.closure.resolved}</strong>
            </div>
          </div>
          <p className="closure-line">
            Silence means stable operations. Signals mean partner judgment is required now.
          </p>
        </article>
      </section>
    </main>
  );
}
