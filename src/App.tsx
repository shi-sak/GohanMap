import { useState } from "react";
import Map from "./components/Map";
import Form from "./components/Form";
import useCsvLoader from "./hooks/useCsvLoader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [latLng, setLatLng] = useState<[number, number] | null>(null);
  const locations = useCsvLoader("../csv/mesi.csv");
  const [selectedLocation, setSelectedLocation] = useState<{ name: string; description: string } | null>(null);

  // 修正：setSelectedLocation をラップして型を合わせる
  const handleMarkerClick = (name: string, desc: string) => {
    setSelectedLocation({ name, description: desc }); // nameとdescをオブジェクトとしてセット
  };

  return (
    <div className="App">
      <Header selectedLocation={selectedLocation} latLng={latLng} />
      <main>
        <div className="map-container">
          <Map latLng={latLng} setLatLng={setLatLng} locations={locations} handleMarkerClick={handleMarkerClick} />
        </div>
        <div>
          <Form/>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;