import axios from "axios";
import { API_KEY, BASE_URL } from "../constants/global";

const apiCall = async (endpoint) => {
  try {
    const res = await axios.get(endpoint);
    return res.data;
  } catch (error) {
    console.log("Error fetching weather data", error);
    return null;
  }
};

export const fetchWeatherData = async (type, data) => {
    let endpoint;

    switch (type) {
        case 'currentWeather':
            endpoint = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=${API_KEY}`;
            break;
        case 'cityWeather':
            endpoint = `${BASE_URL}/weather?q=${data.cityName}&units=metric&appid=${API_KEY}`;
            break;
        case 'forecast':
            endpoint = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=${API_KEY}`;
            break;
        default:
            throw new Error('Invalid type given');
    }

    return await apiCall(endpoint);
}