import { Stack } from "expo-router";
import { View } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { Href, Redirect } from "expo-router";
import { Text } from "react-native-paper";

export default function Layout() {

  const { ready: authIsReady, userSession } = useAuth()

  if (!authIsReady) {
    return <Text>Loading...</Text>
  }

  if (!userSession) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href={"/sign-in" as Href} />;
  }


  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}