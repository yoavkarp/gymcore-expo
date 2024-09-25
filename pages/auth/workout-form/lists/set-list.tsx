import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useWorkoutForm } from "@/contexts/WorkoutContext";
import { FlatList } from "react-native";
import SetFormModal from "../modals/set-modal";
import { useRef, useState } from "react";
import TouchableOpacity from "@/components/ui/TouchableOpacity";
import { CreateSetFormInput } from "@/hooks/forms/useCreateWorkoutForm";
import Label from "@/components/ui/Label";
import { parameterToString } from "@/utils/parameter-to-string";
import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import YesNoDialog from "@/components/YesNoDialog";

interface SetListItemProps {
    item: CreateSetFormInput;
    selected: boolean;
    onPress: (exerciseId: string) => any;
    onPressDelete?: () => any;
    onPressEdit?: () => any;
    index: number;
}

export const SetListItem: React.FC<SetListItemProps> = ({ item, selected, onPress, onPressDelete, onPressEdit, index }) => {

    const { theme } = useTheme();
    return (
        <TouchableOpacity style={[{ padding: 5, gap: 10 }, selected && { backgroundColor: `${theme.colors.secondary.toString()}66` }]} onPress={() => onPress(item.id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Label>סט {index + 1}</Label>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Button onPress={onPressDelete} style={{ paddingVertical: 5, paddingHorizontal: 10 }} error>
                        <Ionicons name="trash-sharp" size={20} />
                    </Button>

                    <Button onPress={onPressEdit} style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                        <Ionicons name="pencil-sharp" size={20} />
                    </Button>
                </View>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
                {item.reps && <Text>{parameterToString(item.reps, "חזרות")}</Text>}
                {item.weight && <Text>{parameterToString(item.weight, "משקל")}</Text>}
                {item.rest && <Text>{parameterToString(item.rest, "מנוחה")}</Text>}
            </View>

        </TouchableOpacity>
    );
}

type SetListProps = {
    onChangeSelect: (exerciseId: string) => any;
    selectedExerciseId: string | null;
}

const SetList: React.FC<SetListProps> = ({ onChangeSelect, selectedExerciseId }) => {

    const { watch, getValues, setValue } = useWorkoutForm();
    const setFormModal = useRef<SetFormModal>(null);
    const yesNoDialog = useRef<YesNoDialog>(null);

    const [selectedSetId, setSelectedSetId] = useState<string | null>(null);

    return (
        <>
            <FlatList
                style={{ maxHeight: 400 }}
                data={(watch(`exercises.${selectedExerciseId}.setsOrder`) || []).map((item) => getValues(`exercises.${selectedExerciseId}.sets.${item}`))}
                renderItem={({ item, index }) => {
                    return (
                        <SetListItem
                            selected={selectedSetId === item?.id}
                            item={item!}
                            onPress={(exerciseId) => {
                                setSelectedSetId(exerciseId)
                                onChangeSelect(exerciseId)
                            }}
                            onPressDelete={() => yesNoDialog.current?.open(() => {
                                setValue(`exercises.${selectedExerciseId}.setsOrder`, (getValues(`exercises.${selectedExerciseId}.setsOrder`) || []).filter((id) => id !== item?.id));
                                setValue(`exercises.${selectedExerciseId}.sets.${item?.id}`, undefined);
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