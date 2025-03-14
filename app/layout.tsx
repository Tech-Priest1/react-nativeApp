import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { usePathname } from 'expo-router'; 
import Footer from '@/components/footer'; 
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

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

  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : customDarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/cadastro" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/cartScreen" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/productsScreen" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/orders" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/footer" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/userProfile" options={{ headerShown: false }} />
      </Stack>

      {/* Show Footer only if not on index or cadastro */}
      {!['/index', '/cadastro'].includes(pathname) && <Footer />}

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
