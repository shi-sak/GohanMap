// components/Map.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from './LocationMarker';
import StoreMarker from './StoreMarker';
import { blueIcon } from './MarkerIcons';

interface MapProps {
  latLng: [number, number] | null;
  setLatLng: (latLng: [number, number]) => void;
  locations: { name: string; lat: number; lng: number; description: string }[];
  handleMarkerClick: (name: string, desc: string) => void; // ここで型を明示
}

export default function Map({ latLng, setLatLng, locations, handleMarkerClick }: MapProps) {
  const akibaIdo = 35.69839015931542;
  const akibaKeido = 139.7731409190271;
  const radius = 700;
  const bounds = L.latLng([akibaIdo, akibaKeido]).toBounds(radius * 2);

  return (
    <MapContainer zoomSnap={0.1} bounds={bounds} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"      
        attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a>'
        maxZoom={25}
      />
      <LocationMarker setLatLng={setLatLng} />
      <StoreMarker locations={locations} handleMarkerClick={handleMarkerClick} />
      <Marker position={[akibaIdo, akibaKeido]} icon={blueIcon}>
        <Popup>秋葉原駅</Popup>
      </Marker>
      {latLng && (
        <Marker position={latLng} icon={L.icon({ iconUrl: '../images/marker-icon-2x.png', iconSize: [25, 41] })}>
          <Popup>選択した場所</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}