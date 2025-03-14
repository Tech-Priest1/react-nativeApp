import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { styles } from './style';
import Footer from '../../components/footer';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons

const UserProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    router.replace('/');
  };

  const handleEdit = (field: string) => {
    console.log(`Editing ${field}`);
    // Navigate to an edit screen or open a modal
  };

  return (
    <SafeAreaView style={[styles.container, { flex: 1, backgroundColor: 'white', paddingHorizontal: 20 ,paddingTop: '10%'}]}>
      {/* Default SVG Avatar */}
      <Image source={require('../../assets/images/user.svg')} style={styles.avatar} />

      {/* User Info with Edit Buttons */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome:</Text>
        <View style={styles.row}>
          <Text style={styles.info}>Usuário Teste</Text>
          <TouchableOpacity onPress={() => handleEdit('Nome')}>
            <MaterialIcons name="edit" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <View style={styles.row}>
          <Text style={styles.info}>usuario@email.com</Text>
          <TouchableOpacity onPress={() => handleEdit('Email')}>
            <MaterialIcons name="edit" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Senha:</Text>
        <View style={styles.row}>
          <Text style={styles.info}>********</Text>
          <TouchableOpacity onPress={() => handleEdit('Senha')}>
            <MaterialIcons name="edit" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

export default UserProfileScreen;
