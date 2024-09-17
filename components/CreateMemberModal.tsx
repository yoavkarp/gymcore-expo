import { CreateMemberInput } from "@/appsync/API";
import { useCreateMemberForm } from "@/hooks/forms/useCreateMemberForm";
import React from "react";
import { FunctionComponent, useRef } from "react";
import { Controller } from "react-hook-form";
import { View, TextInput as TI } from "react-native";
import { Headline, HelperText, Modal, Portal, Text, TextInput, useTheme } from "react-native-paper";

interface CreateMemberModalProps {
    onSubmit: (input: CreateMemberInput) => void;
    visible?: boolean;
}

const CreateMemberModal: FunctionComponent<CreateMemberModalProps> = ({ visible = false }) => {
    const { colors } = useTheme()
    const { register, control, formState: { errors }, handleSubmit } = useCreateMemberForm();

    const [phoneRef, nameRef, emailRef, birthdateRef] = [React.useRef<TI>(null), React.useRef<TI>(null), React.useRef<TI>(null), React.useRef<TI>(null)]

    return (
        <Portal>
            <Modal dismissable={false} visible={visible} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: colors.background, padding: 5, minWidth: 400 }}>
                    <Headline>צור משתמש חדש</Headline>
                    <View>
                        <Controller
                            control={control}
                            render={({ field: { onChange, ...fieldProps } }) => {
                                return (
                                    <TextInput
                                        placeholderTextColor="#CCCCCC"
                                        mode="flat"
                                        label="שם מלא"
                                        style={{ width: '100%' }}
                                        outlineStyle={errors.name && { borderColor: colors.error }}
                                        onChangeText={onChange}
                                        onSubmitEditing={() => phoneRef.current?.focus()}
                                        returnKeyType="next"
                                        {...fieldProps}
                                        blurOnSubmit={false}
                                        ref={nameRef}
                                    />
                                )
                            }}
                            name="name"
                        />
                        <HelperText visible={Boolean(errors.name)} type="error">{errors.name?.message}</HelperText>

                        <Controller
                            control={control}
                            render={({ field: { onChange, ...fieldProps } }) => {
                                return (
                                    <TextInput
                                        placeholderTextColor="#CCCCCC"
                                        mode="flat"
                                        label="טלפון"
                                        style={{ width: '100%', }}
                                        outlineStyle={errors.phone_number && { borderColor: colors.error }}
                                        placeholder={"05x-x-xxx-xxx"}
                                        onChangeText={onChange}
                                        onSubmitEditing={() => emailRef.current?.focus()}
                                        returnKeyType="next"
                                        {...fieldProps}
                                        blurOnSubmit={false}
                                        ref={phoneRef}
                                    />
                                )
                            }}
                            name="phone_number"
                        />
                        <HelperText type="error" visible={Boolean(errors.phone_number)}>{errors.phone_number?.message}</HelperText>


                        <Controller
                            control={control}
                            render={({ field: { onChange, ...fieldProps } }) => {
                                return (
                                    <TextInput
                                        placeholderTextColor="#CCCCCC"
                                        mode="flat"
                                        label="אימייל"
                                        style={{ width: '100%', }}
                                        outlineStyle={errors.email && { borderColor: colors.error }}
                                        placeholder={"email@email.com"}
                                        onChangeText={onChange}
                                        onSubmitEditing={() => nameRef.current?.focus()}
                                        returnKeyType="next"
                                        {...fieldProps}
                                        blurOnSubmit={false}
                                        ref={emailRef}
                                    />
                                )
                            }}
                            name="email"
                        />
                        <HelperText visible={Boolean(errors.email)} type="error">{errors.email?.message}</HelperText>

                        <Controller
                            control={control}
                            render={({ field: { onChange, ...fieldProps } }) => {
                                return (
                                    <TextInput
                                        placeholderTextColor="#CCCCCC"
                                        mode="flat"
                                        label="תאריך לידה"
                                        style={{ width: '100%', }}
                                        outlineStyle={errors.birthdate && { borderColor: colors.error }}
                                        placeholder={"01/01/1970"}
                                        onChangeText={onChange}
                                        onSubmitEditing={() => nameRef.current?.focus()}
                                        returnKeyType="next"
                                        {...fieldProps}
                                        blurOnSubmit={false}
                                        ref={birthdateRef}
                                    />
                                )
                            }}
                            name="birthdate"
                        />
                        <HelperText type="error" visible={Boolean(errors.birthdate)}>{errors.birthdate?.message}</HelperText>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
}

export default CreateMemberModal;