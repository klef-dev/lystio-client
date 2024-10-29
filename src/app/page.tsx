import FilterNav from "@/components/filter-nav";
import NavBar from "@/components/nav-bar";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <header className="divide-y">
        <NavBar />
        <FilterNav />
      </header>
    </main>
  );
}
