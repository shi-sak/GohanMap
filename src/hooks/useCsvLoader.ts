// hooks/useCsvLoader.ts
import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function useCsvLoader(filePath: string) {
  const [locations, setLocations] = useState<{ name: string; lat: number; lng: number; description: string }[]>([]);

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
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
  }, [filePath]);

  return locations;
}
