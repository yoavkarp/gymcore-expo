import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import YesNoDialog from "@/components/YesNoDialog";
import { useWorkout } from "@/features/workout";
import { useDeleteExerciseFromWorkout } from "@/features/workout/hooks/api/useDeleteExerciseFromWorkout";
import { StrengthExercise } from "@/graphql";
import { theme } from "@/theme";
import { parameterToString } from "@/utils/parameter-to-string";
import { router } from "expo-router";
import { useRef } from "react";
import { FlatList, StyleSheet } from "react-native";

interface StrengthExerciseSectionProps {
    exercise: StrengthExercise
}

const StrengthExerciseSection: React.FC<StrengthExerciseSectionProps> = ({ exercise }) => {


    return (
        <Section>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: theme.spacing.sm }}>
                <Text h1>{exercise.name}</Text>
            </View>
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
                        <View style={[{ flex: 0.9 / 4 }]}>
                            <Text style={Styles.thText} center>דרופ סטים</Text>
                        </View>
                    </View>
                    <FlatList
                        style={{ height: 165 }}
                        removeClippedSubviews
                        data={exercise.sets}
                        keyExtractor={(item) => item?.id!}
                        renderItem={({ item, index }) => (
                            <View style={[Styles.tr]}>
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
                                <View style={{ flex: 0.9 / 4 }}>
                                    <Text>#TODO:SETDROPSET</Text>
                                </View>
                            </View>
                        )}

                        ListEmptyComponent={
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: theme.spacing.lg, gap: theme.spacing.sm }}>
                                <Text>אין סטים להצגה</Text>
                            </View>
                        }
                    />
                </View>
            </View>
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

export default StrengthExerciseSection;