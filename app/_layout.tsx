import { AppSyncProvider } from "@/features/appsync";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useMemo } from "react";
import { I18nManager, SafeAreaView, Text, Platform } from "react-native";
import * as Updates from 'expo-updates';
import { AuthProvider } from "@/features/auth";
import { useFonts } from 'expo-font';
import ThemeProvider from "@/contexts/ThemeContext";
import SnackBarProvider from "@/contexts/SnackbarContext";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

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

  const shouldBeRTL = true;

  if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== 'web') {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
    Updates.reloadAsync();
  }

  useEffect(() => {
    async function onChange() {
      if (loaded) {
        await SplashScreen.hideAsync()
      }
    }
    onChange();
  }, [loaded])

  if (!loaded) return null;

  return (
    <AuthProvider>
      <AppSyncProvider>
        <ThemeProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <SnackBarProvider>
              <Slot />
            </SnackBarProvider>
          </SafeAreaView>
        </ThemeProvider>
      </AppSyncProvider >
    </AuthProvider>
  );
}