import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./App.css";

// マーカーのアイコン設定
import markerIconPngRBlue from "leaflet/dist/images/marker-icon-2x-blue.png";
import markerIconPngBlue from "leaflet/dist/images/marker-icon-blue.png";
import markerIconPngRRed from "leaflet/dist/images/marker-icon-2x.png";
import markerIconPngRed from "leaflet/dist/images/marker-icon.png";

// 初期マーカー用（青色）
const blueIcon = new L.Icon({
  iconRetinaUrl: markerIconPngRBlue,
  iconUrl: markerIconPngBlue,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -45],
});

// クリック時のマーカー用（赤色）
const redIcon = new L.Icon({
  iconRetinaUrl: markerIconPngRRed,
  iconUrl: markerIconPngRed,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -45],
});

// クリックイベントを処理するメソッド
interface LocationMarkerProps {
  setLatLng: (latLng: [number, number]) => void;
}

function LocationMarker({ setLatLng }: LocationMarkerProps) {
  useMapEvents({
    click(e) {
      setLatLng([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

//以下、レンダー
function App() {
  // 緯度経度を保持する状態
  const [latLng, setLatLng] = useState<[number, number] | null>(null);

  // 秋葉原の緯度経度
  const akibaIdo = 35.698322304937;
  const akibaKeido = 139.77301858032;
  const radius = 700;
  // 初期表示の範囲を計算
  const bounds = L.latLng([akibaIdo, akibaKeido]).toBounds(radius * 2);


  return (
    <div className="App">
      <header>
        <h1>OpenMapTest</h1>
        {latLng && (
          <p>
            緯度: {latLng[0]}, 経度: {latLng[1]}
          </p>
        )}
      </header>
      <main>
        <div className="map-container">
          <MapContainer
            bounds={bounds}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker setLatLng={setLatLng} />
            {latLng && ( // 5. latLngの状態が更新されたらマーカーを表示
              <Marker position={latLng} icon={redIcon}>
                <Popup>選択した場所</Popup>
              </Marker>
            )}

            <Marker position={[akibaIdo, akibaKeido]} icon={blueIcon}>
              <Popup>秋葉原駅</Popup>
            </Marker>
          </MapContainer>
        </div>
      </main>
      <footer>Sakamoto Gohan Map</footer>
    </div>
  );
}

export default App
