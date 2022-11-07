import './App.css';
import Search from './components/search/search';
import { useState } from "react";

import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';

import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
function App() {

  // state for current weather data
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(''); // get lat and lon from search input data

    // get current weather data from openweather API
    const currentWeatherFetch = fetch(
      // API call https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
      `${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    // get forecast data from openweather API
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    // get data from both fetches

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const currentWeatherData = await response[0].json();
        const forecastData = await response[1].json();

        setCurrentWeather({
          city: searchData.label, ...currentWeatherData,
        });

        setForecast({
          city: searchData.label, ...forecastData,
        })

      }).catch(console.log);

  }

  return (
    <div className="container">
      <h1 className='app-name'>React Weather Forecast Group 7</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
