import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import moment from "moment";

import { BASE_URL_IMG } from "../../constants/global";
import DailyForecast from "./DailyForecast";

function groupForecastsByDay(data) {
  const groupedData = {};

  data.forEach((forecast) => {
    const date = forecast.dt_txt.split(" ")[0]; // example of dt_txt format is "2024-10-07 21:00:00"
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    const weatherObj = {
      time: moment(forecast.dt_txt).format("HH:mm"),
      temperature: forecast.main.temp,
      imageUrl: `${BASE_URL_IMG}/${forecast.weather[0].icon}@2x.png`,
    };
    groupedData[date].push(weatherObj);
  });

  return {
    date: Object.keys(groupedData),
    forecasts: groupedData,
  };
}

function ForecastList({ forecastData }) {
  const [forecasts, setForecasts] = useState(null);

  useEffect(() => {
    setForecasts(groupForecastsByDay(forecastData));
  }, []);

  return (
    <>
      {forecasts && (
        <View style={styles.container}>
          <FlatList
            data={forecasts.date}
            renderItem={({ item }) => {
              const date = moment(item).format("ddd DD MMM");
              return (
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>{date}</Text>
                  <DailyForecast
                    forecastData={forecasts.forecasts}
                    date={item}
                  />
                </View>
              );
            }}
          />
        </View>
      )}
    </>
  );
}

export default ForecastList;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  dateContainer: {
    paddingLeft: 20,
    paddingBottom: 20
  },
  date: {
    fontWeight: "bold",
    paddingBottom: 10
  }
});
