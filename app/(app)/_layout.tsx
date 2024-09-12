import { Stack } from "expo-router";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { Href, Redirect } from "expo-router";
import { Button, Headline, Text, useTheme } from "react-native-paper";
import { useSession } from "@/auth";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import '@/initialize';
import { CognitoSessionDecodedPayload } from "@/auth/decoded-payload";

export default function Layout() {

  const { isLoading, session, signOut } = useSession();
  const theme = useTheme();

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!session) {
    return <Redirect href={"/sign-in" as Href} />;
  }

  const sessionPayload: CognitoSessionDecodedPayload = session.getIdToken().decodePayload() as any;

  if (!sessionPayload["cognito:groups"].includes("club")) {
    return <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Headline>Unauthorized</Headline>
      <Button mode="contained-tonal" onPress={() => signOut()}>Relog</Button>
    </SafeAreaView>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <View style={{ flexBasis: 250 }}>
          <Sidebar />
        </View>
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { flex: 1, backgroundColor: theme.colors.background } }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="my-profile" />
          </Stack>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('screen').height,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  }
})