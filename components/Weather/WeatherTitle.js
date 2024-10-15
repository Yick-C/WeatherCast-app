import { Text, View, StyleSheet } from "react-native";
import moment from "moment";
import IconButton from "../UI/IconButton";

function WeatherTitle({ weatherData }) {
  return (
    <View style={styles.container}>
      {weatherData.cityName == null ? (
        <Text style={styles.location}>
          <IconButton icon="location" color="white" size={24} /> Unknown
        </Text>
      ) : (
        <Text style={styles.location}>
          <IconButton icon="location" color="white" size={24} />{" "}
          {weatherData.cityName}, {weatherData.country}
        </Text>
      )}
      <Text style={styles.date}>
        {weatherData.getCurrentDateTime()}
      </Text>
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
    paddingLeft: 30
  },
  location: {
    fontSize: 28,
    color: "white",
  },
});
