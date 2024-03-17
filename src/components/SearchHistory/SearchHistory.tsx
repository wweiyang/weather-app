import React, { useState } from "react";
import { useWeather } from "../../hooks/useWeather";
import axios from "axios";
import styles from "./searchhistory.module.css";
import { WEATHER_API_KEY } from "../../utils/constants";

function SearchHistory() {
  const { setCity, setCountry, setWeatherData, setError } = useWeather();
  const [trigger, setTrigger] = useState(false);

  const localStorageEntries = Object.entries(localStorage)?.map(
    ([key, value]) => [key, JSON.parse(value)]
  );

  const handleSearch = (city: string, country: string) => {
    setCity(city);
    setCountry(country);
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

  const deleteItem = (key: string) => {
    setWeatherData(null);
    setCity("");
    setCountry("");
    localStorage.removeItem(key);
    setTrigger((prev) => !prev); // toggle trigger to force re-render
  };

  return (
    <div>
      <h1>Search History</h1>
      {localStorageEntries.map(([key, value]) => (
        <div className={styles.historyItem} key={key}>
          <p>{`${value.location}, ${value.country}`}</p>
          <p>{`${value.datetime}`}</p>
          <div>
            <button onClick={() => handleSearch(value.location, value.country)}>
              search
            </button>
            <button onClick={() => deleteItem(key)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchHistory;
