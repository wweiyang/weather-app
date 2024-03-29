import React, { useState } from "react";
import { useWeather } from "../../hooks/useWeather";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./history.module.css";
import { WEATHER_API_KEY } from "../../utils/constants";

export default function SearchHistory(): JSX.Element {
  const { setCity, setCountry, setWeatherData, setError } = useWeather();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [trigger, setTrigger] = useState(false);

  const localStorageEntries = Object.entries(localStorage)?.map(
    ([key, value]) => [key, JSON.parse(value)]
  );

  // sort entries by date using the keys which are the dates
  const orderedEntries = localStorageEntries.sort(([keyA], [keyB]) => {
    return new Date(keyB).getTime() - new Date(keyA).getTime();
  });

  const handleSearch = (city: string, country: string) => {
    setCity(city);
    setCountry(country);
    getWeather(city, country);
  };

  const getWeather = async (city: string, country: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${WEATHER_API_KEY}`
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
    <>
      {orderedEntries.length === 0 && (
        <p className={styles.noHistory}>
          Perform a search to check today's weather!
        </p>
      )}
      {orderedEntries.length > 0 && (
        <div className={styles.historyContainer}>
          <h1 className={styles.historyHeading}>Search History</h1>
          {orderedEntries.map(([key, value]) => (
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
                <button
                  onClick={() => deleteItem(key)}
                  className={styles.button}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
