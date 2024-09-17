import { useSession } from "@/auth";
import CreateMemberModal from "@/components/CreateMemberModal";
import { useState, useTransition } from "react";
import { SafeAreaView } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";


const Index = () => {

    const [isCreateMemberModalVisible, setCreateMemberModalVisibility] = useState(false);

    return (
        <SafeAreaView style={{ alignItems: 'flex-start' }}>
            <Button mode="contained-tonal" onPress={() => setCreateMemberModalVisibility(true)}>צור משתמש</Button>
            <CreateMemberModal onSubmit={(input) => console.log(input)} visible={isCreateMemberModalVisible} />
        </SafeAreaView>
    );
}

export default Index;