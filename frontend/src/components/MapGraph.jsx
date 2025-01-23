import React, { useRef, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Nigeria boundary coordinates (Southwest and Northeast)
const NIGERIA_BOUNDS = [
  [4.277144, 2.668432], // Southwest
  [13.892007, 14.680073], // Northeast
];

// Bounds Control Component
function NigeriaBoundsControl() {
  const map = useMap();

  useEffect(() => {
    const nigeriaBounds = L.latLngBounds(NIGERIA_BOUNDS);

    // Set max bounds with some padding
    map.setMaxBounds(nigeriaBounds.pad(0.2));

    // Prevent panning outside Nigeria
    map.on("drag", () => {
      map.panInsideBounds(nigeriaBounds, { animate: false });
    });

    return () => {
      map.off("drag");
    };
  }, []);

  return null;
}

// Custom Location Marker with Pulse Effect
function LocationMarker({ position, description }) {
  // Custom icon with pulse effect
  const pulseIcon = L.divIcon({
    className: "custom-marker-icon",
    html: `
      <div class="pulse-marker">
        <div class="marker-pin"></div>
        <div class="pulse-ring"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  return (
    <Marker position={position} icon={pulseIcon}>
      <Popup>{description || "Facility Location"}</Popup>
    </Marker>
  );
}

function MapGraph({ facilities }) {
  // Nigeria's center coordinates
  const nigeriaCenter = [9.082, 8.6753];

  // State to track facility location
  const [facilityLocation, setFacilityLocation] = useState(null);

  // Effect to set facility location
  useEffect(() => {
    if (facilities?.geometry?.coordinates) {
      const coords = [
        facilities.geometry.coordinates[1],
        facilities.geometry.coordinates[0],
      ];
      setFacilityLocation(coords);
    }
  }, [facilities]);

  // Custom CSS for pulse effect
  const PulseStyle = () => (
    <style jsx>{`
      .pulse-marker {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .marker-pin {
        width: 20px;
        height: 20px;
        border-radius: 50% 50% 50% 0;
        background: #c30b82;
        position: absolute;
        transform: rotate(-45deg);
        left: 50%;
        top: 50%;
        margin: -10px 0 0 -10px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      }
      .pulse-ring {
        position: absolute;
        border: 3px solid #c30b82;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: pulsate 1.5s ease-out infinite;
        opacity: 0;
      }
      @keyframes pulsate {
        0% {
          transform: scale(0.1, 0.1);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: scale(1.2, 1.2);
          opacity: 0;
        }
      }
    `}</style>
  );

  return (
    <>
      <PulseStyle />
      <MapContainer
        center={nigeriaCenter}
        zoom={6}
        style={{ height: "500px", width: "100%" }}
        minZoom={6}
        maxZoom={18}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        {/* Bounds Control */}
        <NigeriaBoundsControl />

        {/* Zoom Control positioned top-left */}
        <ZoomControl position="topleft" />

        {/* Layer Controls */}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              attribution="&copy; Google"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Location Marker */}
        {facilityLocation && (
          <LocationMarker
            position={facilityLocation}
            description={facilities.name || "Facility Location"}
          />
        )}
      </MapContainer>
    </>
  );
}

export default MapGraph;
