import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#fff', 
    card: '#fff', 
  },
  
};


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : customDarkTheme }>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="(tabs)/+not-found" options={{ headerShown: false}} />
        <Stack.Screen name="(tabs)/index" options={{ headerShown: false}} /> 
        <Stack.Screen name="(tabs)/cadastro" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)/cartScreen" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)/productsScreen" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)/orders" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)/footer" options={{ headerShown: false}}/>
        <Stack.Screen name="(tabs)/userProfile" options={{ headerShown: false}}/>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
