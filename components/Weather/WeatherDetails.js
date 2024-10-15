import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function WeatherDetails({weatherData}) {
    return(
        <View style={styles.rootContainer}>
        <View style={styles.detailsContainer}>
                <MaterialCommunityIcons name='weather-windy' size={20} color='white' />
                <Text style={styles.detailsText}>{weatherData.windSpeed}m/s</Text>
            </View>
            <View style={styles.detailsContainer}>
                <MaterialCommunityIcons name='cloud' size={20} color='white' />
                <Text style={styles.detailsText}> {weatherData.cloudiness}%</Text>
            </View>
            <View style={styles.detailsContainer}>
                <MaterialCommunityIcons name='thermometer' size={20} color='white' />
                <Text style={styles.detailsText}>feels like {Math.round(weatherData.feelsLikeTemp)}°</Text>
            </View>
        </View>
    )
}

export default WeatherDetails;

const styles = StyleSheet.create({
    rootContainer: {
        gap: 30,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailsContainer: {
        flexDirection: 'row',
        gap: 4
    },
    detailsText: {
        color: 'white'
    }
})