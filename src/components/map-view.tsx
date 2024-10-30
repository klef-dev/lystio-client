"use client";
import React, { useState, useEffect, useCallback } from "react";
import Map, {
  NavigationControl,
  Marker,
  Source,
  Layer,
  useMap
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useSearchParams } from "next/navigation";
import { MapIcon, Navigation2 } from "lucide-react";
import { Button } from "./ui/button";
import type { LngLatBoundsLike } from "mapbox-gl";
import useListings from "@/hooks/use-listings";
import { Badge } from "./ui/badge";

const MapView = () => {
  const searchParams = useSearchParams();
  const min = searchParams.get("min") || 0;
  const max = searchParams.get("max") || 99999;
  const { current: mapRef } = useMap();

  const [viewState, setViewState] = useState({
    latitude: 48.2082,
    longitude: 16.3719,
    zoom: 10,
    padding: { top: 50, bottom: 50, left: 50, right: 50 }
  });

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

  const { data } = useListings(filter);

  // Calculate bounds for both markers and polygons
  const calculateBounds = useCallback((items: PropertyType[]) => {
    if (!items.length) return null;

    const bounds = {
      minLng: Infinity,
      maxLng: -Infinity,
      minLat: Infinity,
      maxLat: -Infinity
    };

    items.forEach((item) => {
      // Check marker points
      bounds.minLng = Math.min(bounds.minLng, item.location[0]);
      bounds.maxLng = Math.max(bounds.maxLng, item.location[0]);
      bounds.minLat = Math.min(bounds.minLat, item.location[1]);
      bounds.maxLat = Math.max(bounds.maxLat, item.location[1]);

      // Check polygon coordinates
      //   const polygon = JSON.parse(item.gj);
      //   polygon.coordinates[0].forEach((coord: number[]) => {
      //     bounds.minLng = Math.min(bounds.minLng, coord[0]);
      //     bounds.maxLng = Math.max(bounds.maxLng, coord[0]);
      //     bounds.minLat = Math.min(bounds.minLat, coord[1]);
      //     bounds.maxLat = Math.max(bounds.maxLat, coord[1]);
      //   });
    });

    return [
      [bounds.minLng, bounds.minLat],
      [bounds.maxLng, bounds.maxLat]
    ] as LngLatBoundsLike;
  }, []);

  // Fit bounds when listings change
  useEffect(() => {
    if (data?.res.length && mapRef) {
      const bounds = calculateBounds(data?.res);
      if (bounds) {
        mapRef.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          duration: 1000
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
          duration: 1000
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
      >
        <NavigationControl position="bottom-right" />

        {/* Render Markers for Points */}
        {data?.res.map((listing) => (
          <Marker
            key={listing.id}
            longitude={listing.location[0]}
            latitude={listing.location[1]}
            onClick={() => handleMarkerClick(listing)}
          >
            <Badge variant={"white"} key={listing.id}>
              {listing.rent ? (
                <>€{listing.rent.toLocaleString()}</>
              ) : (
                <>€{listing.rentRange[0].toLocaleString()}</>
              )}
            </Badge>
          </Marker>
        ))}

        {/* Render Polygons for GeoJSON Data */}
        {data?.res.map((listing) => (
          <Source
            key={`polygon-${listing.id}`}
            id={`polygon-${listing.id}`}
            type="geojson"
            // data={JSON.parse(listing.gj)}
          >
            <Layer
              id={`fill-${listing.id}`}
              type="fill"
              paint={{
                "fill-color": "#888888",
                "fill-opacity": 0.4
              }}
            />
            <Layer
              id={`outline-${listing.id}`}
              type="line"
              paint={{
                "line-color": "#000000",
                "line-width": 2
              }}
            />
          </Source>
        ))}
      </Map>

      <div className="absolute bottom-4 left-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-white hover:bg-gray-100"
        >
          <MapIcon className="w-4 h-4 mr-2" />
          Streetview
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="bg-white hover:bg-gray-100"
        >
          <Navigation2 className="w-4 h-4 mr-2" />
          Route planner
        </Button>
      </div>
    </section>
  );
};

export default MapView;
