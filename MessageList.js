import React, { useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import bot from './assets/bot.jpg';
import user from './assets/user.jpg';

const MessageList = ({ messages }) => {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    console.log(messages);
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.chatContainer}
    >
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
  );
};

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({

  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  message: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    maxWidth: screenWidth * 0.8,
  },
});

export default MessageList;