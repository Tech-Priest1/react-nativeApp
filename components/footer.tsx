import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Footer = () => {
  const router = useRouter(); // Use the router inside the component

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/productsScreen')}
      >
        <Image source={require('../assets/images/home.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/orders')}
      >
        <Image source={require('../assets/images/box.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Pedidos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => router.push('/userProfile')}
      >
        <Image source={require('../assets/images/profile.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4162B7',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  footerButton: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Footer;
