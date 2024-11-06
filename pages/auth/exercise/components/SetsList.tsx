import { theme } from '@/theme';
import React, { useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import { useExercise } from './ExerciseProvider';
import Text from '@/components/ui/Text';
import { parameterToString } from '@/utils/parameter-to-string';
import Button from '@/components/ui/Button';
import TouchableOpacity from '@/components/ui/TouchableOpacity';
import SetFormModal from './SetFormModal';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDeleteSetFromExercise } from '@/features/workout/hooks/api/useDeleteSetFromExercise';
import { useWorkout } from '@/features/workout';
import { useAddSetToExercise } from '@/features/workout/hooks/api/useAddSetToExercise';
import { removeTypename } from '@/utils/remove-typename';
import YesNoDialog from '@/components/YesNoDialog';

type SetsListProps = {
    onSelectSet?: (setId: string) => void;
    disableActions?: boolean;
}

const SetsList: React.FC<SetsListProps> = ({ onSelectSet }) => {

    const { exercise } = useExercise();
    const { workoutId } = useWorkout();
    const [selectedSetId, setSelectedSetId] = useState<string | null>(null);

    const setFormModalRef = useRef<SetFormModal>(null);
    const yesNoDialogRef = useRef<YesNoDialog>(null);

    const { deleteSetFromExercise } = useDeleteSetFromExercise(workoutId);
    const { addSetToExercise } = useAddSetToExercise(workoutId);

    const handleSetPressed = (setId: string) => {
        setSelectedSetId(setId);
        onSelectSet?.(setId);
    }

    const handleDeleteSet = (setId: string) => {
        yesNoDialogRef.current?.open(async () => {
            await deleteSetFromExercise(exercise.id, setId)
        })
    }

    if (exercise.__typename !== "StrengthExercise") {
        return null;
    }

    return (
        <View style={Styles.container}>
            <View>
                <View style={Styles.header}>
                    <View style={[{ flex: 0.1 }]}>
                        <Text style={Styles.thText} center>#</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 4 }]}>
                        <Text style={Styles.thText} center >חזרות</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 4 }]}>
                        <Text style={Styles.thText} center>משקל</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 4 }]}>
                        <Text style={Styles.thText} center>מנוחה</Text>
                    </View>
                    <View style={{ flex: 0.9 / 4 }} />
                </View>
                <FlatList
                    removeClippedSubviews
                    data={exercise.sets}
                    style={{ maxHeight: 310 }}
                    persistentScrollbar
                    keyExtractor={(item) => item?.id!}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => handleSetPressed(item?.id!)} style={[Styles.tr, selectedSetId === item?.id && Styles.selectedTr]}>
                            <View style={{ flex: 0.1 }}>
                                <Text center>{index + 1}</Text>
                            </View>
                            <View style={{ flex: 0.9 / 4 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.reps)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 4 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.weight)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 4 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.rest)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 4, flexDirection: 'row', gap: theme.spacing.xs }}>
                                <TouchableOpacity style={{ padding: 8, backgroundColor: theme.colors.primary, borderRadius: 8 }} onPress={() => setFormModalRef.current?.open(item?.id)}>
                                    <Ionicons color="white" name="pencil-sharp" size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 8, backgroundColor: theme.colors.error, borderRadius: 8 }} onPress={() => handleDeleteSet(item?.id!)}>
                                    <Ionicons color="white" name="trash" size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 8, backgroundColor: theme.colors.primary, borderRadius: 8 }} onPress={() => addSetToExercise(exercise.id, removeTypename({
                                    rest: item?.rest,
                                    reps: item?.reps,
                                    weight: item?.weight,
                                    dropsets: item?.dropsets,
                                }))}>
                                    <Ionicons color="white" name="copy" size={20} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}

                    ListEmptyComponent={
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: theme.spacing.lg, gap: theme.spacing.sm }}>
                            <Text>אין סטים להצגה</Text>
                            <Button onPress={() => setFormModalRef.current?.open()}>צור סט חדש</Button>
                        </View>
                    }
                />
            </View>
            <SetFormModal ref={setFormModalRef} />
            <YesNoDialog ref={yesNoDialogRef} title='מחיקת סט' />
        </View>
    )

}

const Styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row', backgroundColor: theme.colors.secondary, paddingVertical: theme.spacing.sm, borderRadius: 12
    },
    thText: {
        color: theme.colors.background
    },
    tr: {
        flexDirection: 'row', paddingVertical: theme.spacing.sm, alignItems: 'center'
    },
    tdText: {

    },
    selectedTr: {
        backgroundColor: theme.colors.warning
    }
})

export default SetsList;