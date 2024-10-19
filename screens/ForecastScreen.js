import { useContext, useState, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LocationContext } from "../context/locationContext";
import { fetchWeatherData } from "../api/weatherApi";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";

import ForecastList from "../components/Forecast/ForecastList";

function ForecastScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { currentLocation } = useContext(LocationContext);
  const [forecastData, setForecastData] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Current Forecast",
      headerTransparent: false,
    });
  }, [navigation]);

  // Fetches the forecast for the user's current location
  useEffect(() => {
    if (currentLocation.length !== 0) {
      const { latitude, longitude } = currentLocation;
      fetchWeather("forecast", { latitude, longitude });
    }
  }, [currentLocation]);

  async function fetchWeather(type, data) {
    try {
      setError();
      setIsLoading(true);
      const weatherData = await fetchWeatherData(type, data);

      setForecastData(weatherData.list);
    } catch (error) {
      setError("There's been an error with fetching the weather data");
    } finally {
      setIsLoading(false);
    }
  }

  // Returns error message from fetchWeather function if api is not working
  if (error) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.appContainer}>
      {forecastData ? (
        <View style={styles.forecastContainer}>
          {forecastData && <ForecastList forecastData={forecastData} />}
        </View>
      ) : (
        <ErrorOverlay message="Search for a location or Allow location access to see the current forecast" />
      )}
    </View>
  );
}

export default ForecastScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  forecastContainer: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
  },
});
