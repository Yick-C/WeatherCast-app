import { BASE_URL_IMG } from "../constants/global";

export function formatTemperature(temp) {
  return Math.round(temp) + "°";
}

/*
// Functions for getting overall forecast for the day
*/
export function getOverallTemp(dayForecastData) {
  // Get the average by adding all temperatures in the array and dividing by number of items in array
  const averageTemp =
    dayForecastData.reduce((total, next) => total + next.temperature, 0) /
    dayForecastData.length;

  return Math.round(averageTemp);
}

export function getOverallWeatherIcon(dayForecastData) {
  const frequencyMap = {};
  let mostCommon = null;
  let maxCount = 0;

  // Create array of icons but cut off end character (d or n specify day/night version)
  // e.g. icon is '10n' so get only '10'
  const iconList = dayForecastData.map((a) => a.icon.slice(0, 2));

  iconList.forEach((value) => {
    // Either set count to 0 or add 1 to count
    frequencyMap[value] = (frequencyMap[value] || 0) + 1;

    if (frequencyMap[value] > maxCount) {
      mostCommon = value;
      maxCount = frequencyMap[value];
    }
  });

  const iconUrl = `${BASE_URL_IMG}/${mostCommon}d@2x.png`;

  return iconUrl;
}
