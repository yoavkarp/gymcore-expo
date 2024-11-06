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
import { useAddIntervalToExercise } from '@/features/workout/hooks/api/useAddIntervalToExercise';
import { removeTypename } from '@/utils/remove-typename';

type IntervalsListProps = {
    onSelectInterval?: (setId: string) => void;
    intervalFormModalRef: React.RefObject<IntervalFormModal>
}

const IntervalsList: React.FC<IntervalsListProps> = ({ onSelectInterval, intervalFormModalRef }) => {

    const { workoutId } = useWorkout();
    const { exercise } = useExercise();

    const { deleteIntervalFromExercise } = useDeleteIntervalFromExercise(workoutId);

    const { addIntervalToExercise } = useAddIntervalToExercise(workoutId);

    if (exercise.__typename !== "CardioExercise") {
        return null;
    }

    return (
        <View style={Styles.container}>
            <View>
                <View style={Styles.header}>
                    <View style={[{ flex: 0.05 }]}>
                        <Text style={Styles.thText} center>#</Text>
                    </View>
                    <View style={[{ flex: 0.95 / 9 }]}>
                        <Text style={Styles.thText} center >מרחק</Text>
                    </View>
                    <View style={[{ flex: 0.95 / 9 }]}>
                        <Text style={Styles.thText} center>משך</Text>
                    </View>
                    <View style={[{ flex: 0.95 / 9 }]}>
                        <Text style={Styles.thText} center>קצב</Text>
                    </View>
                    <View style={[{ flex: 0.95 / 9 }]}>
                        <Text style={Styles.thText} center>עצימות</Text>
                    </View>
                    <View style={[{ flex: 0.95 / 9 }]}>
                        <Text style={Styles.thText} center>דופק מטרה</Text>
                    </View>
                    <View style={[{ flex: 0.95 / 9 }]}>
                        <Text style={Styles.thText} center>שיפוע</Text>
                    </View>
                    <View style={[{ flex: 0.95 / 9 }]}>
                        <Text style={Styles.thText} center>התנגדות</Text>
                    </View>
                    <View style={[{ flex: 0.95 / 9 }]}>
                        <Text style={Styles.thText} center>מנוחה</Text>
                    </View>
                    <View style={{ flex: 0.12 }} />
                </View>
                <FlatList
                    removeClippedSubviews
                    data={exercise.intervals}
                    style={{ maxHeight: 340 }}
                    keyExtractor={(item) => item?.id!}
                    renderItem={({ item, index }) => (
                        <View style={[Styles.tr]}>
                            <View style={{ flex: 0.05 }}>
                                <Text center>{index + 1}</Text>
                            </View>
                            <View style={{ flex: 0.95 / 9 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.distance)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.95 / 9 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.duration)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.95 / 9 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.tempo)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.95 / 9 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.intensity)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.95 / 9 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.target_heart_rate)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.95 / 9 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.resistance)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.95 / 9 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.angle)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.95 / 9 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.rest)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.12, flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'center' }}>
                                <TouchableOpacity style={{ padding: 8, backgroundColor: theme.colors.primary, borderRadius: 8 }} onPress={() => intervalFormModalRef.current?.open(item?.id)}>
                                    <Ionicons color={'white'} name="pencil-sharp" size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 8, backgroundColor: theme.colors.error, borderRadius: 8 }} onPress={() => deleteIntervalFromExercise(exercise.id, item?.id!)}>
                                    <Ionicons color="white" name="trash" size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 8, backgroundColor: theme.colors.primary, borderRadius: 8 }} onPress={() => addIntervalToExercise(exercise.id, removeTypename({
                                    intensity: item?.intensity,
                                    distance: item?.distance,
                                    duration: item?.duration,
                                    tempo: item?.tempo,
                                    target_heart_rate: item?.target_heart_rate,
                                    resistance: item?.resistance,
                                    angle: item?.angle,
                                    rest: item?.rest,
                                }))}>
                                    <Ionicons color="white" name="copy" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
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