import React, { useState } from "react";
import styles from "./App.module.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getWeather(city, country);
  };

  const getWeather = async (city: string, country: string) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      console.log(response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearInputs = () => {
    setCity("");
    setCountry("");
  };

  // TODO: put functions into separate utils file
  const transformData = (data: any) => {
    if (!data) return;
    const transformedData = {
      location: data.name,
      country: data.sys.country,
      title: data.weather[0].main,
      description: data.weather[0].description,
      temperature: data.main.temp,
      temperatureMin: data.main.temp_min,
      temperatureMax: data.main.temp_max,
      humidity: data.main.humidity,
      time: new Date(data.dt * 1000).toLocaleString(),
    };
    return transformedData;
  };

  const transformedData = transformData(weatherData);

  // TODO: create a separate component for the form
  return (
    <div>
      <h1>Today's Weather</h1>
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
            <p>{transformedData?.time}</p>
          </div>
        </div>
      )}
      <div>
        <h1>Search History</h1>
        <div className={styles.historyItem}>
          <p>location</p>
          <p>time</p>
          <div>
            <button>search</button>
            <button>delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
