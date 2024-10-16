import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import IconButton from "../UI/IconButton";

function SearchBar({ setSearch }) {
  const [showSearchBar, toggleSearchBar] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {showSearchBar ? (
        <>
          <TextInput
            placeholder="Enter a city"
            style={styles.searchContainer}
            returnKeyType="search"
            onSubmitEditing={(value) => {
              setSearch(value.nativeEvent.text);
              setIsFocused(false);
            }}
            onFocus={() => setIsFocused(true)}
          />
        </>
      ) : null}

      <IconButton
        icon="search"
        color="white"
        size={28}
        onPress={() => toggleSearchBar(!showSearchBar)}
      />
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  searchContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: "black",
    width: "180%",
    height: 40,
    color: "black",
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "white",
  },
});
