import { Stack } from "expo-router";
import { Dimensions, StyleSheet, View } from "react-native";
import { Href, Redirect } from "expo-router";
import { Text } from "react-native-paper";
import { useSession } from "@/auth";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Layout() {

  const { isLoading, session } = useSession()

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href={"/sign-in" as Href} />;
  }


  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Sidebar />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </View>
    </View>
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