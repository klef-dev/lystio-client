"use client";
import React, { useState, useEffect, useCallback } from "react";
import Map, { NavigationControl, Marker, useMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  BathIcon,
  BedDoubleIcon,
  BoxIcon,
  CommandIcon,
  Layers3Icon,
  MapIcon,
  Navigation2,
  PencilIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import type { LngLatBoundsLike } from "mapbox-gl";
import { Badge } from "./ui/badge";
import Image from "next/image";

const MapView = ({
  data,
}: {
  data?: {
    res: PropertyType[];
    paging: PaginationType;
  };
}) => {
  const { current: mapRef } = useMap();

  const [viewState, setViewState] = useState({
    latitude: 48.2082,
    longitude: 16.3719,
    zoom: 10,
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
  });

  // Calculate bounds for both markers and polygons
  const calculateBounds = useCallback((items: PropertyType[]) => {
    if (!items.length) return null;

    const bounds = {
      minLng: Infinity,
      maxLng: -Infinity,
      minLat: Infinity,
      maxLat: -Infinity,
    };

    items.forEach((item) => {
      // Check marker points
      bounds.minLng = Math.min(bounds.minLng, item.location[0]);
      bounds.maxLng = Math.max(bounds.maxLng, item.location[0]);
      bounds.minLat = Math.min(bounds.minLat, item.location[1]);
      bounds.maxLat = Math.max(bounds.maxLat, item.location[1]);
    });

    return [
      [bounds.minLng, bounds.minLat],
      [bounds.maxLng, bounds.maxLat],
    ] as LngLatBoundsLike;
  }, []);

  // Fit bounds when listings change
  useEffect(() => {
    if (data?.res.length && mapRef) {
      const bounds = calculateBounds(data?.res);
      if (bounds) {
        mapRef.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          duration: 1000,
        });
      }
    }
  }, [data, mapRef, calculateBounds]);

  // Handle marker click
  const handleMarkerClick = useCallback(
    (listing: PropertyType) => {
      if (mapRef) {
        // Zoom to the clicked marker
        mapRef.flyTo({
          center: [listing.location[0], listing.location[1]],
          zoom: 14,
          duration: 1000,
        });
      }
    },
    [mapRef]
  );

  return (
    <section className="w-full h-full relative">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ position: "relative" }}
      >
        <div className="absolute top-0 left-0 p-5 flex flex-col space-y-3">
          <Button variant={"white"}>
            <CommandIcon size={16} /> Point of Interest
          </Button>
          <Button size={"icon"} variant={"white"} className="rounded-full">
            <Layers3Icon size={20} />
          </Button>
          <Button size={"icon"} variant={"white"} className="rounded-full">
            <PencilIcon size={20} />
          </Button>
        </div>
        <NavigationControl position="bottom-right" />

        {/* Render Markers for Points */}
        {data?.res.map((listing) => (
          <Marker
            key={listing.id}
            longitude={listing.location[0]}
            latitude={listing.location[1]}
            onClick={() => handleMarkerClick(listing)}
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge variant={"white"} key={listing.id}>
                  {listing.rent ? (
                    <>€{listing.rent.toLocaleString()}</>
                  ) : (
                    <>€{listing.rentRange[0].toLocaleString()}</>
                  )}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-72 bg-white p-2 z-50 rounded-xl space-y-2">
                <div className="relative aspect-[297/198] w-full rounded-lg overflow-hidden">
                  <Image
                    alt={listing.title}
                    layout="fill"
                    className="w-full h-full"
                    src={listing.media?.[0]?.cdnUrl}
                    blurDataURL={listing.media?.[0]?.bluredDataURL}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-bold line-clamp-1">
                    {listing.unitType === "single" ? (
                      <>€{listing.rent.toLocaleString()}</>
                    ) : (
                      <>
                        €{listing.rentRange[0].toLocaleString()} - €
                        {listing.rentRange[1].toLocaleString()}
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 font-semibold line-clamp-2">
                    {listing.address}
                  </p>
                  <ul className="flex flex-row items-center justify-between text-gray-950">
                    <li className="flex items-center gap-2">
                      <BoxIcon size={14} className="" />
                      <span className="text-sm font-medium ">
                        {listing.size}m²
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BedDoubleIcon size={14} className="" />
                      <span className="text-sm font-medium ">
                        {listing.rooms}beds
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BathIcon size={14} className="" />
                      <span className="text-sm font-medium ">
                        {listing.roomsBath}bath
                      </span>
                    </li>
                  </ul>
                </div>
              </HoverCardContent>
            </HoverCard>
          </Marker>
        ))}
      </Map>

      <div className="absolute bottom-4 left-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-white hover:bg-gray-100"
        >
          Streetview
          <MapIcon className="w-4 h-4 mr-2" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-white hover:bg-gray-100"
        >
          Route planner
          <Navigation2 className="w-4 h-4 mr-2" />
        </Button>
      </div>
    </section>
  );
};

export default MapView;
