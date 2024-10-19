import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

import Weather from "../models/weather";
import WeatherTitle from "../components/Weather/WeatherTitle";
import WeatherDisplay from "../components/Weather/WeatherDisplay";
import WeatherDetails from "../components/Weather/WeatherDetails";

import SearchBar from "../components/SearchBar/SearchBar";
import FavouritesList from "../components/FavouritesList/FavouritesList";

import { fetchWeatherData } from "../api/weatherApi";
import { LocationContext } from "../context/locationContext";

function HomeScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [displayedWeather, setDisplayedWeather] = useState();
  const [search, setSearch] = useState("");

  const { currentLocation, updateCurrentLocation } =
    useContext(LocationContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () => {
        return (
          <View style={{ paddingRight: 20 }}>
            <SearchBar setSearch={setSearch} />
          </View>
        );
      },
    });
  }, [navigation]);

  // Fetches weather data if user's current location or search updates
  useEffect(() => {
    async function fetchLocationWeather() {
      try {
        setError();
        setIsLoading(true);

        if (search) {
          const weatherData = await fetchWeatherData("cityWeather", {
            cityName: search,
          });
          setDisplayedWeather(new Weather(weatherData));
        } else if (currentLocation.length !== 0) {
          const { latitude, longitude } = currentLocation;
          const weatherData = await fetchWeatherData("currentWeather", {
            latitude,
            longitude,
          });
          setDisplayedWeather(new Weather(weatherData));
          updateCurrentLocation(weatherData.name);
        } else {
          setIsLoading(false);
          return null;
        }
      } catch (error) {
        setError("There's been an error with fetching the weather data");
      } finally {
        setIsLoading(false);
      }
    }

    if (currentLocation.length !== 0 || search) {
      fetchLocationWeather();
    }
  }, [currentLocation, search]);

  if (error) {
    return <ErrorOverlay message={error} />
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.appContainer}>
      {displayedWeather ? (
        <>
          <View style={styles.weatherTitleContainer}>
            <WeatherTitle
              weatherData={displayedWeather}
              showCurrentWeather={setSearch}
            />
          </View>
          <View style={styles.currentWeatherContainer}>
            <WeatherDisplay weatherData={displayedWeather} />
            <WeatherDetails weatherData={displayedWeather} />
          </View>
          <View style={styles.favouritesListContainer}>
            <FavouritesList handleSelectedCity={setSearch} />
          </View>
        </>
      ) : (
        <ErrorOverlay message="Search for a location or Allow location access to see the current weather" />
      )}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
  },
  weatherTitleContainer: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 30,
    paddingTop: 30,
  },
  currentWeatherContainer: {
    flex: 5,
    alignItems: "center",
  },
  favouritesListContainer: {
    flex: 1,
  },
});
