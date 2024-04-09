import { useEffect } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";
import { StyleSheet, LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

// import Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

const App = () => {
  // Web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBsAw9R7JE1dCIN6v2Gosw8MFIN7Vffzl8",
    authDomain: "chat-app-f13c4.firebaseapp.com",
    projectId: "chat-app-f13c4",
    storageBucket: "chat-app-f13c4.appspot.com",
    messagingSenderId: "788398632447",
    appId: "1:788398632447:web:013bf17bc15e210afc4bca"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app)

  //Connection status
  const connectionStatus = useNetInfo();

  // Network connectivity status
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);


  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Start"
    >
      <Stack.Screen
        name="Start"
        component={Start}
      />
      <Stack.Screen
        name="Chat"
        >
        {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
    </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;