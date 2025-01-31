import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./App.css";
import Papa from "papaparse";


// マーカーのアイコン設定
import markerIconPngRBlue from "../images/marker-icon-2x-blue.png";
import markerIconPngBlue from "../images/marker-icon-blue.png";
import markerIconPngRRed from "../images/marker-icon-2x.png";
import markerIconPngRed from "../images/marker-icon.png";
import markerIconPngRYellow from "../images/marker-icon-2x-gold.png";
import markerIconPngYellow from "../images/marker-icon-gold.png";

// 初期マーカー用（青色）
const blueIcon = new L.Icon({
  iconRetinaUrl: markerIconPngRBlue,
  iconUrl: markerIconPngBlue,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -45],
});

// お店のマーカー用（黄色）
const yellowIcon = new L.Icon({
  iconRetinaUrl: markerIconPngRYellow,
  iconUrl: markerIconPngYellow,
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

  // CSV ファイルを読み込む関数
  const [locations, setLocations] = useState<{ name: string; lat: number; lng: number; description: string }[]>([]);

  useEffect(() => {
    fetch("../csv/mesi.csv")
      .then((response) => response.text())
      .then((csvText) => {
        // PapaParse で CSV をパース
        Papa.parse(csvText, {
          header: true, // ヘッダー行を解析
          skipEmptyLines: true, // 空行をスキップ
          dynamicTyping: true, // 数字を自動的に型変換
          complete: (result) => {
            const data = result.data as { name: string; latitude: string; longitude: string; description: string }[];
            const formattedData = data.map((row) => ({
              name: row.name,
              lat: parseFloat(row.latitude),
              lng: parseFloat(row.longitude),
              description: row.description,
            }));
            setLocations(formattedData);
          },
        });
      });
  }, []);

  // マーカークリック時の挙動

  const [selectedLocationname, setSelectedLocationName] = useState<string | null>(null); // クリックされたマーカーのnameを保持
  const [selectedLocationdesc, setSelectedLocationDesc] = useState<string | null>(null); // クリックされたマーカーのnameを保持

  const handleMarkerClick = (name: string, desc: string) => {
    setSelectedLocationName(name); // クリックされたマーカーのnameを保存
    setSelectedLocationDesc(desc); // クリックされたマーカーのdescを保存
  };

  return (
    <div className="App">
      <header>
        <h1>OpenMapTest</h1>
        {latLng && (
          <p>
            緯度: {latLng[0]}, 経度: {latLng[1]}
          </p>
        )}

      {/* マップ外に選択されたマーカーの名前を表示 */}
      <p>
        {selectedLocationname && (
          <div>
          <h3>{selectedLocationname}</h3>
          <p>{selectedLocationdesc}</p>
          </div>
        )}
      </p>

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

            {/*初期表示位置 */}
            <Marker position={[akibaIdo, akibaKeido]} icon={blueIcon}>
              <Popup>秋葉原駅</Popup>
            </Marker>

            {latLng && ( // 5. latLngの状態が更新されたらマーカーを表示
              <Marker position={latLng} icon={redIcon}>
                <Popup>選択した場所</Popup>
              </Marker>
            )}

            {/* CSVから読み込んだ店情報 */}
            {locations.map((loc, index) => (
              <Marker key={index} position={[loc.lat, loc.lng]} icon={yellowIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(loc.name, loc.description), // マーカーをクリックしたとき
                }}>
                <Popup>{loc.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>
      <footer>Sakamoto Gohan Map</footer>
    </div>
  );
}

export default App
