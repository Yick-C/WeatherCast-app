import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getOverallTemp,
  getOverallWeatherIcon,
  formatTemperature,
} from "../../utils/utils";
import { BASE_URL_IMG } from "../../constants/global";

import moment from "moment";
import DailyForecast from "./DailyForecast";

function ForecastList({ forecastData }) {
  const [forecasts, setForecasts] = useState(null);
  const [expandedDay, setExpandedDay] = useState(false);

  useEffect(() => {
    if (forecasts) {
      setExpandedDay(forecasts.date[0]);
    } else {
      setForecasts(groupForecastsByDay(forecastData));
    }
  }, [forecasts]);

  // Opens/Closes container with full day's forecast
  function handleIsOpened(date) {
    setExpandedDay(expandedDay === date ? null : date);
  }

  function groupForecastsByDay(data) {
    const groupedData = {};
  
    data.forEach((forecast) => {
      const date = forecast.dt_txt.split(" ")[0]; // example of dt_txt format is "2024-10-07 21:00:00"
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      const weatherObj = {
        time: moment(forecast.dt_txt).format("HH:mm"), // e.g. 18:00
        temperature: forecast.main.temp,
        icon: forecast.weather[0].icon,
        imageUrl: `${BASE_URL_IMG}/${forecast.weather[0].icon}@2x.png`,
      };
      groupedData[date].push(weatherObj);
    });
  
    return {
      date: Object.keys(groupedData),
      forecasts: groupedData,
    };
  }

  return (
    <>
      {forecasts && (
        <View style={styles.container}>
          <FlatList
            data={forecasts.date}
            key={forecasts.date}
            renderItem={({ item }) => {
              const date = moment(item).format("ddd DD MMM");

              const overallTemp = getOverallTemp(forecasts.forecasts[item]);
              const overallWeatherIcon = getOverallWeatherIcon(
                forecasts.forecasts[item]
              );
              return (
                <View style={styles.dateContainer}>
                  <TouchableOpacity onPress={() => handleIsOpened(item)}>
                    <View style={styles.summaryContainer}>
                      <Text style={styles.date}>{date}</Text>
                      <Image
                        source={{ uri: overallWeatherIcon }}
                        style={styles.icon}
                      />
                      <Text style={styles.temperature}>
                        {formatTemperature(overallTemp)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {expandedDay === item && (
                    <DailyForecast
                      forecastData={forecasts.forecasts}
                      date={item}
                    />
                  )}
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
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
    paddingLeft: 20,
    padding: 10,
    backgroundColor: 'rgba(82, 138, 180, 0.1)',
  },
  dateContainer: {
    width: "100%",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    overflow: "hidden",
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
