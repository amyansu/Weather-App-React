import { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  async function getWeather() {
    setError(null);
    setWeather(null);
    if (!city) {
      setError("Please enter a city");
      return;
    }

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(
        `${apiUrl}${(city)}&appid=${apiKey}`,
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather({
        name: data.name,
        temp: data.main?.temp,
        desc: data.weather?.[0]?.description,
      });
    } catch (err) {
      setError(err.message || "Failed to fetch weather");
    }
  }

  return (
    <>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Search</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <ul>
          <li>City: {weather.name}</li>
          <li>Temperature: {weather.temp}°C</li>
          <li>{weather.desc}</li>
        </ul>
      )}
    </>
  );
}
