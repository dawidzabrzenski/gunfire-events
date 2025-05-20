import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    setPosition: setGeolocationPosition,
    getPosition,
    getAddress,
  } = useGeolocation();

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition],
  );

  function DetectClick({ setGeo }) {
    useMapEvents({
      click: (e) => {
        setGeo(null);
        getAddress(e.latlng.lat, e.latlng.lng);
      },
    });
  }

  return (
    <div>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geolocationPosition && (
          <Marker position={[geolocationPosition.lat, geolocationPosition.lng]}>
            <Popup>
              <span>🏠</span>
              <span>Twoja lokalizacja</span>
            </Popup>
          </Marker>
        )}

        <ChangeCenter position={mapPosition} />
        <DetectClick setGeo={setGeolocationPosition} />
      </MapContainer>

      {!geolocationPosition && (
        <button onClick={getPosition}>
          {isLoadingPosition ? "Ładowanie..." : "Wykryj moją lokalizację"}
        </button>
      )}
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;
