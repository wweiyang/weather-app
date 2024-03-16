import { WeatherProvider } from "./useWeather";
import Form from "./Form/Form";
import Results from "./Results/Results";

function App() {
  return (
    <div>
      <WeatherProvider>
        <div>
          <Form />
          <Results />
        </div>
      </WeatherProvider>
    </div>
  );
}

export default App;
