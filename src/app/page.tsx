import FilterNav from "@/components/filter-nav";
import ListingSection from "@/components/listing";
import MapView from "@/components/map-view";
import NavBar from "@/components/nav-bar";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col divide-y">
      <header className="divide-y  h-fit">
        <NavBar />
        <FilterNav />
      </header>
      <section className="grid grid-cols-2 flex-grow">
        <MapView />
        <ListingSection />
      </section>
    </main>
  );
}
