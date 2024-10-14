import { createContext, useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export const LocationContext = createContext({
  currentLocation: [],
  cities: [],
  addFavourite: (city) => {},
  removeFavourite: (city) => {},
});

function LocationContextProvider({ children }) {
  const [currentLocation, setCurrentLocation] = useState([]);
  const [favouriteCities, setFavouriteCities] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let locationData = await getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });
    })();
  }, []);

  function addFavourite(city) {
    setFavouriteCities((currentCitiesList) => [...currentCitiesList, city]);
  }

  function removeFavourite(city) {
    setFavouriteCities((currentCitiesList) => currentCitiesList.filter(cityName => cityName !== city));
  }

  const value = {
    currentLocation: currentLocation,
    cities: favouriteCities,
    addFavourite: addFavourite,
    removeFavourite: removeFavourite,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationContextProvider;
