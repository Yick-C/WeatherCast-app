import { Text, View, StyleSheet } from "react-native";
import IconButton from "../UI/IconButton";

import { useContext } from "react";
import { LocationContext } from "../../context/locationContext";

function WeatherTitle({ weatherData, showCurrentWeather }) {
  const locationCtx = useContext(LocationContext);

  const displayedCity = weatherData.cityName;

  const cityIsFavourite = locationCtx.favouriteCities.includes(displayedCity);

  function favouriteCityHandler() {
    // Cannot remove current location from favourites list
    // Otherwise, the button toggles if the city is favourited or not
    if (locationCtx.favouriteCities[0] !== displayedCity) {
      if (cityIsFavourite) {
        locationCtx.removeFavourite(displayedCity);
      } else {
        locationCtx.addFavourite(displayedCity);
      }
    }
  }

  return (
    <View style={styles.container}>
      {weatherData.cityName == null ? (
        <Text style={styles.location}>
          <IconButton icon="location" color="white" size={24} /> Unknown
        </Text>
      ) : (
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <IconButton
            icon="location"
            color="white"
            size={28}
            onPress={() => showCurrentWeather(locationCtx.favouriteCities[0])}
          />
          <Text style={styles.location}>
            {weatherData.cityName}, {weatherData.country}
          </Text>
          <IconButton
            icon={cityIsFavourite ? "star" : "star-outline"}
            color="white"
            size={32}
            onPress={favouriteCityHandler}
          />
        </View>
      )}
      <Text style={styles.date}>{weatherData.getCurrentDateTime().format("ddd DD MMM, HH:mm")}</Text>
    </View>
  );
}

export default WeatherTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
  },
  date: {
    fontSize: 20,
    color: "white",
    paddingLeft: 38,
  },
  location: {
    fontSize: 28,
    color: "white",
  },
});
