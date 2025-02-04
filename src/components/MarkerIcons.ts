// components/MarkerIcons.ts
import L from "leaflet";
import markerIconPngRBlue from "/images/marker-icon-2x-blue.png";
import markerIconPngBlue from "/images/marker-icon-blue.png";
import markerIconPngRYellow from "/images/marker-icon-2x-gold.png";
import markerIconPngYellow from "/images/marker-icon-gold.png";

export const blueIcon = new L.Icon({
  iconRetinaUrl: markerIconPngRBlue,
  iconUrl: markerIconPngBlue,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -45],
});

export const yellowIcon = new L.Icon({
  iconRetinaUrl: markerIconPngRYellow,
  iconUrl: markerIconPngYellow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -45],
});
