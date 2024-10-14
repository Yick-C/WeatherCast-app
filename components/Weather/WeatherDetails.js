import { View, Text, Image, StyleSheet } from "react-native";
import Weather from "../../models/weather";
import WeatherTitle from "./WeatherTitle";

function WeatherDetails({ weatherData, iconStyle, tempStyle }) {
  return (
    <>
      {weatherData ? (
        <View>
          <WeatherTitle
            place={weatherData.cityName}
            time={weatherData.datetimeUnix}
            timezone={weatherData.timezone}
            country={weatherData.country}
          />
          <View style={styles.rootContainer}>
            <Image
              source={{
                uri: weatherData.imageUrl,
              }}
              style={[styles.icon, iconStyle]}
            />
            <Text style={[styles.temperature, tempStyle]}>
              {Math.round(weatherData.temperature)}°
            </Text>
            <Text style={styles.description}>{weatherData.description}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.error}>
          {" "}
          Error occurred in fetching the weather
        </Text>
      )}
    </>
  );
}

export default WeatherDetails;

const styles = StyleSheet.create({
  rootContainer: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    width: undefined,
    height: "50%",
    aspectRatio: 1,
  },
  temperature: {
    fontSize: 100,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    color: "white",
    fontSize: 20,
  },
  wind: {
    flexDirection: "row",
  },
  error: {
    color: "white",
  },
});
