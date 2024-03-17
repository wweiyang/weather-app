import React, { useState } from "react";
import { useWeather } from "../../hooks/useWeather";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./history.module.css";
import { WEATHER_API_KEY } from "../../utils/constants";

export default function SearchHistory(): JSX.Element {
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
    <div className={styles.historyContainer}>
      <h1 className={styles.historyHeading}>Search History</h1>
      {localStorageEntries.map(([key, value]) => (
        <div className={styles.historyItem} key={key}>
          <div className={styles.itemDetails}>
            <p
              className={styles.location}
            >{`${value.location}, ${value.country}`}</p>
            <p className={styles.datetime}>{`${value.datetime}`}</p>
          </div>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => handleSearch(value.location, value.country)}
              className={styles.button}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button onClick={() => deleteItem(key)} className={styles.button}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
