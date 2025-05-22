import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { useGeolocation } from "../../hooks/useGeolocation";
import { getVoivodeshipID } from "../../utils/getVoivodeshipID";

import DetectClick from "./DetectClick";
import ChangeCenter from "./ChangeCenter";
import UserLocationMarker from "./UserLocationMarker";
import DetectLocationButton from "./DetectLocationButton";

import "leaflet/dist/leaflet.css";

function Map({ handleSetAddress, handleSetFormData }) {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
    getAddress,
  } = useGeolocation();

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {geolocationPosition && (
          <UserLocationMarker position={geolocationPosition} />
        )}

        <DetectClick
          getAddress={getAddress}
          getVoivodeshipID={getVoivodeshipID}
          handleSetAddress={handleSetAddress}
          handleSetFormData={handleSetFormData}
        />
      </MapContainer>

      {!geolocationPosition && (
        <DetectLocationButton
          isLoading={isLoadingPosition}
          onClick={getPosition}
        />
      )}
    </div>
  );
}

export default Map;
