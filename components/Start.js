import { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    ImageBackground, 
    KeyboardAvoidingView, 
    Platform,
    Alert
} from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {  
    const auth = getAuth();
    const [name, setName] = useState('');
    const [background, setBackground] = useState('');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const image = require('../img/Background_Image.png')

    const signInUser = () => {
        signInAnonymously(auth)
          .then(result => {
            navigation.navigate("Chat", { name: name, background: background, id: result.user.uid });
            Alert.alert("Signed in Successfully!");
          })
          .catch((error) => {
            Alert.alert("Unable to sign in, try later again.");
          })
    }


    return (
     <View style={styles.container}>
        <ImageBackground source={image} style={styles.bgImage} resizeMode="cover">
            <Text style={styles.appTitle}>Chat App</Text>
            <View style={styles.box}>
                {/* Request for inputting the user name \*/}
                <TextInput
                    accessibilityLabel="Username input"
                    accessibilityRole="text"
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Type your username here'
                />
                <Text style={styles.chooseBackgroundColor}>Choose Background Color</Text>
                {/* Allow to choose the background color of chat \*/}
                <View style={styles.colorButtonsBox}>
                    {colors.map((color, index) => (
                        <TouchableOpacity
                            accessibilityLabel="Color Button"
                            accessibilityHint="Lets you choose a backgroundcolor for your chat."
                            accessibilityRole="button"
                            key={index}
                            style={[styles.colorButton, { backgroundColor: color}, background === color && styles.selected]}
                            onPress={() => setBackground(color)}
                        />
                    ))}
                </View>
                {/* Buttton to navigate to the chat screen\*/}
                <TouchableOpacity 
                    accessibilityLabel="Start Chatting"
                    accessibilityRole="button"
                    style={styles.button} 
                    onPress={signInUser}>
                    <Text style={styles.buttonText}>Start Chatting</Text>
                </TouchableOpacity>
                </View>
                {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
        </ImageBackground>       
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    appTitle: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
        margin: 20
    },
    box: {
        backgroundColor: '#ffffff',
        padding: 30,
        width: '88%',
        height: '44%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        width: '88%',
        opacity: 50,
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        borderColor: '#757083'
    },
    chooseBackgroundColor: {
        flex: 1,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
    },
    colorButtonsBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5
    },
    selected: {
        borderColor: 'black',
        borderWidth: 1
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#757083',
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff'
    }
});

export default Start;