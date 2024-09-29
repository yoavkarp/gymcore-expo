import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { Exercise } from "@/graphql";
import { FlatList, Touchable } from "react-native";
import ExerciseNameModal from "./ExerciseNameModal";
import { useMemo, useRef, useState } from "react";
import TouchableOpacity from "@/components/ui/TouchableOpacity";
import YesNoDialog from "@/components/YesNoDialog";
import { Ionicons } from "@expo/vector-icons";
import { useDeleteExerciseFromWorkout } from "@/features/workout/hooks/api/useDeleteExerciseFromWorkout";
import { useWorkout } from "@/features/workout";
import { useTheme } from "@/contexts/ThemeContext";

interface ExerciseListItemProps {
    item: Exercise;
    selected: boolean;
    onPress: (exerciseId: string) => any;
    onPressDelete?: () => any;
    onPressEdit?: () => any;
}

export const ExerciseListItem: React.FC<ExerciseListItemProps> = ({ item, selected, onPress, onPressDelete, onPressEdit }) => {

    const { theme } = useTheme()
    return (
        <TouchableOpacity style={[{ padding: 5 }, selected && { backgroundColor: `${theme.colors.primary.toString()}55`, borderRadius: 8 }]} onPress={() => onPress(item.id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>{item.name}</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Button onPress={onPressDelete} style={{ paddingVertical: 5, paddingHorizontal: 10 }} error>
                        <Ionicons name="trash-sharp" size={20} />
                    </Button>

                    <Button onPress={onPressEdit} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                        <Ionicons name="pencil-sharp" size={20} />
                    </Button>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                {item.machine_number && <Text>מספר מכונה: {item.machine_number}</Text>}
                {item.seat_height && <Text>גובה מושב: {item.seat_height}</Text>}
            </View>
        </TouchableOpacity>
    );
}

type ExerciseListProps = {
    onChangeSelect: (exerciseId: string | null) => any;
    exercises: Exercise[]
}

const ExerciseList: React.FC<ExerciseListProps> = ({ onChangeSelect, exercises }) => {

    const newExerciseModalRef = useRef<ExerciseNameModal>(null);
    const yesNoDialogRef = useRef<YesNoDialog>(null);
    const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

    const { workoutId, workout } = useWorkout();
    const { theme } = useTheme();

    const { deleteExerciseFromWorkout, result: deleteExerciseFromWorkoutResult } = useDeleteExerciseFromWorkout(workoutId);


    return (
        <>
            <FlatList
                persistentScrollbar
                data={workout?.exercises}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme.colors.primary, marginBottom: 10 }} />}
                renderItem={({ item }) => {
                    return (

                        <ExerciseListItem
                            selected={selectedExerciseId === item?.id}
                            item={item as unknown as Exercise}
                            onPress={(exerciseId) => {
                                setSelectedExerciseId(exerciseId)
                                onChangeSelect(exerciseId)
                            }}
                            onPressDelete={() => yesNoDialogRef.current?.open(async () => {
                                await deleteExerciseFromWorkout(item?.id)
                                setSelectedExerciseId(null)
                                onChangeSelect(null);
                            })}
                            onPressEdit={() => newExerciseModalRef.current?.open(item?.id)}
                        />

                    )
                }}
                keyExtractor={(item) => (item as unknown as Exercise).id}
                ListEmptyComponent={() => <Text subtitle>לא נוספו תרגילים לאימון זה</Text>}
            />
            <Button style={{ marginTop: 10 }} onPress={() => newExerciseModalRef.current?.open()}>תרגיל חדש</Button>
            <ExerciseNameModal ref={newExerciseModalRef} />
            <YesNoDialog ref={yesNoDialogRef} title="מחיקת תרגיל" />
        </>
    );
}

export default ExerciseList;