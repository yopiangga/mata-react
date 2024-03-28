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

  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    recognition.lang = "en-US";
    recognition.onstart = () => {
      setListening(true);
      console.log("Speech recognition started");
    };

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      setTranscript(text);
    };

    recognition.onend = () => {
      setListening(false);
      console.log("Speech recognition ended");
    };

    recognition.onerror = (error) => {
      setListening(false);
      console.error("Speech recognition error:", error);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      window.speechRecognition.stop();
    }
  };

  return (
    <div>
      <h1 style={{ color: "black" }}>Compass App</h1>
      <p>Demo SSL for support access hardware with modern browser. @alfian-py</p>
      <p>{degrees ?? "-"}</p>
      <p>{location?.coords.latitude ?? "-"}</p>

      <button
        onClick={() => {
          navigator.vibrate(500);
        }}
      >
        Vibrate
      </button>

      <div>
        <button onClick={startListening} disabled={listening}>
          Start Listening
        </button>
        <button onClick={stopListening} disabled={!listening}>
          Stop Listening
        </button>
        <p>Transcript: {transcript}</p>
      </div>
    </div>
  );
}
