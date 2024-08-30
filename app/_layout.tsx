import { ApolloWrapper } from "@/components/GraphQLProvider";
import { theme } from "@/paper.theme";
import { SplashScreen, Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

import { Amplify } from "aws-amplify";
import config from "@/constants/aws-exports";
import { useCallback, useEffect, useState } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import he from '@/locales/he.json'
import en from '@/locales/en.json'
import { I18nManager, View } from "react-native";
import { AuthProvider } from "@/contexts/AuthContext";

Amplify.configure(config)
SplashScreen.preventAutoHideAsync();

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      he: { translation: he, dir: "rtl" },
      en: { translation: en, dir: "ltr" }
    },
    lng: "he", // if you're using a language detector, do not define the lng option
    fallbackLng: "he",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    compatibilityJSON: 'v3'
  })

export default function RootLayout() {

  const [appIsReady, setAppIsReady] = useState(false);
  const { i18n: { dir }, ready } = useTranslation();

  useEffect(() => {
    if (ready) {
      I18nManager.forceRTL(dir() === "rtl");
      I18nManager.allowRTL(dir() === "rtl");
      setAppIsReady(true);
    }
  }, [ready])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
      await SplashScreen.hideAsync();
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null;
  }

  return (
    <ApolloWrapper>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="auth/index" />
            </Stack>
          </View>
        </AuthProvider>
      </PaperProvider>
    </ApolloWrapper>
  );
}