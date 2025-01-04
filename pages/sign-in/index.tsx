import { SignInFormValues, useSignInForm } from "./hooks/useSignInForm";
import { Controller } from 'react-hook-form'
import React, { useMemo, useRef, useState } from "react";
import { router } from "expo-router";
import { useSession } from "@/features/auth";
import TextInput, { TextInputRef } from "@/components/ui/TextInput";
import Text from "@/components/ui/Text";
import Label from "@/components/ui/Label";
import Card from "@/components/ui/Card";
import { Image, View } from "react-native";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import OTPForm from "./components/OTPForm";
import SignInForm from "./components/SignInForm";
import { theme } from "@/theme";

export default function SignInPage() {

    const { status } = useSession()

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.background,
            }}
        >
            <Section style={{ gap: 5 }}>
                <Image style={{ height: 120, width: 200, borderTopRightRadius: 12, alignSelf: "center" }} source={require("../../assets/images/logogymcore.png")} />
                <Text h1>כניסה</Text>
                <Text subtitle>יש להזין את פרטי משתמש המועדון כדי להמשיך</Text>
                {status === "MFA_REQUIRED" ? <OTPForm /> : <SignInForm />}
            </Section>
        </View >
    );
}