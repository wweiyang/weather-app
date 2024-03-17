import { WeatherProvider } from "./hooks/useWeather";
import Form from "./components/Form/Form";
import Results from "./components/Results/Results";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.main}>
      <WeatherProvider>
        <Form />
        <Results />
      </WeatherProvider>
    </div>
  );
}

export default App;
