import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BASE_URL_IMG } from "../../constants/global";

import moment from "moment";
import DailyForecast from "./DailyForecast";
import ForecastSummary from "./ForecastSummary";

function ForecastList({ forecastData }) {
  const [forecasts, setForecasts] = useState(null);
  const [expandedDay, setExpandedDay] = useState(false);

  useEffect(() => {
    if (forecasts) {
      setExpandedDay(Object.keys(forecasts)[0]);
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

    return groupedData;
  }

  return (
    <>
      {forecasts && (
        <View style={styles.container}>
          {Object.keys(forecasts).map((date) => {
            return (
              <View style={styles.dateContainer}>
                <ForecastSummary
                  date={date}
                  dayForecast={forecasts[date]}
                  handleIsOpened={handleIsOpened}
                />
                {expandedDay === date && (
                  <DailyForecast forecastData={forecasts} date={date} />
                )}
              </View>
            );
          })}
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
    width: "100%",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    overflow: "hidden",
  },
});
