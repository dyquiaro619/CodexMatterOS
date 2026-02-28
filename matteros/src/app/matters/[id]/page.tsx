import Link from "next/link";
import { notFound } from "next/navigation";
import { TopNav } from "@/components/top-nav";
import { fetchMatterDetail } from "@/lib/api";

function formatDateTime(value?: string): string {
  if (!value) {
    return "--";
  }

  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return "--";
  }

  return new Date(parsed).toLocaleString();
}

function toLabel(value: string): string {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function MatterDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await fetchMatterDetail(id);

  if (!detail) {
    notFound();
  }

  const { matter, events, policySnapshot } = detail;

  return (
    <>
      <TopNav />
      <main className="data-shell">
        <section className="data-hero">
          <div>
            <p className="exp-eyebrow">Matter Detail</p>
            <h1>{matter.title}</h1>
            <p>
              Client: {matter.clientName} | Type: {toLabel(matter.type)} | Stage: {toLabel(matter.stage)}
            </p>
          </div>
          <Link className="data-link" href="/matters">
            Back to matters
          </Link>
        </section>

        <section className="data-grid">
          <article className="data-panel">
            <h2>Lifecycle Timeline</h2>
            <div className="data-events">
              {events.map((event) => (
                <div className="data-event" key={event.id}>
                  <span className="mono">{formatDateTime(event.occurredAt)}</span>
                  <strong>{event.actor}</strong>
                  <span>{toLabel(event.eventType)}</span>
                  <p>{event.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="data-panel">
            <h2>Policy Snapshot (Immutable)</h2>
            {policySnapshot ? (
              <div className="data-snapshot">
                <p>
                  <strong>Snapshot ID:</strong> {policySnapshot.id}
                </p>
                <p>
                  <strong>Captured:</strong> {formatDateTime(policySnapshot.capturedAt)} by {policySnapshot.capturedBy}
                </p>
                <p>
                  <strong>Source:</strong> {policySnapshot.policySource}
                </p>
                <p>
                  <strong>Version:</strong> {policySnapshot.policyVersion}
                </p>
                <p>
                  <strong>Clearance decision:</strong> {policySnapshot.clearanceDecision}
                </p>
                <p>
                  <strong>Rationale:</strong> {policySnapshot.rationale}
                </p>
                <p className="mono data-hash">{policySnapshot.immutableHash}</p>
                <Link className="data-link" href={`/policy-snapshots/${policySnapshot.id}`}>
                  Open snapshot record
                </Link>
              </div>
            ) : (
              <p>No linked policy snapshot for this matter.</p>
            )}
          </article>
        </section>
      </main>
    </>
  );
}
