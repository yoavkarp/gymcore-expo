import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useWorkoutForm } from "@/contexts/WorkoutContext";
import { useMemo, useState } from "react";
import CreateWorkoutForm from "./create-workout-form";
import TextInput from "@/components/ui/TextInput";
import Label from "@/components/ui/Label";
import { Controller } from "react-hook-form";
import Select from "@/components/ui/Select";
import { Ionicons } from "@expo/vector-icons";
import SearchExerciseModal from "@/components/SearchExerciseModal";
import NewExerciseModal from "./new-exercise-modal";
import List from "@/components/ui/List";
import { randomUUID } from "expo-crypto";
import { ExerciseType } from "@/graphql";
import NewSetModal from "./new-set-modal";

const exerciseTypes = [{
    title: "קרדיו",
    value: "CARDIO"
}, {
    title: "כוח",
    value: "STRENGTH"
}];

interface MainWorkoutScreenProps {

}

const MainWorkoutScreen: React.FC<MainWorkoutScreenProps> = () => {
    const { control, watch } = useWorkoutForm();
    const [newExerciseModelVisible, setNewExerciseModelVisible] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

    const [newSetModalVisible, setNewSetModalVisible] = useState(false);

    const exercises = watch("exercises");
    const selectedExercise = useMemo(() => exercises?.find((item) => item.id === selectedExerciseId), [selectedExerciseId]);

    return (
        <View style={{ padding: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text h1>מסך יצירת אימון</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 20 }}>
                <View style={{ flexBasis: "50%", gap: 20 }}>
                    <Controller control={control} name="name"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <View style={{ alignSelf: 'flex-start' }}>
                                <Label>שם האימון</Label>
                                <TextInput style={{ width: 300, textAlign: 'center' }} error={Boolean(error)} onChangeText={onChange} onBlur={onBlur} value={value} />
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )}
                    />
                    <View>
                        <Label>רשימת תרגילים</Label>
                        <List
                            data={exercises?.map((item) => ({ key: item.id!, title: item.name! })) || []}
                            onPressItem={(item) => setSelectedExerciseId(item.key)}
                            ListEmptyComponent={() => <Text subtitle>לא נוספו תרגילים לאימון זה</Text>}
                            ListFooterComponent={() => <Button style={{ alignItems: 'center', marginTop: 10 }} onPress={() => setNewExerciseModelVisible(true)}>
                                הוספת תרגיל
                            </Button>}
                        />
                    </View>
                </View>
                <View style={{ flexBasis: "48%", paddingTop: 10, display: selectedExercise ? 'flex' : 'none' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text h1>{selectedExercise?.name}</Text>
                        <Select
                            items={exerciseTypes}
                            defaultValue="strength"
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text h2>סטים</Text>
                    </View>
                    <List
                        style={{ marginTop: 10 }}
                        data={(selectedExercise?.sets || []).map((item, index) => ({ key: item.id, title: `סט ${index + 1}` }))}
                        onPressItem={(item) => console.log(item)}
                        ListEmptyComponent={() => <Text subtitle>אין סטים להצגה כרגע</Text>}
                        ListFooterComponent={() => <Button onPress={() => setNewSetModalVisible(true)}>הוסף סט</Button>}
                    />

                </View>
            </View>

            {newExerciseModelVisible && <NewExerciseModal onDismiss={() => setNewExerciseModelVisible(false)} />}
            {newSetModalVisible && <NewSetModal exerciseId={selectedExerciseId || undefined} onDismiss={() => setNewSetModalVisible(false)} />}

        </View>
    );
}

export default MainWorkoutScreen;