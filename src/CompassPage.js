import { useEffect, useState } from "react";

export function CompassPage() {
  const [degrees, setDegrees] = useState(0);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    window.addEventListener("deviceorientation", (event) => {
      setDegrees(event.alpha);
      if (event.alpha >= 20 && event.alpha <= 21) {
        navigator.vibrate(500);
      }
    });
    navigator.permissions.query({ name: "geolocation" });

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position);
    });
  }, []);
  return (
    <div>
      <h1 style={{ color: "black" }}>Compass</h1>
      <p>{degrees ?? "-"}</p>
      <p>{location?.coords.latitude ?? "-"}</p>

      <button
        onClick={() => {
          navigator.vibrate(500);
        }}
      >
        Vibrate
      </button>
    </div>
  );
}
