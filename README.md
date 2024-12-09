

# Welcome to NeatNest

![NeatNest Logo](./assets/images/TransNoText.png)


**NeatNest** is a powerful React Native app built using [Expo](https://expo.dev) and [Expo Router](https://docs.expo.dev/router/introduction). This app allows users to easily book area-specific cleaning services, making it simple to keep your home clean and organized. We all have those areas of our home that we dread cleaning—whether it’s tackling the dishes, making the bed, or scrubbing the bathroom. With NeatNest, you can request a quote in just a few clicks from one of our professional service providers, ready to take care of those tasks for you!

This project was created for the Tech Residency at Coding Temple.

## Features

- **Area-specific cleaning**: Users can select specific areas of their home (e.g., kitchen, bathroom, living room) for cleaning. From there, they can input the specific tasks they need done in that room to submit for a quote.

- **Seamless navigation**: Utilizing [Expo Router](https://docs.expo.dev/router/introduction) and its amazing [Tabs]() feature, we are able to create smooth navigation across screens and responsive user interaction.
- **Cross-platform support**: The app is currently built to work on Android and the web. IOS features will be coming soon!

## Getting Started

### 1. Install Dependencies

First, clone the repository and install the project dependencies:

```bash
git clone <repository-url>
cd frontend
npm install
```

### 2. Start the App

Once the dependencies are installed, start the app with Expo:

```bash
npx expo start
```

You will see options to open the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go): A limited sandbox for trying out app development with Expo. Please note, that we are utilizing Auth0 features for user Authentication and they are not compatible with Expo Go at this time


## Core Technologies & Libraries Used

This project uses several different programs and libraries to provide a seamless and efficient user experience. Below are just a few of the key features:

- **[React Native](https://reactnative.dev/)**: The foundation of our app, enabling cross-platform mobile development for both Android and iOS.
- **[Expo](https://expo.dev/)**: A framework and platform for building universal React applications, making development and testing a breeze.
- **[Expo Router](https://docs.expo.dev/router/introduction)**: Provides a file-based routing system to streamline navigation across screens..
- **[Auth0](https://auth0.com/)**: Used for secure user authentication and managing login sessions.
- **[react-native-calendars](https://github.com/wix/react-native-calendars)**: A customizable calendar component for displaying cleans either booked or requested.
- **[@react-native-community/checkbox](https://github.com/react-native-community/checkbox)**: Provides checkbox components.
- **[@react-native-community/datetimepicker](https://github.com/react-native-community/datetimepicker)**: Easy date and time selection for scheduling cleans.
- **[FlatIcon](https://www.flaticon.com/)**: Offers a wide range of animated icons to enhance the overall visual appeal 

## Learn More

To learn more about developing with Expo, check out the following resources:

- [Expo Documentation](https://docs.expo.dev/)
- [Learn Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)

## Font Used

The font used in this project is **Playfair Display**, designed by Claus Eggers Sorensen. You can find it here: [Playfair on Google Fonts](https://fonts.google.com/specimen/Playfair).

## Join the Community

Join the vibrant Expo community to learn and share your experience:

- [Expo on GitHub](https://github.com/expo/expo)
- [Discord Community](https://chat.expo.dev)


