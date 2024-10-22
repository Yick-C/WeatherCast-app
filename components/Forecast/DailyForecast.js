import { FlatList, StyleSheet, Text, View } from "react-native";
import WeatherDisplay from "../Weather/WeatherDisplay";

function DailyForecast({ forecastData, date }) {
  return (
    <FlatList
      data={forecastData[date]}
      key={date}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      horizontal={true}
      renderItem={({ item }) => (
        <View style={styles.weatherContainer}>
          <Text style={styles.time}>{item.time}</Text>
          <WeatherDisplay
            weatherData={item}
            iconStyle={styles.icon}
            tempStyle={styles.temperature}
          />
        </View>
      )}
    />
  );
}

export default DailyForecast;

const styles = StyleSheet.create({
  weatherContainer: {
    alignItems: "center",
    width: 70,
    padding: 5,
  },
  time: {
    color: "white",
    fontWeight: "bold",
  },
  icon: {
    width: 60,
    height: 60,
  },
  temperature: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
  },
});
