import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

import WeatherDetails from "../components/Weather/WeatherDetails";
import WeatherTitle from "../components/Weather/WeatherTitle";
import Weather from "../models/weather";

import { fetchWeatherData } from "../api/weatherApi";
import { LocationContext } from "../context/locationContext";

function HomeScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [displayedWeather, setDisplayedWeather] = useState();

  const { currentLocation } = useContext(LocationContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => {
        return (
            <View style={{paddingLeft: 20}}>
                <IconButton icon="star" color="white" size={28} />
            </View>
        )
      }
    });
  }, [navigation]);

  // Fetches weather data once the user's location is available
  useEffect(() => {
    if (currentLocation.length !== 0) {
        const { latitude, longitude } = currentLocation;
      fetchWeather("currentWeather", {latitude, longitude});
    }
  }, [currentLocation]);


  async function fetchWeather(type, data) {
    try {
      setError();
      setIsLoading(true);
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
          <View style={styles.weatherTitleContainer}>
            <WeatherTitle weatherData={displayedWeather} />
          </View>
          <View style={styles.currentWeatherContainer}>
            <WeatherDetails weatherData={displayedWeather} />
          </View>
        </>
      ) : (
        <Text>Search for a location or Allow location access to see the current weather</Text>
      )}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  weatherTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 30,
    paddingTop: 30,
  },
  currentWeatherContainer: {
    flex: 6,
  }
});
