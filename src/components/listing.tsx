"use client";
import React from "react";

import ListingCard, { ListingCardSkeleton } from "./listing-card";
import { ScrollArea } from "./ui/scroll-area";
import request from "@/lib/request";

const Listings = () => {
  const [properties, setProperties] = React.useState<PropertyType[]>([]);
  const getProperties = React.useCallback(async () => {
    const data = await request.post("/tenement/search", {
      filter: {
        rentType: ["rent"],
      },
    });
    return data.res;
  }, []);

  React.useEffect(() => {
    getProperties().then((properties) => {
      setProperties(properties);
    });
  }, [getProperties]);

  return (
    <ScrollArea className="w-full flex-grow">
      <div className="grid grid-cols-2 gap-10 p-5 w-full h-full">
        {properties.map((property) => (
          <ListingCard key={property.id} property={property} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Listings;

export const ListingFallback = () => (
  <div className="grid grid-cols-2 gap-10 p-5 w-full h-full flex-grow overflow-hidden">
    {Array.from({ length: 10 }).map((_, i) => (
      <ListingCardSkeleton key={i} />
    ))}
  </div>
);
