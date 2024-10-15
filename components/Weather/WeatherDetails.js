import { View, Text, Image, StyleSheet } from "react-native";

function WeatherDetails({ weatherData, iconStyle, tempStyle }) {
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
              {weatherData.getTemperature()}°
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

export default WeatherDetails;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "column",
    alignItems: "center",
    flex: 4,
    // borderColor: 'red',
    // borderWidth: 1
  },
  icon: {
    width: undefined,
    height: "40%",
    aspectRatio: 1,
  },
  temperature: {
    fontSize: 120,
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
