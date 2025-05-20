import { useState } from "react";
import axios from "axios";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  async function getAddress(lat, lon) {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat,
            lon,
            format: "json",
          },
        },
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Błąd podczas pobierania adresu:", error);
      return null;
    }
  }

  return { isLoading, position, setPosition, getPosition, getAddress };
}
