import { WeatherProvider } from "./hooks/useWeather";
import Form from "./components/Form/Form";
import Results from "./components/Results/Results";

function App() {
  return (
    <div>
      <WeatherProvider>
        <Form />
        <Results />
      </WeatherProvider>
    </div>
  );
}

export default App;
