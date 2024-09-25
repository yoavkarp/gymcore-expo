import Button from "@/components/ui/Button";
import CloseButton from "@/components/ui/CloseButton";
import DateSelect from "@/components/ui/DateSelect";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Select, { SelectRef } from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import TextInput, { TextInputRef } from "@/components/ui/TextInput";
import { View } from "@/components/ui/View";
import { CreateTrainerFormValues, useCreateTrainerForm } from "@/hooks/forms/useCreateTrainerForm";
import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";

const genders = [
    {
        value: "MALE",
        title: "זכר"
    },
    {
        value: "FEMALE",
        title: "נקבה"
    },
    {
        value: "OTHER",
        title: "אחר"
    }
]


interface CreateTrainerModalProps {
    visible?: boolean;
    onDismiss?: () => any;
    onSubmit?: (e: CreateTrainerFormValues) => any;
    error?: Error;
}

const CreateTrainerModal: React.FC<CreateTrainerModalProps> = ({ error, visible = false, onDismiss, onSubmit }) => {
    const { control, formState: { isSubmitting }, handleSubmit, reset } = useCreateTrainerForm({
        defaultValues: {
            phone_number: "050571674",
            birthdate: new Date().toISOString().slice(0, 10),
            email: "treeofj2@gmail.com",
            name: "אבי כהן",
            gender: "MALE"
        },
        mode: "onChange"
    });
    const [nameInputRef, phoneNumberInputRef, emailInputRef] = [React.useRef<TextInputRef>(null), React.useRef<TextInputRef>(null), React.useRef<TextInputRef>(null)];
    const [genderSelectRef, birthdateSelectRef] = [React.useRef<SelectRef>(null), React.useRef<SelectRef>(null)];

    return (
        <Modal visible={visible} onDismiss={onDismiss} onShow={() => {
            reset({})
            setTimeout(() => {
                nameInputRef.current?.focus();
            }, 100);
        }}>
            <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text h1>מאמן חדש</Text>
                <CloseButton onPress={onDismiss} />
            </View>
            <Text subtitle>יש להשלים את הטופס על מנת להוסיף מאמן חדש</Text>

            <View style={{ gap: 10 }}>
                <View style={{ gap: 10, flexWrap: 'wrap', flexDirection: 'row' }}>
                    <Controller control={control} render={({ field: { ref, onChange, ...field }, fieldState: { error } }) => {
                        return (
                            <View style={styles.formField}>
                                <Label>שם מלא *</Label>
                                <TextInput readOnly={isSubmitting} style={styles.formInput} onChange={onChange} onChangeText={onChange} blurOnSubmit={false} returnKeyType="next" error={Boolean(error)} ref={nameInputRef} onSubmitEditing={() => phoneNumberInputRef.current?.focus()} {...field} />
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }} name="name" />

                    <Controller control={control} render={({ field: { ref, onChange, ...field }, fieldState: { error } }) => {
                        return (
                            <View style={styles.formField}>
                                <Label>טלפון *</Label>
                                <TextInput readOnly={isSubmitting} keyboardType="phone-pad" style={styles.formInput} onChange={onChange} onChangeText={onChange} blurOnSubmit={false} returnKeyType="next" error={Boolean(error)} ref={phoneNumberInputRef} onSubmitEditing={() => emailInputRef.current?.focus()} {...field} />
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }} name="phone_number" />

                    <Controller control={control} render={({ field: { ref, value, ...field }, fieldState: { error } }) => {
                        return (
                            <View style={styles.formField}>
                                <Label>אימייל</Label>
                                <TextInput readOnly={isSubmitting} keyboardType="email-address" style={styles.formInput} blurOnSubmit={false} returnKeyType="next" error={Boolean(error)} ref={emailInputRef} onSubmitEditing={() => {
                                    emailInputRef.current?.blur();
                                    genderSelectRef.current?.focus()
                                }} {...field} onChangeText={field.onChange} value={value} />
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }} name="email" />

                    <Controller control={control} render={({ field: { ref, ...field }, fieldState: { error } }) => {
                        return (
                            <View style={styles.formField}>
                                <Label>מגדר *</Label>
                                <Select containerStyle={styles.formInput} title="מגדר" ref={genderSelectRef} items={genders} onChangeValue={(val) => field.onChange(val.value)} />
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }} name="gender" />

                    <Controller control={control} render={({ field: { ref, ...field }, fieldState: { error } }) => {
                        return (
                            <View style={styles.formField}>
                                <Label>תאריך לידה *</Label>
                                <DateSelect onChange={field.onChange} />
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }} name="birthdate" />
                </View>

                <Button disabled={isSubmitting} isLoading={isSubmitting} onPress={onSubmit ? handleSubmit(onSubmit) : undefined}>
                    צור מאמן
                </Button>
                {error && <Text error>{error.message}</Text>}

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    formField: {
        alignSelf: 'flex-start',
        flexBasis: '45%'
    },
    formInput: {
        width: '100%',
        textAlign: 'center'
    }
})

export default CreateTrainerModal;