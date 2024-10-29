"use client";
import React from "react";
import Map, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapView = () => {
  const [viewState, setViewState] = React.useState({
    latitude: 48.2082,
    longitude: 16.3719,
    zoom: 13,
  });

  return (
    <section className="w-full">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <NavigationControl position="bottom-right" />
      </Map>
    </section>
  );
};

export default MapView;
