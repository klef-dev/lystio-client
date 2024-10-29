import FilterNav from "@/components/filter-nav";
import ListingSection from "@/components/listing";
import MapView from "@/components/map-view";
import NavBar from "@/components/nav-bar";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col divide-y overflow-hidden">
      <header className="divide-y h-[17%]">
        <NavBar />
        <FilterNav />
      </header>
      <section className="grid grid-cols-2  overflow-hidden h-[82%]">
        <MapView />
        <ListingSection />
      </section>
    </main>
  );
}
