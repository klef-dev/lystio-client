"use client";
import React from "react";

import ListingCard, { ListingCardSkeleton } from "./listing-card";
import { ScrollArea } from "./ui/scroll-area";
import { useSearchParams } from "next/navigation";

import useListings from "@/hooks/use-listings";

const Listings = () => {
  const searchParams = useSearchParams();
  const min = searchParams.get("min") || 0;
  const max = searchParams.get("max") || 99999;

  const filter = React.useMemo(() => {
    return {
      filter: {
        rentType: ["rent"],
        rent: [+min, +max],
        paging: {
          page: 1
        }
      }
    };
  }, [max, min]);

  const { data, isLoading } = useListings(filter);

  if (isLoading) return <ListingFallback />;

  return (
    <ScrollArea className="w-full flex-grow">
      <div className="grid grid-cols-2 gap-10 p-5 w-full h-full">
        {data?.res?.map((property) => (
          <ListingCard key={property.id} property={property} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Listings;

const ListingFallback = () => (
  <div className="grid grid-cols-2 gap-10 p-5 w-full h-full flex-grow overflow-hidden">
    {Array.from({ length: 10 }).map((_, i) => (
      <ListingCardSkeleton key={i} />
    ))}
  </div>
);
