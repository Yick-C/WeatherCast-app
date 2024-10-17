import { useContext } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { LocationContext } from "../context/locationContext";

function FavouritesList({ handleSelectedCity }) {
  const { favouriteCities } = useContext(LocationContext);

  return (
    <>
      <Text style={styles.listTitle}>Favourite Cities</Text>
      <ScrollView
        style={styles.container}
        horizontal={true}
        contentContainerStyle={{ gap: 10 }}
      >
        {favouriteCities.map((city) => (
          <TouchableOpacity
            key={city}
            style={styles.citiesContainer}
            onPress={() => handleSelectedCity(city)}
          >
            <Text style={styles.citiesText}>{city}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

export default FavouritesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listTitle: {
    color: "white",
    paddingLeft: 10,
    fontWeight: "bold",
  },
  citiesContainer: {
    padding: 15,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",
  },
  citiesText: {
    fontWeight: "bold",
    color: "gray",
  },
});
