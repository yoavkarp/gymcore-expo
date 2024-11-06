import CreateWorkoutModal from "@/components/CreateWorkoutModal/CreateWorkoutModal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import YesNoDialog from "@/components/YesNoDialog";
import { useTheme } from "@/contexts/ThemeContext";
import { useClub } from "@/features/club";
import { GetMemberByIdQuery, useDeleteWorkoutMutation, useGetMemberByIdQuery, useListPlansByTrainerLazyQuery, useListPlansByTrainerQuery, Workout } from "@/graphql";
import { theme, Theme } from "@/theme";
import { parameterToString } from "@/utils/parameter-to-string";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity } from "react-native";

const MemberProfileWorkoutsSection = () => {
    const { theme } = useTheme();
    const styles = stylesWithTheme(theme);
    const createWorkoutModalRef = useRef<CreateWorkoutModal>(null);
    const yesNoDialogRef = useRef<YesNoDialog>(null);
    const [listPlans, { data, loading, error }] = useListPlansByTrainerLazyQuery({ fetchPolicy: "network-only" });
    const { trainers, currentTrainer } = useClub();

    useEffect(() => {
        listPlans({ variables: { trainerId: currentTrainer?.id! } })
    }, [currentTrainer])

    const [deleteWorkout] = useDeleteWorkoutMutation({
        update(cache, result, { variables }) {
            cache.evict({
                id: cache.identify({ id: variables?.workoutId, __typename: "Workout" })
            })
        }
    })

    return (
        <Section>
            <View style={{ paddingBottom: theme.spacing.sm }}>
                <Text h1>תכניות</Text>
                <Text subtitle>מציג תכניות עבור מאמן: {currentTrainer?.name}</Text>
            </View>
            <View style={Styles.header}>
                <View style={[{ flex: 1 / 4 }]}>
                    <Text style={Styles.thText} center>שם המנוי</Text>
                </View>
                <View style={[{ flex: 1 / 4 }]}>
                    <Text style={Styles.thText} center>משך</Text>
                </View>
                <View style={[{ flex: 1 / 4 }]}>
                    <Text style={Styles.thText} center>מפגשים</Text>
                </View>
                <View style={[{ flex: 1 / 4 }]}>
                    <Text style={Styles.thText} center>עודכן לאחרונה</Text>
                </View>
            </View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => listPlans({ variables: { trainerId: currentTrainer?.id! } })}
                    />
                }
                removeClippedSubviews
                data={data?.listPlansByTrainerId?.items}
                keyExtractor={(item) => item?.id!}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/plan/${item.id}`)} style={[Styles.tr]}>
                        <View style={{ flex: 1 / 4 }}>
                            <Text center style={Styles.tdText}>
                                {item.member?.name || "מאמן לא קיים"}
                            </Text>
                        </View>

                        <View style={{ flex: 1 / 4 }}>
                            <Text center style={Styles.tdText}>
                                {item.weeks} שבועות
                            </Text>
                        </View>

                        <View style={{ flex: 1 / 4 }}>
                            <Text center style={Styles.tdText}>
                                {item.meetings} מפגשים
                            </Text>
                        </View>

                        <View style={{ flex: 1 / 4 }}>
                            <Text center style={Styles.tdText}>
                                {new Date(item.updated_at).toLocaleString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}

                ListEmptyComponent={
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: theme.spacing.lg, gap: theme.spacing.sm }}>
                        <Text>אין תכניות להצגה</Text>
                    </View>
                }

                style={{
                    maxHeight: 520,
                    height: 520
                }}
            />

            <YesNoDialog ref={yesNoDialogRef} />
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

export default MemberProfileWorkoutsSection;