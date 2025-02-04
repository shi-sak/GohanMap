// components/StoreMarker.tsx
import { Marker, Popup } from 'react-leaflet';
import { yellowIcon } from './MarkerIcons';

interface StoreMarkerProps {
  locations: { name: string; lat: number; lng: number; description: string }[];
  handleMarkerClick: (name: string, desc: string) => void;
}

export default function StoreMarker({ locations, handleMarkerClick }: StoreMarkerProps) {
  return (
    <>
      {locations.map((loc, index) => (
        <Marker
          key={index}
          position={[loc.lat, loc.lng]}
          icon={yellowIcon}
          eventHandlers={{ click: () => handleMarkerClick(loc.name, loc.description) }}
        >
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </>
  );
}
