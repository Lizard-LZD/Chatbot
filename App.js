import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import Header from './Header';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const IP_ADDRESS = '192.168.19.199';

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
      console.log(data);
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

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Header title='Ziqis Chatbot' />
      <MessageList messages={messages} />
      <MessageInput
        prompt={prompt}
        setPrompt={setPrompt}
        handleSubmit={handleSubmit}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc66',
  },
});



export default Chat;