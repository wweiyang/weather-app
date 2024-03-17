import React from "react";
import axios from "axios";
import { useWeather } from "../../hooks/useWeather";
import styles from "./form.module.css";
import { WEATHER_API_KEY } from "../../utils/constants";

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
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="city" className={styles.label}>
        City
      </label>
      <input
        type="text"
        id="city"
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className={styles.input}
      />
      <label htmlFor="country" className={styles.label}>
        Country
      </label>
      <input
        type="text"
        id="country"
        placeholder="Enter country"
        onChange={(e) => setCountry(e.target.value)}
        value={country}
        className={styles.input}
      />
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.button}>
          Search
        </button>
        <button
          type="button"
          onClick={handleClearInputs}
          className={styles.button}
        >
          Clear
        </button>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
}
