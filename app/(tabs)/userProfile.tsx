import { SafeAreaView, Text, View, TouchableOpacity, Image, Alert, Modal, TextInput } from 'react-native';
import { styles } from './style';
import Footer from '../../components/footer';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { userService } from '@/services/api';
import { getToken, deleteToken } from '@/app/utils/secureStore';

const UserProfileScreen = () => {
  const [user, setUser] = useState({
    nome: 'Carregando...',
    email: 'Carregando...'
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken();
        if (!token) {
          router.replace('/');
          return;
        }

        const userData = await userService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await deleteToken();
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Erro', 'Falha ao fazer logout');
    }
  };

  const handleEdit = (field: string, value: string) => {
    setEditField(field);
    setEditValue(value);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      await userService.updateUser({ [editField.toLowerCase()]: editValue });
      setUser((prev) => ({ ...prev, [editField.toLowerCase()]: editValue }));
      setIsEditing(false);
    } catch (error) {
      console.error('Edit error:', error);
      Alert.alert('Erro', `Falha ao editar ${editField}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: '10%' }}>
        <Image source={require('../../assets/images/user.png')} style={styles.avatar} />

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nome:</Text>
          <View style={styles.row}>
            <Text style={styles.info}>{user.nome}</Text>
            <TouchableOpacity onPress={() => handleEdit('Nome', user.nome)} disabled={loading}>
              <MaterialIcons name="edit" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.row}>
            <Text style={styles.info}>{user.email}</Text>
            <TouchableOpacity onPress={() => handleEdit('Email', user.email)} disabled={loading}>
              <MaterialIcons name="edit" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} disabled={loading}>
          <Text style={styles.logoutText}>{loading ? 'Processando...' : 'Sair'}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isEditing} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar {editField}</Text>
            <TextInput style={styles.inputArea} value={editValue} onChangeText={setEditValue} />
            <View>
              <TouchableOpacity onPress={handleSaveEdit} style={styles.finalizeButton}>
                <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.closeButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Footer />
    </SafeAreaView>
  );
};

export default UserProfileScreen;
