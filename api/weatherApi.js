/**
 * Weather API module to fetch current weather and forecast data
 * Uses the OpenWeatherMap API
 */

import axios from "axios";
import { API_KEY, BASE_URL, URL_UNITS } from "../constants/global";

export const fetchWeatherData = async (type, data) => {
  let endpoint;

  switch (type) {
    case "currentWeather":
      const currentWeatherUrl = `/weather?lat=${data.latitude}&lon=${data.longitude}${URL_UNITS}&appid=`;
      endpoint = `${BASE_URL}${currentWeatherUrl}${API_KEY}`;
      break;
    case "cityWeather":
      const cityWeatherUrl = `/weather?q=${data.cityName}${URL_UNITS}&appid=`
      endpoint = `${BASE_URL}${cityWeatherUrl}${API_KEY}`;
      break;
    case "forecast":
      const forecastUrl = `/forecast?lat=${data.latitude}&lon=${data.longitude}${URL_UNITS}&appid=`
      endpoint = `${BASE_URL}${forecastUrl}${API_KEY}`;
      break;
    default:
      return null;
  }

  try {
    const res = await axios.get(endpoint);
    return res.data;
  } catch (error) {
    console.log("Error fetching weather data", error);
    return null;
  }
};
