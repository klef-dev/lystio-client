// https://api.lystio.co/swagger#/Tenements/TenementController_search
// "use client";
import React from "react";

import ListingCard, { ListingCardSkeleton } from "./listing-card";
import { ScrollArea } from "./ui/scroll-area";
import axios from "axios";

const endpoint = "https://api.lystio.co/tenement/search";

const Listings = async () => {
  const { data } = await axios.post(endpoint, {
    filter: {
      size: [10, 1000],
      rent: [100, 10000],
      roomsBed: [0, 99],
      roomsBath: [0, 99],
      type: [1],
      subType: [1],
      condition: [1],
      accessibility: [1],
      rentType: ["rent"],
      floorType: [1],
      heatingType: [1],
      availableNow: true,
      within: null,
      bbox: null,
      near: null,
      amenities: null
    },
    sort: {
      rent: null,
      distance: null
    },
    paging: {
      pageSize: 10,
      page: 0
    }
  });

  const properties: PropertyType[] = data.res;
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
