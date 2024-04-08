import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    const { name, background } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    //Customize speech bubble
    const renderBubble = (props) => {
      return <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#8fce00"
          },
          left: {
            backgroundColor: "#FFF"
          }
        }}
      />
    }

		// Display the user's name
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    // Display two preloaded static message at the beginning  
    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ]);
    }, []);

    return (
        <View style={[styles.container, {backgroundColor: background}]}>          
            <GiftedChat
              messages={messages}
              renderBubble={renderBubble}
              onSend={messages => onSend(messages)}
              user={{
                _id: 1
              }}
            />
             { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
 container: {
   flex: 1, 
 }
});

export default Chat;