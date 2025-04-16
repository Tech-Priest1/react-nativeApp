import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style';
import Footer from '../../../components/footer';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

interface Message {
  from: string;
  text: string;
}

export default function UserChatScreen({ userId }: { userId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [myUserId, setMyUserId] = useState('');

  useEffect(() => {
    const loadMyId = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) setMyUserId(id);
    };
    loadMyId();
  }, []);

  useEffect(() => {
    const fetchMessagesFromServer = async () => {
      if (!myUserId || !userId) return;

      try {
        const res = await axios.get(`${API_BASE_URL}/messages`, {
          params: {
            userId1: myUserId,
            userId2: userId,
          },
        });

        const formattedMessages = res.data.messages.map((msg: { senderId: string; text: string }) => ({
          from: msg.senderId === myUserId ? 'me' : 'other',
          text: msg.text,
        }));

        setMessages(formattedMessages);
      } catch (err) {
        console.error('Erro ao buscar mensagens:', err);
      }
    };

    fetchMessagesFromServer();

    // atauliza para buscar as mensagens a cada 5 segundos
    const intervalId = setInterval(fetchMessagesFromServer, 5000);

    return () => {
      clearInterval(intervalId); // intervalo para limpeza quando o componente desmontar
    };
  }, [myUserId, userId]);  // so executa quando o userId ou myUserId mudar

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { from: 'me', text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    try {
      await axios.post(`${API_BASE_URL}/messages`, {
        senderId: myUserId,
        receiverId: userId,
        text: input,
      });
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: 'system', text: 'Falha ao enviar mensagem.' },
      ]);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.containerChat, { paddingBottom: 70 }]}>
        <ScrollView ref={scrollViewRef} style={styles.chatArea} contentContainerStyle={{ paddingBottom: 20 }}>
          {messages.map((msg, idx) => (
            <View key={idx} style={msg.from === 'me' ? styles.userBubble : styles.botBubble}>
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
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </KeyboardAvoidingView>
  );
}
