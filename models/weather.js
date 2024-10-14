class Weather {
    constructor(data) {
        this.cityName = data.name,
        this.country = data.sys.country,
        this.longitude = data.coord.lon,
        this.latitude = data.coord.lat,
        this.imageUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        this.temperature = data.main.temp,
        this.weatherType = data.weather[0].main,
        this.description = data.weather[0].description,
        this.windSpeed = data.wind.speed,
        this.windGust = data.wind.gust,
        this.datetimeUnix = data.dt,
        this.timezone = data.timezone
    }
}

export default Weather;