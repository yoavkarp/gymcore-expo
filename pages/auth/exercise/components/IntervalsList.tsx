import { theme } from '@/theme';
import React, { useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import { useExercise } from './ExerciseProvider';
import Text from '@/components/ui/Text';
import { parameterToString } from '@/utils/parameter-to-string';
import Button from '@/components/ui/Button';
import TouchableOpacity from '@/components/ui/TouchableOpacity';
import IntervalFormModal from './IntervalFormModal';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useWorkout } from '@/features/workout';
import { useDeleteIntervalFromExercise } from '@/features/workout/hooks/api/useDeleteIntervalFromExercise';

type IntervalsListProps = {
    onSelectInterval?: (setId: string) => void;
}

const IntervalsList: React.FC<IntervalsListProps> = ({ onSelectInterval }) => {

    const { workoutId } = useWorkout();
    const { exercise } = useExercise();
    const [selectedIntervalId, setSelectedIntervalId] = useState<string | null>(null);

    const { deleteIntervalFromExercise } = useDeleteIntervalFromExercise(workoutId);

    const intervalFormModalRef = useRef<IntervalFormModal>(null);

    const handleIntervalPressed = (setId: string) => {
        setSelectedIntervalId(setId);
        onSelectInterval?.(setId);
    }

    if (exercise.__typename !== "CardioExercise") {
        return null;
    }

    return (
        <View style={Styles.container}>
            <View>
                <View style={Styles.header}>
                    <View style={[{ flex: 0.1 }]}>
                        <Text style={Styles.thText} center>#</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 8 }]}>
                        <Text style={Styles.thText} center >מרחק</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 8 }]}>
                        <Text style={Styles.thText} center>משך</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 8 }]}>
                        <Text style={Styles.thText} center>קצב</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 8 }]}>
                        <Text style={Styles.thText} center>עצימות</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 8 }]}>
                        <Text style={Styles.thText} center>שיפוע</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 8 }]}>
                        <Text style={Styles.thText} center>התנגדות</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 8 }]}>
                        <Text style={Styles.thText} center>מנוחה</Text>
                    </View>
                    <View style={{ flex: 0.9 / 8 }} />
                </View>
                <FlatList
                    removeClippedSubviews
                    data={exercise.intervals}
                    keyExtractor={(item) => item?.id!}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => handleIntervalPressed(item?.id!)} style={[Styles.tr, selectedIntervalId === item?.id && Styles.selectedTr]}>
                            <View style={{ flex: 0.1 }}>
                                <Text center>{index + 1}</Text>
                            </View>
                            <View style={{ flex: 0.9 / 8 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.distance)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 8 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.duration)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 8 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.tempo)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 8 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.intensity)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 8 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.resistance)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 8 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.angle)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 8 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.rest)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 8, flexDirection: 'row', gap: theme.spacing.sm }}>
                                <Button onPress={() => intervalFormModalRef.current?.open(item?.id)}>
                                    <Ionicons name="pencil-sharp" size={20} />
                                </Button>
                                <Button error onPress={() => deleteIntervalFromExercise(exercise.id, item?.id!)}>
                                    <Ionicons name="trash" size={20} />
                                </Button>
                            </View>
                        </TouchableOpacity>
                    )}

                    ListEmptyComponent={
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: theme.spacing.lg, gap: theme.spacing.sm }}>
                            <Text>אין אינטרוולים להצגה</Text>
                            <Button onPress={() => intervalFormModalRef.current?.open()}>צור אינטרוול חדש</Button>
                        </View>
                    }
                />
            </View>
            <IntervalFormModal ref={intervalFormModalRef} />
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

export default IntervalsList;