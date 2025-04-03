import { useState, useEffect, useCallback } from 'react';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { usePathname } from 'expo-router';
import Footer from '@/components/footer';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';



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
  const pathname = usePathname() || "/";
  const [appIsReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
    }
  }, [loaded]);
  useEffect(() => {
    if (loaded) {
      onLayoutRootView();
    }
  }, [loaded]);

  
  if (!appIsReady) {
    return null;
  }
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : customDarkTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="cadastro" options={{ headerShown: false }} />
      </Stack>
      {!['/index', '/cadastro'].includes(pathname) && <Footer />}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
  
}
