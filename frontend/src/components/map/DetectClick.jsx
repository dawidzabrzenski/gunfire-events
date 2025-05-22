import { useRef } from "react";
import { useMapEvents } from "react-leaflet";

export default function DetectClick({
  getAddress,
  getVoivodeshipID,
  handleSetAddress,
  handleSetFormData,
}) {
  const debounceTimeout = useRef(null);

  useMapEvents({
    click: (e) => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(async () => {
        try {
          const data = await getAddress(e.latlng.lat, e.latlng.lng);
          const addr = data?.address || {};

          console.log(addr);

          const voivodeship = getVoivodeshipID(addr.state);

          handleSetAddress({
            city: addr.city || addr.town || addr.village || addr.hamlet || "",
            postal: addr.postcode || "",
            street: (addr.road || "") + " " + (addr.house_number || ""),
            voivodeship: voivodeship || "",
          });

          handleSetFormData(
            "city",
            addr.city || addr.town || addr.village || addr.hamlet || "",
          );
          handleSetFormData("postal", addr.postcode || "");
          handleSetFormData(
            "street",
            (addr.road || "") + " " + (addr.house_number || ""),
          );
          handleSetFormData("voivodeship_id", voivodeship);
        } catch (err) {
          console.error("Błąd przy pobieraniu adresu:", err);
          handleSetAddress({
            city: "",
            postal: "",
            street: "",
            voivodeship: "",
          });
        }
      }, 1500);
    },
  });

  return null;
}
