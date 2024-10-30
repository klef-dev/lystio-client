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
          <div className="h-fit w-fit bg-black rounded-full flex items-center ">
            <Button size={"icon"} variant={"white"} className="rounded-full">
              <PencilIcon size={20} />
            </Button>
            <span className="text-white pl-2 pr-4 text-xs">Draw</span>
          </div>
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
                <div className="w-full flex flex-col items-center">
                  <Badge variant={"white"} key={listing.id}>
                    {listing.rent ? (
                      <>€{listing.rent.toLocaleString()}</>
                    ) : (
                      <>€{listing.rentRange[0].toLocaleString()}</>
                    )}
                  </Badge>
                  <div className="h-4 -mt-1 w-1 bg-white rounded-full" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-72 bg-white p-2 z-50 rounded-xl space-y-2">
                <div className="relative aspect-[297/198] w-full rounded-lg overflow-hidden">
                  <Image
                    alt={listing.title}
                    layout="fill"
                    className="w-full h-full"
                    src={
                      listing.media?.[0]?.cdnUrl || "/images/placeholder.jpg"
                    }
                    blurDataURL={
                      listing.media?.[0]?.bluredDataURL ||
                      "/images/placeholder.jpg"
                    }
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
          <svg
            className="scale-75"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
          >
            <path
              fill="#000"
              d="M7.2 18.4h-.8a.8.8 0 0 0 .8.8v-.8Zm9.6 0v.8a.8.8 0 0 0 .8-.8h-.8Zm-9.6.8h9.6v-1.6H7.2v1.6Zm10.4-.8v-3.2H16v3.2h1.6ZM6.4 15.2v3.2H8v-3.2H6.4ZM12 9.6a5.6 5.6 0 0 0-5.6 5.6H8a4 4 0 0 1 4-4V9.6Zm5.6 5.6A5.6 5.6 0 0 0 12 9.6v1.6a4 4 0 0 1 4 4h1.6Zm4.8 3.2c0 .392-.182.832-.65 1.306-.47.478-1.192.944-2.145 1.353C17.699 21.875 15.01 22.4 12 22.4V24c3.174 0 6.086-.55 8.235-1.472 1.072-.46 1.992-1.027 2.655-1.698.665-.675 1.11-1.497 1.11-2.43h-1.6Zm-10.4 4c-3.011 0-5.7-.525-7.605-1.34-.953-.41-1.675-.876-2.145-1.354-.468-.474-.65-.91-.65-1.306H0c0 .933.445 1.755 1.11 2.43.663.672 1.583 1.239 2.656 1.7C5.912 23.45 8.824 24 12 24v-1.6Zm-10.4-4c0-.387.176-.82.63-1.288.458-.47 1.16-.931 2.09-1.34l-.64-1.465c-1.05.46-1.949 1.024-2.595 1.69C.432 16.666 0 17.48 0 18.4h1.6Zm18.08-2.627c.93.408 1.632.869 2.088 1.339.454.467.632.9.632 1.288H24c0-.92-.432-1.734-1.085-2.403-.646-.666-1.545-1.23-2.595-1.69l-.64 1.466ZM12 6.4A2.4 2.4 0 0 1 9.6 4H8a4 4 0 0 0 4 4V6.4ZM14.4 4A2.4 2.4 0 0 1 12 6.4V8a4 4 0 0 0 4-4h-1.6ZM12 1.6A2.4 2.4 0 0 1 14.4 4H16a4 4 0 0 0-4-4v1.6ZM12 0a4 4 0 0 0-4 4h1.6A2.4 2.4 0 0 1 12 1.6V0Z"
            />
          </svg>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-white hover:bg-gray-100"
        >
          Route planner
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            fill="none"
            className="scale-75"
          >
            <path
              fill="#000"
              fillRule="evenodd"
              d="M8.918 2.632c-.855.652-1.85 1.645-3.246 3.04s-2.388 2.39-3.04 3.246c-.64.838-.882 1.454-.882 2.082 0 .628.242 1.244.882 2.082.652.855 1.645 1.85 3.04 3.246s2.39 2.387 3.246 3.04c.838.64 1.454.882 2.082.882.628 0 1.244-.242 2.082-.882.855-.652 1.85-1.645 3.246-3.04s2.387-2.39 3.04-3.246c.64-.838.882-1.454.882-2.082 0-.628-.242-1.244-.882-2.082-.652-.855-1.645-1.85-3.04-3.246s-2.39-2.388-3.246-3.04c-.838-.64-1.454-.882-2.082-.882-.628 0-1.244.242-2.082.882Zm-.91-1.193C8.98.698 9.912.25 11 .25s2.02.448 2.992 1.19c.945.72 2.01 1.785 3.356 3.132l.08.08c1.347 1.347 2.412 2.411 3.133 3.356.741.972 1.189 1.904 1.189 2.992s-.448 2.02-1.19 2.992c-.72.945-1.785 2.01-3.132 3.356l-.08.08c-1.347 1.347-2.411 2.412-3.356 3.133-.972.741-1.904 1.189-2.992 1.189s-2.02-.448-2.992-1.19c-.945-.72-2.01-1.785-3.356-3.132l-.08-.08c-1.347-1.347-2.412-2.411-3.133-3.356C.698 13.02.25 12.088.25 11s.448-2.02 1.19-2.992c.72-.945 1.785-2.01 3.132-3.356l.08-.08C5.999 3.225 7.063 2.16 8.008 1.439Z"
              clipRule="evenodd"
            />
            <path
              fill="#000"
              fillRule="evenodd"
              d="M11.786 7.487a.75.75 0 0 1 1.06-.034l2.667 2.5a.75.75 0 0 1 0 1.094l-2.667 2.5a.75.75 0 0 1-1.026-1.094l1.283-1.203H9.667c-.334 0-.844.1-1.247.372-.363.245-.67.643-.67 1.378a.75.75 0 1 1-1.5 0c0-1.265.582-2.117 1.33-2.622.709-.478 1.532-.628 2.087-.628h3.436L11.82 8.547a.75.75 0 0 1-.034-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </section>
  );
};

export default MapView;
