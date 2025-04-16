import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Footer from '../../components/footer';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function ChatList() {
  const [conversations, setConversations] = useState<{ id: string; nome: string; avatar?: any }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (!API_BASE_URL) {
          throw new Error('API_BASE_URL is not defined');
        }
        const response = await fetch(`${API_BASE_URL}/users`);
        const data = await response.json();
        setConversations(data.map((user: { _id: any; nome: any; }) => ({
          id: user._id,
          nome: user.nome,
          avatar: require('../../assets/images/user.png'),
        })));
      } catch (error) {
        setError('Failed to load conversations');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  const conversationsWithChatbot = [
    { id: 'chatBot', nome: 'MobiBot', avatar: require('../../assets/images/mobiexpressLogo.png') },
    ...conversations
  ];

  return (
    <View style={{ flex: 1, paddingTop: 15 }}>
      <FlatList
        data={conversationsWithChatbot}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: item.id === 'chatBot' ? "/chat/[id]" : "/(tabs)/chat/[id]",
              params: { id: item.id },
            }}
            asChild
          >
            <Pressable style={styles.linkContainer}>
              {item.avatar && <Image source={item.avatar} style={styles.avatar} />}
              <Text style={styles.text}>{item.nome}</Text>
            </Pressable>
          </Link>
        )}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkContainer: {
    padding: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
