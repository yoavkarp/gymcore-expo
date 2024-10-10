import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import YesNoDialog from "@/components/YesNoDialog";
import { useWorkout } from "@/features/workout";
import { useDeleteExerciseFromWorkout } from "@/features/workout/hooks/api/useDeleteExerciseFromWorkout";
import { CardioExercise } from "@/graphql";
import { theme } from "@/theme";
import { parameterToString } from "@/utils/parameter-to-string";
import { router } from "expo-router";
import { useRef } from "react";
import { FlatList, StyleSheet } from "react-native";

interface CardioExerciseSectionProps {
    exercise: CardioExercise
}

const CardioExerciseSection: React.FC<CardioExerciseSectionProps> = ({ exercise }) => {
    const { workoutId } = useWorkout()


    const deleteModalRef = useRef<YesNoDialog>(null);
    const { deleteExerciseFromWorkout } = useDeleteExerciseFromWorkout(workoutId)

    return (
        <Section>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: theme.spacing.sm }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                    <Text h1>{exercise.name}</Text>
                    {exercise.notes ? <Text subtitle>{exercise.notes}</Text> : null}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                    <Button error onPress={() => deleteModalRef.current?.open(() => deleteExerciseFromWorkout(exercise.id))}>מחיקה</Button>
                    <Button onPress={() => router.push(`/workout/${workoutId}/${exercise.id}`)}>עריכה</Button>
                </View>
            </View>
            <View>
                <View style={Styles.header}>
                    <View style={[{ flex: 0.1 }]}>
                        <Text style={Styles.thText} center>#</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 7 }]}>
                        <Text style={Styles.thText} center >מרחק</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 7 }]}>
                        <Text style={Styles.thText} center>משך</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 7 }]}>
                        <Text style={Styles.thText} center>קצב</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 7 }]}>
                        <Text style={Styles.thText} center>עצימות</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 7 }]}>
                        <Text style={Styles.thText} center>שיפוע</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 7 }]}>
                        <Text style={Styles.thText} center>התנגדות</Text>
                    </View>
                    <View style={[{ flex: 0.9 / 7 }]}>
                        <Text style={Styles.thText} center>מנוחה</Text>
                    </View>
                </View>
                <FlatList
                    removeClippedSubviews
                    data={exercise.intervals}
                    keyExtractor={(item) => item?.id!}
                    renderItem={({ item, index }) => (
                        <View style={[Styles.tr]}>
                            <View style={{ flex: 0.1 }}>
                                <Text center>{index + 1}</Text>
                            </View>
                            <View style={{ flex: 0.9 / 7 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.distance)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 7 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.duration)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 7 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.tempo)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 7 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.intensity)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 7 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.resistance)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 7 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.angle)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.9 / 7 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.rest)}
                                </Text>
                            </View>
                        </View>
                    )}

                    ListEmptyComponent={
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: theme.spacing.lg, gap: theme.spacing.sm }}>
                            <Text>אין אינטרוולים להצגה</Text>
                        </View>
                    }
                />
            </View>
            <YesNoDialog ref={deleteModalRef} />
        </Section>
    );
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

export default CardioExerciseSection;