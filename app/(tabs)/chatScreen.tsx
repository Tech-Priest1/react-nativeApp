import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import Footer from '../../components/footer';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL 


export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Olá! Como posso te ajudar hoje?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Carrega mensagens salvas ao abrir a tela
  useEffect(() => {
    const loadMessages = async () => {
      const saved = await AsyncStorage.getItem('chatMessages');
      if (saved) setMessages(JSON.parse(saved));
    };
    loadMessages();
  }, []);

  // Salva as mensagens toda vez que forem alteradas
  useEffect(() => {
    AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/chat`, { message: input });
      const botMessage = { from: 'bot', text: res.data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Erro ao responder. Tente novamente.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.containerChat, { paddingBottom: 70 }]}>
        <ScrollView style={styles.chatArea}>
          {messages.map((msg, idx) => (
            <View key={idx} style={msg.from === 'user' ? styles.userBubble : styles.botBubble}>
              <Text style={styles.msgText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputAreaChat}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Digite sua mensagem..."
            style={styles.input}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={loading}>
            <Text style={styles.sendButtonText}>{loading ? '...' : 'Enviar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </KeyboardAvoidingView>
  );
}
