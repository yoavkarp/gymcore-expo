import { ApolloWrapper } from "@/components/ApolloWrapper";
import { theme } from "@/paper.theme";
import { Slot, SplashScreen } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { useEffect, useMemo } from "react";
import { SafeAreaView, View } from "react-native";
import { AuthProvider } from "@/auth";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const appIsReady = useMemo(() => true, [])

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
      <PaperProvider theme={theme}>
        <AuthProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Slot />
          </SafeAreaView>
        </AuthProvider>
      </PaperProvider>
    </ApolloWrapper >
  );
}