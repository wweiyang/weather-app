import React from "react";
import axios from "axios";
import { useWeather } from "../useWeather";
import styles from "./form.module.css";

export default function Form(): JSX.Element {
  const { city, setCity, country, setCountry, setWeatherData } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getWeather(city, country);
  };

  const getWeather = async (city: string, country: string) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
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
    </form>
  );
}
