import { FlatList, StyleSheet, Text, View } from "react-native";
import WeatherDisplay from "../Weather/WeatherDisplay";

function DailyForecast({ forecastData, date }) {
  return (
    <FlatList
      data={forecastData[date]}
      renderItem={({ item }) => {
        return (
          <View style={styles.weatherContainer}>
            <Text style={styles.time}>{item.time}</Text>
            <WeatherDisplay
            weatherData={item}
            iconStyle={styles.icon}
            tempStyle={styles.temperature}
            /> 
          </View>
        );
      }}
      contentContainerStyle={{ gap: 10 }}
      horizontal={true}
    />
  );
}

export default DailyForecast;

const styles = StyleSheet.create({
  weatherContainer: {
    alignItems: 'center',
    width: 90,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
  },
  time: {
    color: "white",
  },
  icon: {
    width: 60,
    height: 60,
  },
  temperature: {
    fontSize: 14,
  }
});
