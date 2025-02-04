// components/LocationMarker.tsx
import { useMapEvents } from 'react-leaflet';

interface LocationMarkerProps {
  setLatLng: (latLng: [number, number]) => void;
}

export default function LocationMarker({ setLatLng }: LocationMarkerProps) {
  useMapEvents({
    click(e) {
      setLatLng([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}
