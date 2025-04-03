import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Saves the token securely on the device.
 * Uses AsyncStorage for Web and SecureStore for Mobile (Android/iOS).
 */
export const saveToken = async (token: string) => {
    try {
        if (Platform.OS === 'web') {
            await AsyncStorage.setItem('userToken', token);
        } else {
            await SecureStore.setItemAsync('userToken', token);
        }
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

/**
 * Retrieves the stored token securely.
 * Uses AsyncStorage for Web and SecureStore for Mobile (Android/iOS).
 */
export const getToken = async () => {
    try {
        if (Platform.OS === 'web') {
            return await AsyncStorage.getItem('userToken');
        } else {
            return await SecureStore.getItemAsync('userToken');
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

/**
 * Deletes the stored token securely.
 */
export const deleteToken = async () => {
    try {
        if (Platform.OS === 'web') {
            await AsyncStorage.removeItem('userToken');
        } else {
            await SecureStore.deleteItemAsync('userToken');
        }
    } catch (error) {
        console.error('Error deleting token:', error);
    }
};
