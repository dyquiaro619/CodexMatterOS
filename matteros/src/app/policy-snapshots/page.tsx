import Link from "next/link";
import { TopNav } from "@/components/top-nav";
import { fetchPolicySnapshotsData } from "@/lib/api";

function formatDateTime(value: string): string {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return "--";
  }

  return new Date(parsed).toLocaleString();
}

export default async function PolicySnapshotsPage() {
  const data = await fetchPolicySnapshotsData();

  return (
    <>
      <TopNav />
      <main className="data-shell">
        <section className="data-hero">
          <div>
            <p className="exp-eyebrow">Auditability</p>
            <h1>Policy Snapshots</h1>
            <p>Immutable captures of the exact policy rule-set active at clearance decisions.</p>
          </div>

          <div className="data-hero-actions">
            <span className="data-source">source: {data.source}</span>
            <Link className="data-link data-link-primary" href="/policy-snapshots/new">
              + New Snapshot
            </Link>
          </div>
        </section>

        <section className="data-panel">
          <div className="data-table data-table-snapshots">
            <div className="data-row data-row-head">
              <span>Snapshot</span>
              <span>Matters</span>
              <span>Captured</span>
              <span>Record</span>
            </div>

            {data.snapshots.map((snapshot) => {
              const count = snapshot.impactedMatterIds.length;

              return (
                <div className="data-row" key={snapshot.id}>
                  <div className="snapshot-cell">
                    <strong>{snapshot.title}</strong>
                    {snapshot.sourceUrl ? (
                      <a href={snapshot.sourceUrl} target="_blank" rel="noopener noreferrer">
                        {snapshot.sourceUrl}
                      </a>
                    ) : (
                      <span>{snapshot.policySource}</span>
                    )}
                    <span className="mono">ID: {snapshot.id}</span>
                  </div>

                  <span className={`snapshot-impact ${count > 0 ? "snapshot-impact-hot" : ""}`}>
                    {count}
                  </span>

                  <span>{formatDateTime(snapshot.capturedAt)}</span>

                  <Link className="data-link" href={`/policy-snapshots/${snapshot.id}`}>
                    Open
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <p className="snapshot-footer-note">
          Policy snapshots are never deleted. They form the retroactive audit foundation that enables
          instant explanation when policy changes affect previously cleared matters.
        </p>
      </main>
    </>
  );
}
