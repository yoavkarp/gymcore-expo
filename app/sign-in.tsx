import { View, TextInput as TI } from "react-native";
import { Button, Card, TextInput, useTheme } from "react-native-paper";
import Feather from '@expo/vector-icons/Feather';
import { useTranslation } from "react-i18next";
import { LocaleText } from "@/components/LocaleText";
import { SignInFormValues, useSignInForm } from "@/hooks/forms/useSignInForm";
import { Controller } from 'react-hook-form'
import React from "react";
import { router } from "expo-router";
import { useSession } from "@/auth";

export default function Index() {

  const { t } = useTranslation();
  const { formState: { errors }, handleSubmit, control } = useSignInForm();

  const [phoneRef, passwordRef] = [React.useRef<TI>(null), React.useRef<TI>(null)]
  const [showPassword, setShowPassword] = React.useState(false)

  const { authenticateUser } = useSession()

  const { colors } = useTheme();

  const onSubmit = async (data: SignInFormValues) => {
    await authenticateUser({
      Username: data.phone_number,
      Password: data.password
    })
    router.replace('/');
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 350 }}>
        <Card.Title title={<LocaleText headline>Sign In</LocaleText>} />
        <Card.Content>
          <Controller
            control={control}
            render={({ field: { onChange, ...fieldProps } }) => (
              <TextInput
                placeholderTextColor="#CCCCCC"
                mode="outlined"
                label={t("Phone Number")}
                right={<TextInput.Icon disabled icon={(props) => <Feather name="phone" {...props} />} size={24} color="black" />}
                style={{ width: '100%' }}
                outlineStyle={errors.phone_number && { borderColor: colors.error }}
                placeholder={t("05x-x-xxx-xxx")}
                onChangeText={onChange}
                onSubmitEditing={() => passwordRef.current?.focus()}
                returnKeyType="next"
                {...fieldProps}
                blurOnSubmit={false}
                ref={phoneRef}
              />
            )}
            name="phone_number"
          />
          {errors.phone_number && <LocaleText style={{ color: colors.error }}>{errors.phone_number.message}</LocaleText>}

          <Controller
            rules={{
              required: true,
            }}
            control={control}
            render={({ field: { onChange, ...fieldProps } }) => (
              <TextInput
                placeholderTextColor="#CCCCCC"
                mode="outlined"
                label={t("Password")}
                right={<TextInput.Icon onPress={() => setShowPassword(prev => !prev)} icon={(props) => (
                  <Feather name={showPassword ? 'eye-off' : 'eye'} {...props} />
                )} size={24} color="black" />}
                style={{ width: '100%' }}
                outlineStyle={errors.password && { borderColor: colors.error }}
                onChangeText={onChange}
                {...fieldProps}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                ref={passwordRef}
              />
            )}
            name="password"
          />
          {errors.password && <LocaleText style={{ color: colors.error }}>{errors.password.message}</LocaleText>}
        </Card.Content>
        <Card.Actions>
          <Button onPress={handleSubmit(onSubmit)}>
            <LocaleText>Login</LocaleText>
          </Button>
        </Card.Actions>
      </Card>
    </View >
  );
}