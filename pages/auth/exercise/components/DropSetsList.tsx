import { theme } from '@/theme';
import React, { useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import { useExercise } from './ExerciseProvider';
import Text from '@/components/ui/Text';
import { StrengthExercise, StrengthExerciseDropSet } from '@/graphql'
import { parameterToString } from '@/utils/parameter-to-string';
import Button from '@/components/ui/Button';
import TouchableOpacity from '@/components/ui/TouchableOpacity';
import DropSetFormModal from './DropsetFormModal';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUpdateSetInExercise } from '@/features/workout/hooks/api/useUpdateSetInExercise';
import { useWorkout } from '@/features/workout';
import { removeTypename } from '@/utils/remove-typename';
import YesNoDialog from '@/components/YesNoDialog';

type DropsetsListProps = {
    onSelectDropset?: (dropsetId: string) => void;
    dropsets?: StrengthExerciseDropSet[]
    setId: string;
}

const DropsetsList: React.FC<DropsetsListProps> = ({ onSelectDropset, dropsets = [], setId }) => {

    const { workoutId } = useWorkout();
    const { exercise: _exercise } = useExercise();
    const exercise = _exercise as StrengthExercise;
    const [selectedDropsetId, setSelectedDropsetId] = useState<string | null>(null);

    const set = exercise.sets?.find((set) => set?.id === setId);

    const dropsetFormModalRef = useRef<DropSetFormModal>(null);
    const yesNoDialogRef = useRef<YesNoDialog>(null);
    const { updateSetInExercise } = useUpdateSetInExercise(workoutId)

    const handleDropsetPressed = (setId: string) => {
        setSelectedDropsetId(setId);
        onSelectDropset?.(setId);
    }

    const handleDeleteDropset = (dropsetId: string) => {
        yesNoDialogRef.current?.open(async () => {
            const ds = dropsets.find((ds) => ds.id === dropsetId);
            await updateSetInExercise(exercise.id, setId, removeTypename({
                ...set,
                id: undefined,
                dropsets: dropsets.filter((dropsets) => dropsets.id !== dropsetId)
            }))
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
                    <View style={[{ flex: 0.9 / 3 }]}>
                        <Text style={Styles.thText} center >חזרות</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 3 }]}>
                        <Text style={Styles.thText} center>משקל</Text>
                    </View>
                    <View style={{ flex: 0.9 / 3 }} />
                </View>
                <FlatList
                    removeClippedSubviews
                    data={dropsets}
                    keyExtractor={(item) => item?.id!}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => handleDropsetPressed(item?.id!)} style={[Styles.tr, selectedDropsetId === item?.id && Styles.selectedTr]}>
                            <View style={{ flex: 0.1 }}>
                                <Text center>{index + 1}</Text>
                            </View>
                            <View style={{ flex: 0.9 / 3 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.reps)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 3 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.weight)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 3, flexDirection: 'row', gap: theme.spacing.sm }}>
                                <Button onPress={() => dropsetFormModalRef.current?.open(setId, item.id)}>
                                    <Ionicons name="pencil-sharp" size={20} />
                                </Button>
                                <Button error onPress={() => handleDeleteDropset(item.id)}>
                                    <Ionicons name="trash" size={20} />
                                </Button>
                            </View>
                        </TouchableOpacity>
                    )}

                    ListEmptyComponent={
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: theme.spacing.lg, gap: theme.spacing.sm }}>
                            <Text>אין דרופ סטים להצגה</Text>
                            <Button onPress={() => dropsetFormModalRef.current?.open(setId)}>צור דרופסט חדש</Button>
                        </View>
                    }
                />
            </View>
            <YesNoDialog ref={yesNoDialogRef} />
            <DropSetFormModal ref={dropsetFormModalRef} />
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
        flexDirection: 'row', paddingVertical: theme.spacing.sm
    },
    tdText: {

    },
    selectedTr: {
        backgroundColor: theme.colors.warning
    }
})

export default DropsetsList;