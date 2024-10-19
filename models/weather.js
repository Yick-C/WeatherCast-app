import { BASE_URL_IMG } from "../constants/global";
import moment from "moment";

class Weather {
  constructor(data) {
    this.cityName = data.name,
    this.country = data.sys.country,
    this.longitude = data.coord.lon,
    this.latitude = data.coord.lat,
    this.imageUrl = `${BASE_URL_IMG}/${data.weather[0].icon}@2x.png`;
    this.feelsLikeTemp = data.main.feels_like,
    this.temperature = data.main.temp,
    this.weatherType = data.weather[0].main,
    this.description = data.weather[0].description,
    this.windSpeed = data.wind.speed,
    this.windGust = data.wind.gust,
    this.cloudiness = data.clouds.all,
    this.datetimeUnix = data.dt,
    this.timezone = data.timezone;
  }

  getCurrentDateTime() {
    const convertedTimezone = this.timezone / 60; // timezone is in seconds, moments uses minutes
    const now = moment.unix(this.datetimeUnix).utcOffset(convertedTimezone);
    return now;
  }

}

export default Weather;
