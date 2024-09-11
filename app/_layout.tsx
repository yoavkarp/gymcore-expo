import { ApolloWrapper } from "@/components/GraphQLProvider";
import { theme } from "@/paper.theme";
import { Slot, SplashScreen, Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { Amplify } from "aws-amplify";
import config from "@/constants/aws-config";
import { useEffect, useMemo } from "react";
import { SafeAreaView, View } from "react-native";
import { AuthProvider } from "@/auth";
import { Text } from "react-native-paper";
import { ClubProvider } from "@/club/provider";

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
          <ClubProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Slot />
            </SafeAreaView>
          </ClubProvider>
        </AuthProvider>
      </PaperProvider>
    </ApolloWrapper >
  );
}