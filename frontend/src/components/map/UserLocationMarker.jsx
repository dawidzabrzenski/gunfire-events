import { Marker, Popup } from "react-leaflet";

export default function UserLocationMarker({ position }) {
  if (!position) return null;

  return (
    <Marker position={[position.lat, position.lng]}>
      <Popup>
        <span>🏠</span>
        <span>Twoja lokalizacja</span>
      </Popup>
    </Marker>
  );
}
