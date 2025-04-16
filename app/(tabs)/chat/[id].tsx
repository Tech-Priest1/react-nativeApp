// /app/(tabs)/chat/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import UserChatScreen from '../chat/index';

export default function ChatPage() {
  const { id } = useLocalSearchParams();

  if (id === 'chatBot') {
    return <UserChatScreen userId="chatBot" />; // Or <ChatbotScreen /> if you want a separate UI
  }

  return <UserChatScreen userId={id as string} />;
}
