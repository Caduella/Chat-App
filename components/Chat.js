import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
    const { name, background, id } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
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

    // Prevent rendering of InputToolbar when offline
    const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
    }
    

		// Display the user's name
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    // Messages database    
    useEffect(() => {
      let unsubMessages;
      if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed.
       if (unsubMessages) unsubMessages();
       unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentSnapshot) => {
        let newMessages = [];
        documentSnapshot.forEach(doc => {
          newMessages.push({ 
            id: doc.id, 
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        });
        cacheMessagesHistory(newMessages);
        setMessages(newMessages);
      });
      } else loadCachedMessages();
      // Clean up code
      return () => {
        if (unsubMessages) unsubMessages();
      }
    }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("chat_messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const cacheMessagesHistory = async (listsToCache) => {
    try {
      await AsyncStorage.setItem('chat_messages', JSON.stringify(listsToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

    return (
        <View style={[styles.container, {backgroundColor: background}]}>          
            <GiftedChat
              messages={messages}
              renderBubble={renderBubble}
              onSend={messages => onSend(messages)}
              user={{
               //_id: route.params.id,
               _id: id,
               name
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