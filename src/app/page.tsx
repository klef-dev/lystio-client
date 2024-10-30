"use client";
import FilterNav from "@/components/filter-nav";
import NavBar from "@/components/nav-bar";
import Section from "@/components/section";
import React, { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col divide-y overflow-hidden">
      <Suspense>
        <header className="divide-y h-[17%]">
          <NavBar />
          <FilterNav />
        </header>

        <Section />
      </Suspense>
    </main>
  );
}
