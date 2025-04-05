import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { styles } from './style';
import { useRouter } from 'expo-router';
import { authService } from '@/services/api';
import * as SecureStore from 'expo-secure-store';
export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  // Regex para validação
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  const validateFields = () => {
    let valid = true;
    const newErrors = {
      nome: '',
      email: '',
      senha: '',
      confirmPassword: ''
    };
    // Name validation
    if (!formData.nome.trim()) {
      newErrors.nome = 'O campo de nome não pode estar vazio.';
      valid = false;
    }
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'O campo de email não pode estar vazio.';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido.';
      valid = false;
    }
    // Password validation
    if (!formData.senha.trim()) {
      newErrors.senha = 'O campo de senha não pode estar vazio.';
      valid = false;
    } else if (!passwordRegex.test(formData.senha)) {
      newErrors.senha = 'A senha precisa ter pelo menos:\n- Uma letra minúscula\n- Uma letra maiúscula\n- Um número\n- Pelo menos 6 caracteres';
      valid = false;
    }
    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirme sua senha.';
      valid = false;
    } else if (formData.confirmPassword !== formData.senha) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const handleRegister = async () => {
    if (!validateFields()) return;
    setLoading(true);
    try {
      const response = await authService.register({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha
      });
      // Save token if your backend returns it on registration
      if (response.token) {
        await SecureStore.setItemAsync('userToken', response.token);
      }
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = (error as { message?: string })?.message || 'Falha ao registrar. Por favor, tente novamente.';
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  const handleLoginRedirect = () => {
    router.replace('/');
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
       <Image source={require('../../assets/login.gif')} style={styles.logo}contentFit="contain" />
        <Text style={styles.h1}>Criar conta</Text>
        <Text style={styles.h2}>Preencha os dados abaixo para criar uma conta.</Text>
        {/* Nome field */}
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Nome:</Text>
          <TextInput
            style={[styles.inputField, errors.nome ? styles.inputError : null]}
            placeholder="Digite seu nome completo"
            placeholderTextColor="#999"
            value={formData.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
          />
          {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}
        </View>
        {/* Email field */}
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={[styles.inputField, errors.email ? styles.inputError : null]}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>
        {/* Password field */}
        <View style={styles.inputArea}>
          <Text style={styles.inputLabel}>Senha:</Text>
          <TextInput
            style={[styles.inputField, errors.senha ? styles.inputError : null]}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={formData.senha}
            onChangeText={(text) => handleInputChange('senha', text)}
          />
          {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}
        </View>
        {/* Confirm Password field */}
        <View style={styles.inputAreaSignUp}>
          <Text style={styles.inputLabel}>Confirme sua senha:</Text>
          <TextInput
            style={[styles.inputField, errors.confirmPassword ? styles.inputError : null]}
            placeholder="Confirme sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
          />
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
        </View>
        <TouchableOpacity 
          onPress={handleRegister} 
          style={styles.button}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Registrando...' : 'Registrar'}
          </Text>
        </TouchableOpacity>
        <View style={styles.signUpArea}>
          <Text style={styles.signUpText}>Já tem conta?</Text>
          <TouchableOpacity onPress={handleLoginRedirect}>
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