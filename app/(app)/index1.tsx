import CreateMemberModal from "@/components/CreateMemberModal";
import Button from "@/components/ui/Button";
import SearchModal from "@/components/SearchModal";
import { useState, useTransition } from "react";
import { SafeAreaView } from "react-native";
import exercisesJSON from "@/assets/exercises2.json";
import RangedInput from "@/components/RangedInput";
import SearchExerciseModal from "@/components/SearchExerciseModal";
import { useSnackbar } from "@/contexts/SnackbarContext";

const Index = () => {

    const [isCreateMemberModalVisible, setCreateMemberModalVisibility] = useState(false);
    const [items, setItems] = useState<{ value: string, title: string }[]>([]);
    const [isPending, startTransition] = useTransition();

    const searchExercise = (text: string) => {
        startTransition(() => {
            const result: { value: string, title: string }[] = []
            if (text.trim().length > 2)
                result.push(
                    ...exercisesJSON.strength.filter((exercise) => exercise.name.he.includes(text.trim()))
                        .map((ex) => ({ value: ex.id, title: ex.name.he })).slice(0, 5)
                );

            setItems(result);
        });
    }

    const [show] = useSnackbar()

    return (
        <SafeAreaView style={{ alignItems: 'flex-start' }}>
            <Button error onPress={() => {
                show("hi", undefined, 1000000)
                show("hi", "error", 1000000)
                show("hi", "warning", 1000000)
            }}>
                צור משתמש
            </Button>
            <SearchExerciseModal />
            <CreateMemberModal onDismiss={() => setCreateMemberModalVisibility(false)} onSubmit={(input) => console.log(input)} visible={isCreateMemberModalVisible} />

            <RangedInput onChangeValue={(val) => console.log(val)} />
        </SafeAreaView>
    );
}

export default Index;