import React from "react";
import { useWeather } from "../../hooks/useWeather";
import { storeSearchHistory, transformData } from "../../utils/utils";
import styles from "./results.module.css";

import SearchHistory from "../SearchHistory/SearchHistory";

export default function Results(): JSX.Element {
  const { weatherData } = useWeather();

  const transformedData = transformData(weatherData);
  storeSearchHistory(transformedData);

  return (
    <div className={styles.resultsContainer}>
      <h1>Today's Weather</h1>
      {transformedData && (
        <div>
          <p>{`${transformedData?.location}, ${transformedData.country}`}</p>
          <p>{transformedData?.title}</p>
          <div>
            <p>{transformedData?.description}</p>
          </div>
          <div>
            <p>{`${transformedData?.temperature}\u00B0C`}</p>
          </div>
          <div>
            <p>{`${transformedData?.temperatureMin}\u00B0C - ${transformedData?.temperatureMax}\u00B0C`}</p>
          </div>
          <div>
            <p>{`${transformedData.humidity}%`}</p>
          </div>
          <div>
            <p>{transformedData?.datetime}</p>
          </div>
        </div>
      )}
      <SearchHistory />
    </div>
  );
}
