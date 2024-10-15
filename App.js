import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import ForecastScreen from "./screens/ForecastScreen";
import LocationContextProvider from "./context/locationContext";

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <LocationContextProvider>
        <ImageBackground
          source={require("./assets/sky_background.jpg")}
          resizeMode="cover"
          style={styles.background}
        >
          <NavigationContainer>
            <BottomTab.Navigator
              sceneContainerStyle={{ backgroundColor: "transparent" }}
              screenOptions={{
                headerStyle: { backgroundColor: "transparent" },
                headerTintColor: "white",
                tabBarActiveTintColor: "#528ab4",
              }}
            >
              <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" color={color} size={size} />
                  ),
                }}
              />
              <BottomTab.Screen
                name="Forecast"
                component={ForecastScreen}
                options={{
                  headerTransparent: true,
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="partly-sunny" color={color} size={size} />
                  ),
                }}
              />
            </BottomTab.Navigator>
          </NavigationContainer>
        </ImageBackground>
      </LocationContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
  },
});
