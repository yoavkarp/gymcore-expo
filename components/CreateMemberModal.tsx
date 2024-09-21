import { CreateMemberInput } from "@/appsync/API";
import { useTheme } from "@/contexts/ThemeContext";
import { useCreateMemberForm } from "@/hooks/forms/useCreateMemberForm";
import React, { MutableRefObject, FunctionComponent, useRef } from "react";
import Card from "./ui/Card";
import { TextInputRef } from "./ui/TextInput";
import { Theme } from "@/theme";
import Text from "./ui/Text";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Select from "./ui/Select";
import { View } from "./ui/View";

interface CreateMemberModalProps {
    onSubmit: (input: CreateMemberInput) => void;
    onDismiss: () => void;
    visible?: boolean;
}

const genders = [{
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
}]

const CreateMemberModal: FunctionComponent<CreateMemberModalProps> = ({ visible = false, onDismiss }) => {
    const { theme } = useTheme()

    const { control, formState: { errors }, handleSubmit } = useCreateMemberForm({
        mode: "onBlur"
    });

    const [phoneRef, nameRef, emailRef, birthdateRef]: Array<MutableRefObject<TextInputRef | null>> = [React.useRef<TextInputRef>(null), React.useRef<TextInputRef>(null), React.useRef<TextInputRef>(null), React.useRef<TextInputRef>(null)]

    return (
        <Modal animationType="fade" onRequestClose={onDismiss} transparent visible={visible} onDismiss={onDismiss}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: "#00000077" }}>
                <Card style={{ minWidth: 500 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text h1>הוספת מנוי חדש</Text>
                        <TouchableOpacity style={{ padding: 10 }} onPress={onDismiss}>
                            <MaterialIcons name="close" size={30} />
                        </TouchableOpacity>
                        <Select items={genders} defaultValue="" />
                    </View>
                </Card>
            </View>
        </Modal>
    );
}

const styles = (theme: Theme) => StyleSheet.create({

})

export default CreateMemberModal;