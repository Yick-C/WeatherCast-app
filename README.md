# WeatherCast App 🌤️
This is a simple weather application built using React Native and Expo.

## Features

- Displays your current weather information including temperature, wind and weather conditions
- See a 5-day weather forecast with 3 hour intervals
- Search for the weather by city
- Add and save cities to your favourites

<p align="center">
  <img src="https://github.com/Yick-C/WeatherCast-app/blob/master/assets/images/demo/ios_demo.png" width="250" height="500">
  <img src="https://github.com/Yick-C/WeatherCast-app/blob/master/assets/images/demo/ios_demo2.png" width="250" height="500">
</p>

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/Yick-C/WeatherCast-app
cd WeatherCast-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Get an API key from https://openweathermap.org/**
  - The app uses OpenWeatherMap API to get weather data so you will need to sign up for an account (you can use the free tier)
  - Once you log in, click your account username on the top right which will open up a menu and you can find 'My API keys'

4. **Copy and Paste the API key**
  - Copy the API key and go to your app repository
  - Find the **'constants'** folder and open the **'global.js'** file
  - Paste the key in where it says **'[ENTER API KEY HERE]'** (remove the brackets)

4. **Start the Expo development server**
```bash
npx expo start
```

5. **Run on your device**
  - Download the Expo Go app from the App Store (iOS) or Google Play Store (Android)
  - Scan the QR code shown in the terminal 
