import { View, TextInput as TI } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { LocaleText } from "@/components/LocaleText";
import { SignInFormValues, useSignInForm } from "@/hooks/forms/useSignInForm";
import { Controller } from 'react-hook-form'
import React from "react";
import { router } from "expo-router";
import { useSession } from "@/auth";
import { Colors, TextFieldRef } from "react-native-ui-lib";
import { TextField, Button, Card, Text } from 'react-native-ui-lib'
export default function Index() {

  const { formState: { errors }, handleSubmit, control } = useSignInForm({
    defaultValues: {
      phone_number: '0505716748',
      password: 'Abcd1234!@'
    },
    mode: "onChange"

  });

  let [phoneRef, passwordRef] = [React.useRef<TextFieldRef>(null), React.useRef<TextFieldRef>(null)]
  const [showPassword, setShowPassword] = React.useState(false)

  const { authenticateUser } = useSession()

  console.log(errors.phone_number);


  const onSubmit = async (data: SignInFormValues) => {
    const res = await authenticateUser({
      Username: data.phone_number,
      Password: data.password
    })

    console.log(res);
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
      <Card flex center>
        <Text h1>כניסה</Text>
        <Text>יש להזין את פרטי משתמש המועדון כדי להמשיך</Text>
        <Controller
          control={control}
          render={({ field: { onChange, ref, ...fieldProps }, fieldState: { error } }) => {
            return (
              <TextField
                placeholderTextColor="#CCCCCC"
                style={{ width: '100%' }}
                containerStyle={error && { borderColor: Colors.error }}
                placeholder="מספר טלפון"
                validate={() => { return !Boolean(error) }}
                validationMessage={error?.message}
                enableErrors
                onChangeText={onChange}
                onSubmitEditing={() => passwordRef.current?.focus()}
                returnKeyType="next"
                blurOnSubmit={false}
                ref={(r) => {
                  ref(r);
                  let re = phoneRef.current;
                  re = r;
                }}
                floatingPlaceholder
                {...fieldProps}
              />
            )
          }}
          name="phone_number"
        />

        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field: { onChange, ...fieldProps } }) => (
            <TextField
              placeholder="סיסמה"
              placeholderTextColor="#CCCCCC"
              style={{ width: '100%' }}
              containerStyle={errors.password && { borderColor: Colors.error }}
              onChangeText={onChange}
              {...fieldProps}
              secureTextEntry={!showPassword}
              returnKeyType="done"
              floatingPlaceholder
              ref={passwordRef}
            />
          )}
          name="password"
        />
        {errors.password && <Text style={{ color: Colors.error }}>{errors.password.message}</Text>}
        <Card.Section>
          <Button onPress={handleSubmit(onSubmit)}>
            התחברות
          </Button>
        </Card.Section>
      </Card>
    </View >
  );
}