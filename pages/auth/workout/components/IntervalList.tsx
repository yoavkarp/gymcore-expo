import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useWorkout } from "@/features/workout";
import { FlatList } from "react-native";
import IntervalFormModal from "./IntervalFormModal";
import { useRef, useState } from "react";
import TouchableOpacity from "@/components/ui/TouchableOpacity";
import Label from "@/components/ui/Label";
import { parameterToString } from "@/utils/parameter-to-string";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import YesNoDialog from "@/components/YesNoDialog";
import { CardioExercise, StrengthExercise } from "@/graphql";
import { useDeleteIntervalFromExercise } from "@/features/workout/hooks/api/useDeleteIntervalFromExercise";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { useSnackbar } from "@/contexts/SnackbarContext";

interface IntervalListItemProps {
    item: Exclude<CardioExercise['intervals'], null | undefined>[number];
    selected: boolean;
    onPress: (exerciseId: string) => any;
    onPressDelete?: () => any;
    onPressEdit?: () => any;
    index: number;
    loading?: boolean;
}

export const IntervalListItem: React.FC<IntervalListItemProps> = ({ loading, item, selected, onPress, onPressDelete, onPressEdit, index }) => {

    const { theme } = useTheme();

    return (
        <TouchableOpacity style={[{ padding: 5, gap: 10 }, selected && { backgroundColor: `${theme.colors.secondary.toString()}66` }]} onPress={() => onPress(item!.id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Label>אינטרוול {index + 1}</Label>
                {loading ? <LoadingIndicator /> : <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Button onPress={onPressDelete} style={{ paddingVertical: 5, paddingHorizontal: 10 }} error>
                        <Ionicons name="trash-sharp" size={20} />
                    </Button>

                    <Button onPress={onPressEdit} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                        <Ionicons name="pencil-sharp" size={20} />
                    </Button>
                </View>}
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
                {item?.distance && <Text>{parameterToString(item.distance, "מרחק")}</Text>}
            </View>

        </TouchableOpacity>
    );
}

type IntervalListProps = {
    onChangeSelect: (exerciseId: string) => any;
    selectedExerciseId: string | null;
}

const IntervalList: React.FC<IntervalListProps> = ({ onChangeSelect, selectedExerciseId }) => {

    const { workout, workoutId } = useWorkout();
    const intervalFormModal = useRef<IntervalFormModal>(null);
    const yesNoDialog = useRef<YesNoDialog>(null);

    const [selectedIntervalId, setSelectedIntervalId] = useState<string | null>(null);
    const exerciseIndex = workout?.exercises?.findIndex((exercise) => exercise.id === selectedExerciseId)

    const { deleteIntervalFromExercise, result: deleteIntervalFromExerciseResult } = useDeleteIntervalFromExercise(workoutId)

    const [deleting, setDeleting] = useState<string[]>([])
    const [show] = useSnackbar();

    return (
        <>
            <FlatList
                style={{ maxHeight: 400 }}
                data={(workout?.exercises?.[exerciseIndex || 0] as CardioExercise).intervals || []}
                renderItem={({ item, index }) => {
                    return (
                        <IntervalListItem
                            selected={selectedIntervalId === item?.id}
                            item={item!}
                            onPress={(exerciseId) => {
                                setSelectedIntervalId(exerciseId)
                                onChangeSelect(exerciseId)
                            }}
                            loading={deleting.includes(item!.id)}
                            onPressDelete={() => yesNoDialog.current?.open(async () => {
                                setDeleting(prev => [...prev, item!.id])
                                try {
                                    await deleteIntervalFromExercise(selectedExerciseId!, item!.id)
                                    show("האינטרוול נמחק בהצלחה")
                                }
                                catch (e) {
                                    show("אירעה שגיאה במחיקת האינטרוול", "error")
                                    console.log(e);
                                }
                                finally {
                                    setDeleting(prev => prev.filter((id) => id !== item!.id))
                                }
                            })}
                            onPressEdit={() => {
                                if (selectedExerciseId && item?.id)
                                    intervalFormModal.current?.open(selectedExerciseId, item.id)
                            }}
                            index={index}
                        />

                    )
                }}
                keyExtractor={(item) => item!.id}
                ListEmptyComponent={() => <Text subtitle>לא נוספו אינטרוולים לתרגיל זה</Text>}
            />
            <Button style={{ marginTop: 10 }} onPress={() => selectedExerciseId ? intervalFormModal.current?.open(selectedExerciseId) : null}>אינטרוול חדש</Button>
            <IntervalFormModal ref={intervalFormModal} />
            <YesNoDialog ref={yesNoDialog} title="מחיקת אינטרוול" />
        </>
    );
}

export default IntervalList;