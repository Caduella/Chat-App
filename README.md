# Chat App

## Description
This is a chat app for mobile devices using React Native. The app provides users with a chat interface and options to share images and their location.

## Key Features
* A page where users can enter their name and choose a background color for the chat screen before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat provides users with two additional communication features: sending images and location data.
* Data gets stored online and offline.

## Technical Requirements
* The app is written in React Native.
* The app is developed using Expo.
* The app is styled according to the given screen design.
* Chat conversations is stored in Google Firestore Database.
* The app authenticates users anonymously via Google Firebase authentication.
* Chat conversations is stored locally.
* The app lets users pick and send images from the phone’s image library.
* The app lets users take pictures with the device’s camera app, and send them.
* The app stores images in Firebase Cloud Storage.
* The app is able to read the user’s location data.
* Location data is sent via the chat in a map view.
* The chat interface and functionality are created using the Gifted Chat library.
* The app’s codebase contains comments.

## Design Specifications
* Vertical and horizontal spacing: evenly distributed
* App title: font size 45, font weight 600, font color #FFFFFF
* “Your name”: font size 16, font weight 300, font color #757083, 50% opacity
* “Choose background color”: font size 16, font weight 300, font color #757083, 100% opacity
* Color options HEX codes: #090C08; #474056; #8A95A5; #B9C6AE
* Start chatting button: font size 16, font weight 600, font color #FFFFFF, button color #757083

## Dependencies 
* **React Native**: Framework for building mobile applications using JavaScript and React.
* **Expo**: Development platform for building React Native applications.
* **GiftedChat**: A library for creating chat interfaces in React Native applications.
* **Google Firebase**: Cloud-based platform that provides various services, including Firestore for real-time database and authentication.
* **AsyncStorage**: Local storage system in React Native for caching and persisting data.
* **Expo ImagePicker**: Expo API for accessing the device's image picker to choose images from the gallery.
* **Expo MediaLibrary**: Expo API for accessing and managing media assets on the device.
* **Expo Location**: Expo API for obtaining location information from a device.
* **react-native-maps**: React Native Map components for iOS + Android.
* **MapView**: Specific component from the react-native-maps library used to display maps in React Native applications.
