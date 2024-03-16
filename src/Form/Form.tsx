import React from "react";
import axios from "axios";
import { useWeather } from "../useWeather";
import styles from "./form.module.css";
import { WEATHER_API_KEY } from "../constants";

export default function Form(): JSX.Element {
  const {
    city,
    setCity,
    country,
    setCountry,
    setWeatherData,
    error,
    setError,
  } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getWeather(city, country);
  };

  const getWeather = async (city: string, country: string) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
      setError("Not found");
    }
  };

  const handleClearInputs = () => {
    setCity("");
    setCountry("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="city">City:</label>
      <input
        type="text"
        id="city"
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
        value={city}
      />
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        id="country"
        placeholder="Enter country"
        onChange={(e) => setCountry(e.target.value)}
        value={country}
      />
      <div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClearInputs}>
          Clear
        </button>
      </div>
      <p>{error}</p>
    </form>
  );
}
