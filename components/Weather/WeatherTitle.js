import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import IconButton from "../UI/IconButton";

function WeatherTitle({ place, time, timezone, country }) {
  const convertedTimezone = timezone / 60; // timezone is in seconds, moments uses minutes
  const now = moment
    .unix(time)
    .utcOffset(convertedTimezone)
    .format("MMM DD, HH:mm");

  return (
    <View style={styles.container}>
      
      {place == null ? (
        <Text style={styles.location}>
          <IconButton icon="location" color="white" size={24} /> Unknown
        </Text>
      ) : (
        <Text style={styles.location}>
          <IconButton icon="location" color="white" size={24} /> {place},{" "}
          {country}
        </Text>
      )}
      <Text style={styles.date}>{now}</Text>
    </View>
  );
}

export default WeatherTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
    alignItems: 'center'
  },
  date: {
    fontSize: 16,
    color: "white",
  },
  location: {
    fontSize: 24,
    color: "white",
  },
});
