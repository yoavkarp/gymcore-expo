import { useSession } from "@/auth";
import { useState, useTransition } from "react";
import { SafeAreaView } from "react-native";
import { Button, TextInput } from "react-native-paper";


const Index = () => {

    const { session } = useSession()
    const [isPending, startTransition] = useTransition();
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    return (
        <SafeAreaView style={{ alignItems: 'flex-start' }}>
            <TextInput onChange={(e) => setPhoneNumber(e.nativeEvent.text)} style={{ width: 200 }} />
            <Button mode="contained-tonal" onPress={async () => {
            }}>Create Member</Button>
        </SafeAreaView>
    );
}

export default Index;