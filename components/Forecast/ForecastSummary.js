import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  formatTemperature,
  getOverallTemp,
  getOverallWeatherIcon,
} from "../../utils/utils";
import moment from "moment";

function ForecastSummary({ date, dayForecast, handleIsOpened }) {
  const formattedDate = moment(date).format("ddd DD MMM");
  const overallTemp = getOverallTemp(dayForecast);
  const overallWeatherIcon = getOverallWeatherIcon(dayForecast);
  
  return (
    <TouchableOpacity onPress={() => handleIsOpened(date)}>
      <View style={styles.summaryContainer}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Image source={{ uri: overallWeatherIcon }} style={styles.icon} />
        <Text style={styles.temperature}>{formatTemperature(overallTemp)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ForecastSummary;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
    padding: 8,
    backgroundColor: "rgba(82, 138, 180, 0.1)",
  },
  date: {
    fontWeight: "bold",
    color: "white",
  },
  temperature: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  icon: {
    height: 60,
    width: 60,
  },
});
