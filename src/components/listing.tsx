"use client";
import React from "react";

import ListingCard, { ListingCardSkeleton } from "./listing-card";
import { ScrollArea } from "./ui/scroll-area";

const Listings = ({
  data,
  isLoading,
}: {
  data?: {
    res: PropertyType[];
    paging: PaginationType;
  };
  isLoading: boolean;
}) => {
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
