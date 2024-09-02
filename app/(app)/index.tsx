import { useAuth } from "@/contexts/AuthContext";
import { useCreateMemberMutation } from "@/graphql";
import { useState } from "react";
import { I18nManager, SafeAreaView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const Index = () => {

    const { userSession } = useAuth()
    const [phoneNumber, setPhoneNumber] = useState<string>()

    const [createMember] = useCreateMemberMutation({
        onCompleted(d) {
            console.log(d)
        },
        onError(e) {
            console.log(e);
        }
    })

    return (
        <SafeAreaView style={{ alignItems: 'flex-start' }}>
            <TextInput onChange={(e) => setPhoneNumber(e.nativeEvent.text)} style={{ width: 200 }} />
            <Button onPress={async () => {
                await createMember({
                    variables: { input: { phone_number: `+972${phoneNumber}` } }
                })
                console.log(phoneNumber)
            }}>Create Member</Button>
        </SafeAreaView>
    );
}

export default Index;