import React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const MessageInput = ({ prompt, setPrompt, handleSubmit }) => (
  <>
    <TextInput
      multiline={true}
      value={prompt}
      onChangeText={(text) => setPrompt(text)}
      placeholder="Ask Ziqi's Chatbot..."
      style={styles.textarea}
    />
    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
      <Text style={styles.submitButtonText}>Submit</Text>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  textarea: {
    height: 50,
    backgroundColor: '#ffbb33',
    paddingHorizontal: 10,
    fontSize: 16,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    textAlignVertical: 'center',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#009999',
    padding: 10,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MessageInput;
