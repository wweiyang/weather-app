import React, { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(city, country);
  };

  const handleClear = () => {
    setCity("");
    setCountry("");
  };

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
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
      <div>
        <p>location</p>
        <p>title</p>
        <div>
          <p>Description:</p>
          <p>description</p>
        </div>
        <div>
          <p>Temperature:</p>
          <p>temperature</p>
        </div>
        <div>
          <p>Humidity:</p>
          <p>humidity</p>
        </div>
        <div>
          <p>Time:</p>
          <p>time</p>
        </div>
      </div>
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
