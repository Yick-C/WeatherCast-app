import { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

import WeatherDetails from "../components/Weather/WeatherDetails";
import Weather from "../models/weather";

import { fetchWeatherData } from "../api/WeatherAPI";
import { LocationContext } from "../context/location-context";

function HomeScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [displayedWeather, setDisplayedWeather] = useState();

  const { currentLocation } = useContext(LocationContext);

  useEffect(() => {
    if (currentLocation.length !== 0) {
        const { latitude, longitude } = currentLocation;
      fetchWeather("currentWeather", {latitude, longitude});
    }
  }, [currentLocation]);

  async function fetchWeather(type, data) {
    try {
      const weatherData = await fetchWeatherData(type, data);

      const weatherObj = new Weather(weatherData);

      setDisplayedWeather(weatherObj);
    } catch (error) {
      setError("There's been an error with fetching the weather data");
    } finally {
      setIsLoading(false);
    }
  }

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.appContainer}>
      {displayedWeather ? (
        <>
          <View style={styles.currentWeatherContainer}>
            <WeatherDetails weatherData={displayedWeather} />
          </View>
        </>
      ) : (
        <View style={styles.currentWeatherContainer}>
        </View>
      )}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  currentWeatherContainer: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
  }
});
