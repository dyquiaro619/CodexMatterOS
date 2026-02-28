import { notFound } from "next/navigation";
import Link from "next/link";
import { TopNav } from "@/components/top-nav";
import { fetchMattersData, fetchPolicySnapshotDetail } from "@/lib/api";

function formatDateTime(value: string): string {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return "--";
  }

  return new Date(parsed).toLocaleString();
}

export default async function PolicySnapshotDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const snapshot = await fetchPolicySnapshotDetail(id);

  if (!snapshot) {
    notFound();
  }

  const mattersData = await fetchMattersData();
  const impactedMatters = snapshot.impactedMatterIds
    .map((matterId) => mattersData.matters.find((matter) => matter.id === matterId))
    .filter((matter): matter is NonNullable<typeof matter> => Boolean(matter));

  return (
    <>
      <TopNav />
      <main className="data-shell">
        <section className="data-hero">
          <div>
            <p className="exp-eyebrow">Immutable Snapshot Record</p>
            <h1>{snapshot.id}</h1>
            <p>{snapshot.title}</p>
          </div>
          <Link className="data-link" href="/policy-snapshots">
            Back to snapshots
          </Link>
        </section>

        <section className="data-panel">
          <div className="data-snapshot">
            <p>
              <strong>Snapshot Title:</strong> {snapshot.title}
            </p>
            {snapshot.sourceUrl ? (
              <p>
                <strong>Source URL:</strong>{" "}
                <a href={snapshot.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {snapshot.sourceUrl}
                </a>
              </p>
            ) : null}
            <p>
              <strong>Captured At:</strong> {formatDateTime(snapshot.capturedAt)}
            </p>
            <p>
              <strong>Captured By:</strong> {snapshot.capturedBy}
            </p>
            <p>
              <strong>Policy Source:</strong> {snapshot.policySource}
            </p>
            <p>
              <strong>Policy Version:</strong> {snapshot.policyVersion}
            </p>
            <p>
              <strong>Jurisdiction:</strong> {snapshot.jurisdiction}
            </p>
            <p>
              <strong>Clearance Decision:</strong> {snapshot.clearanceDecision}
            </p>
            <p>
              <strong>Rationale:</strong> {snapshot.rationale}
            </p>
            <p>
              <strong>Matters Impacted:</strong> {snapshot.impactedMatterIds.length}
            </p>
            {impactedMatters.length > 0 ? (
              <ul className="snapshot-impacted-list">
                {impactedMatters.map((matter) => (
                  <li key={matter.id}>
                    <Link className="data-link" href={`/matters/${matter.id}`}>
                      {matter.id} - {matter.clientName}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No active matters currently mapped to this snapshot.</p>
            )}
            <p className="mono data-hash">{snapshot.immutableHash}</p>
          </div>
        </section>
      </main>
    </>
  );
}
