import { FlatList, StyleSheet, Text, View } from "react-native";
import WeatherDisplay from "../Weather/WeatherDisplay";

function DailyForecast({ forecastData, date }) {
  return (
    <FlatList
      data={forecastData[date]}
      contentContainerStyle={{gap: 10, padding: 10}}
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
      horizontal={true}
    />
  );
}

export default DailyForecast;

const styles = StyleSheet.create({
  weatherContainer: {
    alignItems: 'center',
    width: 70,
    padding: 10
  },
  time: {
    color: "white",
    fontWeight: 'bold'
  },
  icon: {
    width: 60,
    height: 60,
  },
  temperature: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500'
  }
});
