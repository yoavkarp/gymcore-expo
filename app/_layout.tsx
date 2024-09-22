import { ApolloWrapper } from "@/components/ApolloWrapper";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useMemo } from "react";
import { SafeAreaView, Text } from "react-native";
import { AuthProvider } from "@/auth";
import { useFonts } from 'expo-font';
import ThemeProvider from "@/contexts/ThemeContext";
import SnackBarProvider from "@/contexts/SnackbarContext";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "sign-in",
};

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
    <AuthProvider>
      <ApolloWrapper>
        <ThemeProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <SnackBarProvider>
              <Slot />
            </SnackBarProvider>
          </SafeAreaView>
        </ThemeProvider>
      </ApolloWrapper >
    </AuthProvider>
  );
}