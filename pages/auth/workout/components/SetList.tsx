import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useWorkout } from "@/features/workout";
import FlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import SetFormModal from "./SetFormModal";
import { useRef, useState } from "react";
import TouchableOpacity from "@/components/ui/TouchableOpacity";
import Label from "@/components/ui/Label";
import { parameterToString } from "@/utils/parameter-to-string";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import YesNoDialog from "@/components/YesNoDialog";
import { Exercise, StrengthExercise, StrengthExerciseSet, useMoveSetInExerciseMutation } from "@/graphql";
import { useDeleteSetFromExercise } from "@/features/workout/hooks/api/useDeleteSetFromExercise";
import { useSnackbar } from "@/contexts/SnackbarContext";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { useApolloClient } from "@apollo/client";

interface SetListItemProps {
    item: Exclude<StrengthExercise['sets'], null | undefined>[number];
    selected: boolean;
    onPressDelete?: () => any;
    onPressEdit?: () => any;
    index: number;
    loading?: boolean;
    drag?: () => any;
}

export const SetListItem: React.FC<SetListItemProps> = ({ drag, loading = false, item, selected, onPressDelete, onPressEdit, index }) => {

    const { theme } = useTheme();
    return (
        <ScaleDecorator>
            <TouchableOpacity onLongPress={drag} style={[{ padding: 5, gap: 10 }, selected && { backgroundColor: `${theme.colors.secondary.toString()}66` }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <Label>סט {index + 1}</Label>
                        <Text style={{ backgroundColor: theme.colors.success, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 8 }}>x {item?.times || 1}</Text>

                    </View>
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
                    {item?.reps && <Text>{parameterToString(item.reps, "חזרות")}</Text>}
                    {item?.weight && <Text>{parameterToString(item.weight, "משקל")}</Text>}
                    {item?.rest && <Text>{parameterToString(item.rest, "מנוחה")}</Text>}
                </View>

            </TouchableOpacity>
        </ScaleDecorator>
    );
}

type SetListProps = {
    onChangeSelect: (exerciseId: string) => any;
    selectedExerciseId: string | null;
}

const SetList: React.FC<SetListProps> = ({ onChangeSelect, selectedExerciseId }) => {

    const { workout, workoutId } = useWorkout();
    const setFormModal = useRef<SetFormModal>(null);
    const yesNoDialog = useRef<YesNoDialog>(null);
    const { cache } = useApolloClient();

    const exerciseIndex = workout?.exercises?.findIndex((exercise) => exercise.id === selectedExerciseId)

    const { deleteSetFromExercise, result: deleteSetFromExerciseResult } = useDeleteSetFromExercise(workoutId)
    const [moveSetInExerciseMutation, moveSetInExerciseMutationResult] = useMoveSetInExerciseMutation();
    const [deleting, setDeleting] = useState<string[]>([])
    const [show] = useSnackbar();

    return (
        <>
            <FlatList
                onDragEnd={({ data, from, to }) => {
                    if (from === to) return;
                    let prev: any;


                    cache.modify({
                        id: cache.identify({ __typename: "StrengthExercise", id: selectedExerciseId }),
                        fields: {
                            sets: () => data
                        }
                    })

                    moveSetInExerciseMutation({ variables: { from, to, workoutId, exerciseId: selectedExerciseId! } })
                        .catch((e) => {
                            console.log(e);
                            show(e.message, "error")
                            cache.modify({
                                id: cache.identify({ __typename: "StrengthExercise", id: selectedExerciseId }),
                                fields: {
                                    sets: (p) => {
                                        if (prev)
                                            return prev;

                                        return p;
                                    }
                                },
                            })
                        })


                }}
                style={{ maxHeight: 400 }}
                data={(workout?.exercises?.[exerciseIndex || 0] as StrengthExercise).sets || []}
                renderItem={({ item, drag, isActive }) => {
                    const index = (workout?.exercises?.[exerciseIndex || 0] as StrengthExercise).sets?.indexOf(item);
                    if (typeof (index) !== "number" || index < 0) return null;
                    return (
                        <SetListItem
                            drag={drag}
                            selected={isActive}
                            item={item!}
                            onPressDelete={() => yesNoDialog.current?.open(async () => {
                                setDeleting(prev => [...prev, item!.id])
                                try {
                                    await deleteSetFromExercise(selectedExerciseId!, item!.id)
                                    show("הסט נמחק בהצלחה")
                                }
                                catch (e) {
                                    show("אירעה שגיאה במחיקת הסט", "error")
                                    console.log(e);
                                }
                                finally {
                                    setDeleting(prev => prev.filter((id) => id !== item!.id))
                                }
                            })}
                            onPressEdit={() => {
                                if (selectedExerciseId && item?.id)
                                    setFormModal.current?.open(selectedExerciseId, item.id)
                            }}
                            index={index}
                        />

                    )
                }}
                keyExtractor={(item) => item!.id}
                ListEmptyComponent={() => <Text subtitle>לא נוספו סטים לתרגיל זה</Text>}
            />
            <Button style={{ marginTop: 10 }} onPress={() => selectedExerciseId ? setFormModal.current?.open(selectedExerciseId) : null}>סט חדש</Button>
            <SetFormModal ref={setFormModal} />
            <YesNoDialog ref={yesNoDialog} title="מחיקת סט" />
        </>
    );
}

export default SetList;