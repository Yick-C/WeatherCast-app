# Weatherly App 👋
This is a simple weather application built using React Native.

## Features

- Displays your current weather information including temperature, wind and weather conditions
- See a 5-day weather forecast with 3 hour intervals
- Search for the weather by city
- Add and save cities to your favourites

![Picture of weather screen of app on Android](https://github.com/Yick-C/weatherly-app/blob/master/assets/images/demo/android_demo.png  =250x400)
![Picture of weather screen of app on IoS](https://github.com/Yick-C/weatherly-app/blob/master/assets/images/demo/ios_demo.png =250x400)
![Picture of forecast screen of app on IoS](https://github.com/Yick-C/weatherly-app/blob/master/assets/images/demo/ios_demo2.png =250x400)

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/Yick-C/weatherly-app.git
cd weatherly-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Get an API key from https://openweathermap.org/api**
- The app uses OpenWeatherMap API to get weather data so you will need to sign up for an account (you can use the free tier)

4. **Copy and paste the API key**
- When you have an account, you will need to copy the API key. Then in the app repository, find the 'constants' folder and open the 'global.js'
- Paste the key in where it says '[ENTER API KEY HERE]' (remove the brackets)

5. **Start the Expo development server**
```bash
npx expo start
```

6. **Run on your device**
- Download the Expo Go app from the App Store (iOS) or Google Play Store (Android)
- Scan the QR code shown in the terminal 
