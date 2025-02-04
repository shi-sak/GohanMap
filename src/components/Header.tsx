// components/Header.tsx
interface HeaderProps {
    latLng: [number, number] | null;
    selectedLocation: { name: string; description: string } | null;
  }
  
  export default function Header({ latLng, selectedLocation }: HeaderProps) {
    return (
      <header>
        <h1>秋葉原ご飯マップ</h1>
        {/* クリックした座標の情報 */}
        {(
          <p>
            登録用 クリックした位置の緯度: {latLng && latLng[0]}, 経度: {latLng && latLng[1]}
          </p>
        )}
        {/* 選択された場所の情報 */}
        {(
          <div>
            <h3>{selectedLocation && selectedLocation.name}</h3>
            <p>{selectedLocation && selectedLocation.description}</p>
          </div>
        )}
  

      </header>
    );
  }
  