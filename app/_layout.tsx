import '@/initialize';
import { AppSyncProvider } from "@/features/appsync";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useMemo } from "react";
import { I18nManager, Platform } from "react-native";
import { AuthProvider } from "@/features/auth";
import { loadAsync, useFonts } from 'expo-font';
import ThemeProvider from "@/contexts/ThemeContext";
import SnackBarProvider from "@/contexts/SnackbarContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import config from "@/constants/aws-config";
import Localization from 'expo-localization'
import * as Updates from 'expo-updates';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const shouldBeRTL = true;

  if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== 'web') {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
    Updates.reloadAsync();
  }

  const [loaded, error] = useFonts({
    'regular': require('@/assets/fonts/fredoka/Fredoka-Regular.ttf'),
    'medium': require('@/assets/fonts/fredoka/Fredoka-Medium.ttf'),
    'bold': require('@/assets/fonts/fredoka/Fredoka-Bold.ttf'),
    'light': require('@/assets/fonts/fredoka/Fredoka-Light.ttf'),
    'semibold': require('@/assets/fonts/fredoka/Fredoka-SemiBold.ttf'),
    Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
  });

  const appIsReady = useMemo(() => loaded || Boolean(error), [loaded])

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
    <AuthProvider config={{
      UserPoolId: config.Auth?.Cognito.userPoolId!,
      ClientId: config.Auth?.Cognito.userPoolClientId!,
    }}>
      <AppSyncProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1, direction: 'rtl' }}>
            <SnackBarProvider>
              <Slot />
            </SnackBarProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </AppSyncProvider >
    </AuthProvider>
  );
}