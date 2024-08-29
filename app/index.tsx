import { Text, View } from "react-native";
import { Button, Card, Headline, TextInput } from "react-native-paper";
import Feather from '@expo/vector-icons/Feather';
import { useTranslation } from "react-i18next";
import { LocaleText } from "@/components/LocaleText";

export default function Index() {

  const { t, i18n: { changeLanguage, language } } = useTranslation();


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 350 }}>
        <Card.Title title={<LocaleText>Sign In</LocaleText>} />
        <Card.Content style={{ flexDirection: 'row' }}>
          <TextInput placeholderTextColor="#CCCCCC" mode="outlined" label={t("Phone Number")} right={<TextInput.Icon icon={(props) => <Feather name="phone" {...props} />} size={24} color="black" />} style={{ width: '100%' }} placeholder={t("05x-x-xxx-xxx")} />
        </Card.Content>
        <Card.Actions>
          <Button onPress={async () => { await changeLanguage(language === "en" ? "he" : 'en') }}>
            <LocaleText>Change Language</LocaleText>
          </Button>
        </Card.Actions>
      </Card>
    </View >
  );
}
