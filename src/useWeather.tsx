import React, { createContext, useState, useContext } from "react";

interface WeatherContextType {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  weatherData: any;
  setWeatherData: React.Dispatch<React.SetStateAction<any>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        country,
        setCountry,
        weatherData,
        setWeatherData,
        error,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
