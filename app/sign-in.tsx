import { SignInFormValues, useSignInForm } from "@/hooks/forms/useSignInForm";
import { Controller } from 'react-hook-form'
import React, { createRef, useMemo, useRef } from "react";
import { router } from "expo-router";
import { useSession } from "@/auth";
import TextInput, { TextInputRef } from "@/components/ui/TextInput";
import Text from "@/components/ui/Text";
import Label from "@/components/ui/Label";
import Card from "@/components/ui/Card";
import { View } from "react-native";
import Button from "@/components/ui/Button";

export default function Index() {

  const { register, formState: { errors, isSubmitting }, handleSubmit, control } = useSignInForm({
    defaultValues: {
      phone_number: '0505716748',
      password: 'Abcd1234!@'
    },
    mode: "onBlur",
    shouldFocusError: false,
  });

  const phoneNumberInputRef: React.MutableRefObject<TextInputRef | null> = useRef<TextInputRef | null>(null);
  const passwordInputRef: React.MutableRefObject<TextInputRef | null> = useRef<TextInputRef | null>(null);

  let refs = {
    phone_number: phoneNumberInputRef,
    password: passwordInputRef
  }

  const { authenticateUser } = useSession()

  const onSubmit = async (data: SignInFormValues) => {
    const res = await authenticateUser({
      Username: data.phone_number,
      Password: data.password
    })

    console.log(res);
    router.replace('/');
  }

  const onInvalid = (err: typeof errors) => {
    const key = Object.keys(err)[0];
    const ref = refs[key as keyof typeof refs];
    setTimeout(() => {
      ref.current?.focus()
    }, 300);
    console.log(err);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ gap: 5 }}>
        <Text h1>כניסה</Text>
        <Text subtitle>יש להזין את פרטי משתמש המועדון כדי להמשיך</Text>
        <View style={{ gap: 10 }}>
          <Controller
            control={control}
            render={({ field: { onChange, ref, ...fieldProps }, fieldState: { error } }) => {
              return (
                <View style={{ gap: 3 }}>
                  <Label>מספר טלפון</Label>
                  <TextInput
                    error={Boolean(error)}
                    {...fieldProps}
                    readOnly={isSubmitting}
                    inputMode="tel"
                    placeholderTextColor="#CCCCCC"
                    placeholder="מספר טלפון"
                    onChangeText={onChange}
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    selectTextOnFocus
                    ref={(r) => {
                      register("phone_number").ref(r)
                      phoneNumberInputRef.current = r
                    }}
                  />
                  {error && <Text error>{error.message}</Text>}
                </View>
              )
            }}
            name="phone_number"
          />
          <Controller
            rules={{
              required: true,
            }}
            control={control}
            render={({ field: { onChange, ref, ...fieldProps }, fieldState: { error } }) => {
              return (
                <View style={{ gap: 3 }}>
                  <Label>סיסמה</Label>
                  <TextInput
                    error={Boolean(error)}
                    {...fieldProps}
                    readOnly={isSubmitting}
                    placeholder="סיסמה"
                    placeholderTextColor="#CCCCCC"
                    onChangeText={onChange}
                    secureTextEntry={true}
                    returnKeyType="go"
                    selectTextOnFocus
                    ref={(r) => {
                      register("password").ref(r)
                      passwordInputRef.current = r
                    }}
                    onSubmitEditing={handleSubmit(onSubmit, onInvalid)}
                  />
                  {error && <Text error>{error.message}</Text>}
                </View>

              )
            }}
            name="password"
          />
        </View>
        <Button disabled={isSubmitting} isLoading={isSubmitting} style={{ marginTop: 10 }} onPress={handleSubmit(onSubmit, onInvalid)}>
          כניסה
        </Button>
      </Card>
    </View >
  );
}