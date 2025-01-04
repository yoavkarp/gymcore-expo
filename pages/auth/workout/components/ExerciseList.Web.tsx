import React from 'react';
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { Exercise } from "@/graphql";
import { FlatList, ListRenderItemInfo, Touchable } from "react-native";
import ExerciseNameModal from "./ExerciseNameModal";
import { useEffect, useRef, useState } from "react";
import YesNoDialog from "@/components/YesNoDialog";
import { Ionicons } from "@expo/vector-icons";
import { useDeleteExerciseFromWorkout } from "@/features/workout/hooks/api/useDeleteExerciseFromWorkout";
import { useWorkout } from "@/features/workout";
import { useTheme } from "@/contexts/ThemeContext";
import TouchableOpacity from "@/components/ui/TouchableOpacity";
import { useSnackbar } from "@/contexts/SnackbarContext";
import Label from "@/components/ui/Label";
import { useMoveExerciseInWorkout } from "@/features/workout/hooks/api/useMoveExerciseInWorkout";
import { router } from "expo-router";

interface ExerciseListItemProps {
    selected: boolean;
    onPress: (exerciseId: string) => any;
    onPressDelete?: () => any;
    onPressEdit?: () => any;
}

export const ExerciseListItem: React.FC<ListRenderItemInfo<Exercise> & ExerciseListItemProps> = ({ item, index, selected, onPress, onPressDelete, onPressEdit }) => {

    const { theme } = useTheme()
    return (
        <TouchableOpacity style={[{ padding: 5 }, selected && { backgroundColor: `${theme.colors.primary.toString()}55`, borderRadius: 8 }]} onPress={() => onPress(item.id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>{item.name}</Text>
                <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
                    {item.machine_number && <><Label>מספר מכונה:</Label><Text>{item.machine_number}</Text></>}
                    {item.seat_height && <><Label>גובה מושב:</Label><Text>{item.seat_height}</Text></>}
                </View>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Button onPress={onPressDelete} style={{ paddingVertical: 5, paddingHorizontal: 10 }} error>
                        <Ionicons name="trash-sharp" size={20} />
                    </Button>

                    <Button onPress={onPressEdit} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                        <Ionicons name="pencil-sharp" size={20} />
                    </Button>
                </View>
            </View>

        </TouchableOpacity>
    );
}

type ExerciseListProps = {
    onChangeSelect: (exerciseId: string | null) => any;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ onChangeSelect }) => {

    const newExerciseModalRef = useRef<ExerciseNameModal>(null);
    const yesNoDialogRef = useRef<YesNoDialog>(null);
    const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

    const { workoutId, workout } = useWorkout();
    const { theme } = useTheme();

    const { deleteExerciseFromWorkout, result: deleteExerciseFromWorkoutResult } = useDeleteExerciseFromWorkout(workoutId);
    const { moveExerciseInWorkout } = useMoveExerciseInWorkout(workoutId)

    const [show] = useSnackbar();

    useEffect(() => {
        if (!selectedExerciseId && workout?.exercises?.at(0)?.id) {
            setSelectedExerciseId(workout?.exercises?.at(0)?.id || null)
            onChangeSelect(workout?.exercises?.at(0)?.id || null)
        }
    }, [workoutId, workout])

    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: theme.spacing.sm }}>
                <Label>תרגילים</Label>
                <Button onPress={() => newExerciseModalRef.current?.open()}>תרגיל חדש</Button>
            </View>
            <FlatList
                style={{ height: 150 }}
                persistentScrollbar
                data={workout?.exercises || []}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme.colors.primary, marginBottom: 10 }} />}
                renderItem={({ item, index, separators }) => {
                    return (
                        <ExerciseListItem
                            index={index}
                            separators={separators}
                            selected={selectedExerciseId === item.id}
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
                            onPressEdit={() => router.push(`/workout/${workoutId}/${item.id}`)}
                        />

                    )
                }}
                keyExtractor={(item) => (item as unknown as Exercise).id}
                ListEmptyComponent={() => <Text subtitle>לא נוספו תרגילים לאימון זה</Text>}
            />
            <ExerciseNameModal ref={newExerciseModalRef} />
            <YesNoDialog ref={yesNoDialogRef} title="מחיקת תרגיל" />
        </>
    );
}

export default ExerciseList;