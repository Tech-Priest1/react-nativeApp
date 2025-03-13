import { ScrollView, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [confirmPasswordField, setConfirmPasswordField] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Email Validation Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password Validation Regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  const validateFields = () => {
    let valid = true;

    // Email Validation
    if (!emailField.trim()) {
      setEmailError('O campo de email não pode estar vazio.');
      valid = false;
    } else if (!emailRegex.test(emailField)) {
      setEmailError('Por favor, insira um email válido.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password Validation
    if (!passwordField.trim()) {
      setPasswordError('O campo de senha não pode estar vazio.');
      valid = false;
    } else if (!passwordRegex.test(passwordField)) {
      setPasswordError('A senha precisa ter pelo menos:\n- Uma letra minúscula\n- Uma letra maiúscula\n- Um número\n- Pelo menos 6 caracteres');
      valid = false;
    } else {
      setPasswordError('');
    }

    // Confirm Password Validation
    if (!confirmPasswordField.trim()) {
      setConfirmPasswordError('Confirme sua senha.');
      valid = false;
    } else if (confirmPasswordField !== passwordField) {
      setConfirmPasswordError('As senhas não coincidem.');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    return valid;
  };

  const handleSignUpButton = () => {
    if (validateFields()) {
      // Navigate to the next page if validation is successful
      router.replace('/');
    }
  };
  const handleAccoutExist = () => {
    router.replace('/'); 
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={require('../../assets/login.gif')} style={styles.logo} />
        <Text style={styles.h1}>Criar conta</Text>
        <Text style={styles.h2}>Preencha os dados abaixo para criar uma conta.</Text>

        {/* Email Input */}
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={[styles.inputField, emailError ? styles.inputError : null]}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            value={emailField}
            onChangeText={setEmailField}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        {/* Password Input */}
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Senha:</Text>
          <TextInput
            style={[styles.inputField, passwordError ? styles.inputError : null]}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={passwordField}
            onChangeText={setPasswordField}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputAreaSignUp}>
          <Text style={styles.inputLabel}>Confirme sua senha:</Text>
          <TextInput
            style={[styles.inputField, confirmPasswordError ? styles.inputError : null]}
            placeholder="Confirme sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPasswordField}
            onChangeText={setConfirmPasswordField}
          />
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
        </View>

        <TouchableOpacity onPress={handleSignUpButton} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signUpArea}>
          <Text style={styles.signUpText}>Já tem conta?</Text>
          <TouchableOpacity onPress={handleAccoutExist}>
            <Text style={styles.signUpBtnText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerArea}>
          <Text style={styles.footerText}></Text>
        </View>
      </View>
    </ScrollView>
  );
}
