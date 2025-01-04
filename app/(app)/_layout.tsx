import { Stack, Href, Redirect } from "expo-router";
import { SafeAreaView } from "react-native";
import { useSession } from "@/features/auth";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import { CognitoSessionDecodedPayload } from "@/features/auth/types";
import React, { useMemo } from "react";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import { View } from "@/components/ui/View";
import { theme } from "@/theme";
import '@/initialize';
import { ClubProvider, useClub } from "@/features/club";
import CreateTrainerModal from "@/components/CreateTrainerModal";
import Modal from "@/components/ui/Modal";
import TrainerList from "@/components/TrainerList";
import { Gender } from "@/graphql";

function ClubLayout() {

  const { setIsCreateTrainerModalVisible, isLoading, createTrainerError, clubTrainersData, createTrainer, isCreateTrainerModalVisible, isTrainersListVisible } = useClub();
  return (
    <>

      <Modal visible={isTrainersListVisible}>
        <TrainerList />
        <CreateTrainerModal
          onDismiss={() => {
            console.log("hi")

            setIsCreateTrainerModalVisible(false)
          }}
          visible={!isLoading && (isCreateTrainerModalVisible || (clubTrainersData?.getClubTrainers || []).length === 0)}
          onSubmit={(input) => createTrainer({ ...input, gender: input.gender as Gender, phone_number: `+972${input.phone_number}` })}
          error={createTrainerError} />
      </Modal>
    </>
  )

}

export default function Layout() {

  const { isLoading, session, signOut } = useSession();

  const sessionPayload: CognitoSessionDecodedPayload = useMemo(() => session?.getIdToken().decodePayload() as any, [session]);

  if (isLoading) {
    return <LoadingIndicator style={{ alignSelf: 'center' }} />
  }

  if (!session) {
    return <Redirect href={"/sign-in" as Href} />
  }

  if (!sessionPayload["cognito:groups"].includes("club")) {
    return <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text h1>Unauthorized</Text>
      <Button onPress={() => signOut()}>Relog</Button>
    </SafeAreaView>
  }

  return (
    <ClubProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, flexDirection: 'row' }}>
        <Sidebar />
        <View style={{ flex: 1 }}>
          <Header />

          <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
            <Stack screenOptions={{ headerShown: false, navigationBarHidden: true, animation: "fade_from_bottom", contentStyle: { backgroundColor: theme.colors.background }, statusBarHidden: true }}>
              <Stack.Screen name="workout/[workoutId]" options={{ freezeOnBlur: true }} />
            </Stack>
          </View>
        </View>
      </SafeAreaView>
      <ClubLayout />
    </ClubProvider>
  );
}