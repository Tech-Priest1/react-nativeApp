import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { styles } from './style';
import Footer from './footer';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {
const navigation = useNavigation();
  
const handleLogout = () => {
    router.replace('/');
  };

  return (
    <View style={[styles.container, { flex: 1, backgroundColor: 'white' }]}>
      {/* Default SVG Avatar */}
      <Image source={require('../../assets/images/user.svg')} style={styles.avatar} />
      
      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.info}>Usuário Teste</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>usuario@email.com</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Senha:</Text>
        <Text style={styles.info}>********</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
      <Footer navigation={navigation} />
    </View>
  );
};


export default UserProfileScreen;
