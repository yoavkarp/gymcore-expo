import { Slot, Stack } from "expo-router";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { Href, Redirect } from "expo-router";
import { useSession } from "@/auth";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import '@/initialize';
import { CognitoSessionDecodedPayload } from "@/auth/decoded-payload";
import React from "react";
import '@/theme'
import { useTheme } from "@/contexts/ThemeContext";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { View } from "@/components/ui/View";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "home/index",
};

export default function Layout() {

  const { isLoading, session, signOut } = useSession();
  const { theme } = useTheme();

  if (isLoading) {
    return <LoadingIndicator style={{ alignSelf: 'center' }} />
  }

  if (!session) {
    return <Redirect href="/sign-in" />
  }

  const sessionPayload: CognitoSessionDecodedPayload = session.getIdToken().decodePayload() as any;

  if (!sessionPayload["cognito:groups"].includes("club")) {
    return <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text h1>Unauthorized</Text>
      <Button onPress={() => signOut()}>Relog</Button>
    </SafeAreaView>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flexBasis: 250 }}>
          <Sidebar />
        </View>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }}>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="(member)/[id]" />
          </Stack>
        </View>
      </View>
    </SafeAreaView>
  );
}