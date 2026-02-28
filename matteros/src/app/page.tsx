import { CommandCenter } from "@/components/command-center";
import { TopNav } from "@/components/top-nav";
import { fetchCommandCenterData } from "@/lib/api";

export default async function Home() {
  const data = await fetchCommandCenterData();

  return (
    <>
      <TopNav />
      <CommandCenter data={data} />
    </>
  );
}
