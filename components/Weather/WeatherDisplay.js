import { View, Text, Image, StyleSheet } from "react-native";

function WeatherDisplay({ weatherData, iconStyle, tempStyle }) {
  return (
    <>
      {weatherData ? (
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
      ) : (
        <Text style={styles.error}>
          {" "}
          Error occurred in fetching the weather
        </Text>
      )}
    </>
  );
}

export default WeatherDisplay;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  icon: {
    width: 200,
    height: 170,
    aspectRatio: 1
  },
  temperature: {
    fontSize: 120,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    color: "white",
    fontSize: 20,
    fontWeight: 'bold'
  },
  wind: {
    flexDirection: "row",
  },
  error: {
    color: "white",
  },
});
