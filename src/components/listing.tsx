"use client";
import React from "react";

import ListingCard, { ListingCardSkeleton } from "./listing-card";
import { ScrollArea } from "./ui/scroll-area";
import request from "@/lib/request";
import { useSearchParams } from "next/navigation";

const Listings = () => {
  const searchParams = useSearchParams();
  const min = searchParams.get("min") || 0;
  const max = searchParams.get("max") || 99999;

  const [properties, setProperties] = React.useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getProperties = React.useCallback(async () => {
    setIsLoading(true);
    const data = await request.post("/tenement/search", {
      filter: {
        rentType: ["rent"],
        rent: [min, max],
      },
    });
    setIsLoading(false);
    return data.res;
  }, [min, max]);

  React.useEffect(() => {
    getProperties().then((properties) => {
      setProperties(properties);
    });
  }, [getProperties]);

  if (isLoading) return <ListingFallback />;

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

const ListingFallback = () => (
  <div className="grid grid-cols-2 gap-10 p-5 w-full h-full flex-grow overflow-hidden">
    {Array.from({ length: 10 }).map((_, i) => (
      <ListingCardSkeleton key={i} />
    ))}
  </div>
);
