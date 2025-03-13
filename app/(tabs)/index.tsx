import { ScrollView, Text, View, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleLoginButton = () => {
    router.replace('/productsScreen');
  };

  const handleForgetButton = () => {
    setModalVisible(true);
  };

  const handleSendRecoveryEmail = () => {
    console.log('Enviando email de recuperação para:', recoveryEmail);
    setModalVisible(false);
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
            value={emailField}
            onChangeText={(t) => setEmailField(t)}
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
            value={passwordField}
            onChangeText={(t) => setPasswordField(t)}
          />
        </View>

        <View style={styles.aditionals}>
          <TouchableOpacity onPress={handleForgetButton} style={styles.forgotBtnArea}>
            <Text style={styles.forgotBtnText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLoginButton} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
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

      {/* Modal de recuperação de senha */}
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
            <TouchableOpacity onPress={handleSendRecoveryEmail} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}
