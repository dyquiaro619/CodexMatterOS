import { TopNav } from "@/components/top-nav";
import { MattersTable } from "@/components/matters-table";
import { fetchMattersData } from "@/lib/api";

export default async function MattersPage() {
  const data = await fetchMattersData();

  return (
    <>
      <TopNav />
      <main className="data-shell">
        <section className="data-hero">
          <div>
            <p className="exp-eyebrow">Client Operations</p>
            <h1>Matters</h1>
            <p>Browse all matters, inspect current exposure, and drill into each client timeline.</p>
          </div>
          <span className="data-source">source: {data.source}</span>
        </section>

        <section className="data-panel">
          <MattersTable matters={data.matters} />
        </section>
      </main>
    </>
  );
}
