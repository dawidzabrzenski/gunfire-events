import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { useGeolocation } from "../../hooks/useGeolocation";
import { getVoivodeshipID } from "../../utils/getVoivodeshipID";

import DetectClick from "./DetectClick";
import ChangeCenter from "./ChangeCenter";
import UserLocationMarker from "./UserLocationMarker";
import DetectLocationButton from "./DetectLocationButton";

import "leaflet/dist/leaflet.css";

function Map({
  handleSetAddress,
  handleSetFormData,
  readonly = false,
  initialPosition = null,
}) {
  const [mapPosition, setMapPosition] = useState(initialPosition || [40, 0]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
    getAddress,
  } = useGeolocation();

  useEffect(() => {
    if (!readonly && geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition, readonly]);

  useEffect(() => {
    if (readonly && initialPosition) {
      setMapPosition(initialPosition);
    }
  }, [initialPosition, readonly]);

  return (
    <div>
      <MapContainer
        center={mapPosition}
        zoom={readonly && initialPosition ? 14 : 6}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {readonly && initialPosition && (
          <UserLocationMarker
            position={{ lat: initialPosition[0], lng: initialPosition[1] }}
          />
        )}

        {!readonly && geolocationPosition && (
          <UserLocationMarker position={geolocationPosition} />
        )}

        {!readonly && (
          <DetectClick
            getAddress={getAddress}
            getVoivodeshipID={getVoivodeshipID}
            handleSetAddress={handleSetAddress}
            handleSetFormData={handleSetFormData}
          />
        )}
      </MapContainer>

      {!readonly && !geolocationPosition && (
        <DetectLocationButton
          isLoading={isLoadingPosition}
          onClick={getPosition}
        />
      )}
    </div>
  );
}

export default Map;
