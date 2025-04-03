import { ScrollView, Text, View, Image, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import {  useRouter } from 'expo-router';
import { authService } from '@/services/api';
import { saveToken } from '../utils/secureStore'; // Importando a função de salvar token


export default function LoginScreen() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
  console.log('handleLogin called');
  if (!email || !password) {
    Alert.alert('Error', 'Por favor, preencha todos os campos');
    return;
  }
  setLoading(true);
  try {
    const response = await authService.login({ 
      email, 
      senha: password 
    });
    console.log('Login success, token:', response.token);
    // Salva o token de forma segura
    await saveToken(response.token);
    router.push('/productsScreen');
  } catch (error) {
    console.log('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Credenciais inválidas';
    Alert.alert('Erro no Login', errorMessage);
  } finally {
    setLoading(false);
  }
};
  
const handleSendRecoveryEmail = async () => {
    if (!recoveryEmail) {
      Alert.alert('Erro', 'Por favor, insira seu email');
      return;
    }
    try {
      // Implement your recovery logic here
      console.log('Enviando email de recuperação para:', recoveryEmail);
      Alert.alert('Sucesso', 'Email de recuperação enviado com sucesso');
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao enviar email de recuperação');
    }
  };
  
  const handleSignUpButton = () => {
    router.replace('/cadastro'); 
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={require('../../assets/login.gif')} style={styles.logo} />
        <Text style={styles.h1}>Faça Login</Text>
        <Text style={styles.h2}>Bem-vindo(a)! Digite seus dados abaixo.</Text>
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Senha:</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.aditionals}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.forgotBtnArea}>
            <Text style={styles.forgotBtnText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          onPress={() => handleLogin()} 
          style={styles.button}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Carregando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>
        <View style={styles.loginArea}>
          <Text style={styles.loginText}>Não tem conta?</Text>
          <TouchableOpacity onPress={handleSignUpButton}>
            <Text style={styles.loginBtnText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerArea}>
          <Text style={styles.footerText}></Text>
        </View>
      </View>
      {/* Recovery Password Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainerIndex}>
          <View style={styles.modalContentIndex}>
            <Text style={styles.modalTitle}>Recuperar Senha</Text>
            <Text style={styles.modalText}>Digite seu e-mail para receber instruções de recuperação.</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Digite seu email"
              placeholderTextColor="#999"
              value={recoveryEmail}
              onChangeText={setRecoveryEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSendRecoveryEmail} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}