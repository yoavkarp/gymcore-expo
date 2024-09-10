import { ApolloWrapper } from "@/components/GraphQLProvider";
import { theme } from "@/paper.theme";
import { Slot, SplashScreen, Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

import { Amplify } from "aws-amplify";
import config from "@/constants/aws-exports";
import { useCallback, useEffect, useMemo, useState } from "react";
import he from '@/locales/he.json'
import en from '@/locales/en.json'
import { I18nManager, View } from "react-native";
<<<<<<< HEAD
import { AuthProvider } from "@/auth";
=======
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { reloadAsync } from 'expo-updates'
import Storage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization'
const translations = {
  he,
  en
};
const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;
const { t } = i18n;
>>>>>>> b696f50288f31346dfe84a73d496c87245d960f2

Amplify.configure(config)
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const { getItem: getDir, setItem: setDir } = useAsyncStorage("locale_dir")
  const { getItem: getLanguage, setItem: setLanguage } = useAsyncStorage("locale")

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
<<<<<<< HEAD
        <AuthProvider UserPoolId="eu-central-1_rPC74KFyx" ClientId="cc6hkh9nqjvvjj93dpmhu6kln">
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
            </Stack>
          </View>
=======
        <AuthProvider>
          <Slot />
>>>>>>> b696f50288f31346dfe84a73d496c87245d960f2
        </AuthProvider>
      </PaperProvider>
    </ApolloWrapper>
  );
}