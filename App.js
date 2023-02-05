import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import bot from './assets/bot.jpg';
import user from './assets/user.jpg';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';


const IP_ADDRESS = '192.168.221.199';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 'greeting',
      isAi: true,
      value: 'Ask me eveything!',
    }
  ]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  // const scrollViewRef = useRef(null);

  const handleSubmit = async () => {

    if (!prompt) return;

    setTimeout(() => {
      setPrompt('')
    }, 0);

    setLoading(true);

    const newChatId = Math.random().toString();

    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: newChatId,
        isAi: false,
        value: prompt,
      },
      {
        id: `res${newChatId}`,
        isAi: true,
        value: '...',
      },
    ]);

    try {
      const response = await fetch(`http://${IP_ADDRESS}:5001`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await response.json();
      const parsedData = data.bot.trim();

      setMessages(prevMessages => {
        const newArray = [...prevMessages];
        const lastIndex = newArray.length - 1;
        newArray[lastIndex].value = parsedData;
        return newArray;
      });

    } catch (error) {
      console.error(error);

      setMessages(prevMessages => {
        const newArray = [...prevMessages];
        const lastIndex = newArray.length - 1;
        newArray[lastIndex].value = 'Something went wrong';
        return newArray;
      });

    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(messages);
  //   scrollViewRef.current.scrollToEnd({ animated: true });
  // }, [messages]);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Header title='Ziqis Chatbot' />
      <MessageList messages={messages} />
      <MessageInput
        prompt={prompt}
        setPrompt={setPrompt}
        handleSubmit={handleSubmit}
      />
      {/* <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}>
        {messages.map(({ id, isAi, value }) => (
          <View key={id} style={styles.messageWrapper}>
            <Image
              style={styles.profile}
              source={isAi ? bot : user}
              alt={isAi ? 'bot' : 'user'}
            />
            <Text style={styles.message}>{value}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        multiline={true}
        value={prompt}
        onChangeText={(text) => setPrompt(text)}
        placeholder="Ask Ziqi's Chatbot..."
        style={styles.textarea}
      // onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity> */}

    </KeyboardAvoidingView>
  );
};

// const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc66',
  },
  // chatContainer: {
  //   flex: 1,
  //   padding: 10,
  // },
  // messageWrapper: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginVertical: 5,
  // },
  // profile: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 15,
  //   marginRight: 10,
  // },
  // message: {
  //   padding: 10,
  //   fontSize: 16,
  //   backgroundColor: '#ffffff',
  //   borderRadius: 20,
  //   elevation: 2,
  //   shadowColor: '#000000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 2,
  //   maxWidth: screenWidth * 0.8,
  // },
  // textarea: {
  //   height: 50,
  //   backgroundColor: '#ffbb33',
  //   paddingHorizontal: 10,
  //   fontSize: 16,
  //   borderTopWidth: 1,
  //   borderTopColor: '#dddddd',
  //   textAlignVertical: 'center',
  //   borderRadius: 10,
  //   marginHorizontal: 10,
  //   marginBottom: 10,
  // },
  // submitButton: {
  //   backgroundColor: '#ffbb33',
  //   padding: 10,
  //   borderRadius: 10,
  //   marginHorizontal: 10,
  //   marginBottom: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // submitButtonText: {
  //   color: '#ffffff',
  //   fontWeight: 'bold',
  // },
});



export default Chat;