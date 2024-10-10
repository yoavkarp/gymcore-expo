import CreateWorkoutModal from "@/components/CreateWorkoutModal/CreateWorkoutModal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import YesNoDialog from "@/components/YesNoDialog";
import { useTheme } from "@/contexts/ThemeContext";
import { useClub } from "@/features/club";
import { GetMemberByIdQuery, useDeleteWorkoutMutation, useGetMemberByIdQuery, useListLibraryWorkoutsQuery, Workout } from "@/graphql";
import { theme, Theme } from "@/theme";
import { parameterToString } from "@/utils/parameter-to-string";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

type LibraryViewProps = {
    onPressWorkout: (workoutId: string) => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({ onPressWorkout }) => {
    const { theme } = useTheme();
    const styles = stylesWithTheme(theme);
    const { data, loading, error } = useListLibraryWorkoutsQuery({});
    const { trainers } = useClub();

    return (
        <Section>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: theme.spacing.sm }}>
                <Text h1>ספרייה</Text>
            </View>
            <View style={Styles.header}>
                <View style={[{ flex: 1 / 3 }]}>
                    <Text style={Styles.thText} center >שם האימון</Text>
                </View>
                <View style={[{ flex: 1 / 3 }]}>
                    <Text style={Styles.thText} center>עודכן לאחרונה</Text>
                </View>
                <View style={[{ flex: 1 / 3 }]}>
                    <Text style={Styles.thText} center>ע״י</Text>
                </View>
            </View>
            <FlatList
                style={{ maxHeight: 250 }}
                removeClippedSubviews
                data={data?.listLibraryWorkouts?.items}
                keyExtractor={(item) => item?.id!}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPressWorkout(item.id)} style={[Styles.tr]}>
                        <View style={{ flex: 1 / 3 }}>
                            <Text center style={Styles.tdText}>
                                {item.name}
                            </Text>
                        </View>
                        <View style={{ flex: 1 / 3 }}>
                            <Text center style={Styles.tdText}>
                                {new Date(item.updated_at).toLocaleString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </View>
                        <View style={{ flex: 1 / 3 }}>
                            <Text center style={Styles.tdText}>
                                {trainers.find((trainer) => trainer.id === item.trainerId)?.name || "מאמן לא קיים"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}

                ListEmptyComponent={
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: theme.spacing.lg, gap: theme.spacing.sm }}>
                        <Text>אין אימונים להצגה</Text>
                    </View>
                }
            />
        </Section>
    )
}

const stylesWithTheme = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.success,
        flex: 1,
        borderRadius: 8,
        padding: 10
    },
})

const Styles = StyleSheet.create({

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

export default LibraryView;