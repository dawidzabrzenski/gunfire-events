import { useMap } from "react-leaflet";

export default function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
