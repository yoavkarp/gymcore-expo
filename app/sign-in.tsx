import { StyleSheet, View, TextInput as TI, TouchableOpacity } from "react-native";
import { Button, Card, Headline, TextInput } from "react-native-paper";
import Feather from '@expo/vector-icons/Feather';
import { useTranslation } from "react-i18next";
import { LocaleText } from "@/components/LocaleText";
import { SignInFormValues, useSignInForm } from "@/hooks/forms/useSignInForm";
import { Controller } from 'react-hook-form'
import React, { useEffect } from "react";
import { Redirect, useNavigation } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {

  const { t, i18n: { changeLanguage, language, dir } } = useTranslation();
  const { formState: { errors }, handleSubmit, control } = useSignInForm();

  const [phoneRef, passwordRef] = [React.useRef<TI>(null), React.useRef<TI>(null)]
  const [showPassword, setShowPassword] = React.useState(false)
  const { navigate } = useNavigation<any>()

  const { ready, login } = useAuth()

  const onSubmit = async (data: SignInFormValues) => {
    await login(data.phone_number, data.password)
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
                right={<TextInput.Icon icon={(props) => <Feather name="phone" {...props} />} size={24} color="black" />}
                style={{ width: '100%' }}
                outlineStyle={errors.phone_number && style.errorInput}
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
          {errors.phone_number && <LocaleText style={style.errorText}>{errors.phone_number.message}</LocaleText>}

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
                outlineStyle={errors.password && style.errorInput}
                onChangeText={onChange}
                {...fieldProps}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                ref={passwordRef}
              />
            )}
            name="password"
          />
          {errors.password && <LocaleText style={style.errorText}>{errors.password.message}</LocaleText>}
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

const style = StyleSheet.create({
  errorText: {
    color: 'red'
  },
  errorInput: {
    borderColor: 'red',

  }
})