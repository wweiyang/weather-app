import React from "react";
import { useWeather } from "../../hooks/useWeather";
import { storeSearchHistory, transformData } from "../../utils/utils";
import sun from "../../assets/sun.png";
import styles from "./results.module.css";

import SearchHistory from "../SearchHistory/History";

export default function Results(): JSX.Element {
  const { weatherData } = useWeather();

  const transformedData = transformData(weatherData);
  storeSearchHistory(transformedData);

  return (
    <div className={styles.resultsContainer}>
      <h1 className={styles.resultsHeading}>Today's Weather</h1>
      {transformedData && (
        <div className={styles.results}>
          <div>
            <p
              className={styles.temperature}
            >{`${transformedData?.temperature}\u00B0`}</p>
            <p
              className={styles.temperatureRange}
            >{`H: ${transformedData?.temperatureMax}\u00B0 L: ${transformedData?.temperatureMin}\u00B0`}</p>
            <p
              className={styles.location}
            >{`${transformedData?.location}, ${transformedData.country}`}</p>
          </div>
          <div className={styles.extraResults}>
            <img src={sun} alt="weather icon" className={styles.weatherImage} />
            <p className={styles.title}>{transformedData?.title}</p>
            <p className={styles.description}>{transformedData?.description}</p>
            <p
              className={styles.humidity}
            >{`Humidity: ${transformedData.humidity}%`}</p>
            <p className={styles.datetime}>{transformedData?.datetime}</p>
          </div>
        </div>
      )}
      <SearchHistory />
    </div>
  );
}
