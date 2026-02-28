import Link from "next/link";
import { TopNav } from "@/components/top-nav";

export default function NewPolicySnapshotPage() {
  return (
    <>
      <TopNav />
      <main className="data-shell">
        <section className="data-hero">
          <div>
            <p className="exp-eyebrow">Policy Snapshot</p>
            <h1>New Snapshot</h1>
            <p>Capture a new immutable policy baseline and map potentially impacted matters.</p>
          </div>
          <Link className="data-link" href="/policy-snapshots">
            Back to snapshots
          </Link>
        </section>

        <section className="data-panel">
          <div className="data-snapshot">
            <p>
              Snapshot creation flow placeholder. In production this action should create an immutable
              record and log a corresponding event in the append-only ledger.
            </p>
            <p>
              For now, use the existing seeded records while we wire transactional snapshot creation
              to `/api/policy-snapshots`.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
