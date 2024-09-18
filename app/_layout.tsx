import { ApolloWrapper } from "@/components/ApolloWrapper";
import { theme } from "@/paper.theme";
import { Slot, SplashScreen } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { useEffect, useMemo } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { AuthProvider } from "@/auth";
import { useFonts } from 'expo-font';
import ThemeProvider from "@/contexts/ThemeContext";
import SnackBarProvider from "@/contexts/SnackbarContext";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'regular': require('@/assets/fonts/fredoka/Fredoka-Regular.ttf'),
    'medium': require('@/assets/fonts/fredoka/Fredoka-Medium.ttf'),
    'bold': require('@/assets/fonts/fredoka/Fredoka-Bold.ttf'),
    'light': require('@/assets/fonts/fredoka/Fredoka-Light.ttf'),
    'semibold': require('@/assets/fonts/fredoka/Fredoka-SemiBold.ttf'),
  });

  const appIsReady = useMemo(() => loaded || Boolean(error), [loaded])


  useEffect(() => {
    async function onChange() {
      if (appIsReady) {
        await SplashScreen.hideAsync()
      }
    }
    onChange();
  }, [appIsReady])

  if (!appIsReady) return null;

  return (
    <ApolloWrapper>
      <ThemeProvider>
        <AuthProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <SnackBarProvider>
              <Slot />
            </SnackBarProvider>
          </SafeAreaView>
        </AuthProvider>
      </ThemeProvider>
    </ApolloWrapper >
  );
}