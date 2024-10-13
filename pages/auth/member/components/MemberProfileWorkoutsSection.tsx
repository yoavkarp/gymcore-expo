import CreateWorkoutModal from "@/components/CreateWorkoutModal/CreateWorkoutModal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ImportFromLibraryModal from "@/components/ui/ImportFromLibraryModal";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import YesNoDialog from "@/components/YesNoDialog";
import { useTheme } from "@/contexts/ThemeContext";
import { useClub } from "@/features/club";
import { GetMemberByIdQuery, useDeleteWorkoutMutation, useGetMemberByIdQuery, useImportWorkoutFromLibraryMutation, Workout } from "@/graphql";
import { theme, Theme } from "@/theme";
import { parameterToString } from "@/utils/parameter-to-string";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

interface MemberProfileWorkoutsSectionProps {
    memberId: string;
}

type ProfileWorkoutResult = Exclude<Exclude<Exclude<GetMemberByIdQuery['getMemberById'], null | undefined>['profile_workouts'], null | undefined>['items'], null | undefined>[number];

const MemberProfileWorkoutItem: React.FC<{ workout: ProfileWorkoutResult }> = ({ workout }) => {
    const { theme } = useTheme();
    return (
        <Card style={{ margin: 10 }}>
            <Text style={{ textAlign: 'justify' }}>{workout.name}</Text>
            <Text subtitle>{new Date(workout.updated_at).toLocaleString()}</Text>
        </Card>
    )
}

const MemberProfileWorkoutsSection: React.FC<MemberProfileWorkoutsSectionProps> = (props) => {
    const { theme } = useTheme();
    const styles = stylesWithTheme(theme);
    const createWorkoutModalRef = useRef<CreateWorkoutModal>(null);
    const yesNoDialogRef = useRef<YesNoDialog>(null);
    const ImportFromLibraryModalRef = useRef<ImportFromLibraryModal>(null);
    const { data, loading, error } = useGetMemberByIdQuery({ variables: { id: props.memberId } });
    const { trainers } = useClub();

    const [deleteWorkout] = useDeleteWorkoutMutation({
        update(cache, result, { variables }) {
            cache.evict({
                id: cache.identify({ id: variables?.workoutId, __typename: "Workout" }),
            })
        }
    })

    const [importWorkoutFromLibrary] = useImportWorkoutFromLibraryMutation({
        update(cache, result, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Member", id: opts.variables?.input.memberId }),
                fields: {
                    profile_workouts(exists, { toReference }) {
                        return {
                            ...exists,
                            items: [toReference(result.data?.importWorkoutFromLibrary!), ...(exists.items || [])]
                        }
                    }
                }
            })
        }
    });
    const { currentTrainer } = useClub();

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: theme.spacing.sm }}>
                <Text h1>אימוני פרופיל</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                    <Button onPress={() => createWorkoutModalRef.current?.open()}>אימון חדש</Button>
                    <Button onPress={() => ImportFromLibraryModalRef.current?.open((workoutId) => importWorkoutFromLibrary({ variables: { workoutId: workoutId, trainerId: currentTrainer?.id!, input: { memberId: props.memberId } } }))}>ייבוא מהספרייה</Button>
                </View>
            </View>
            <View style={Styles.header}>
                <View style={[{ flex: 1 / 4 }]}>
                    <Text style={Styles.thText} center >שם האימון</Text>
                </View>
                <View style={[{ flex: 1 / 4 }]}>
                    <Text style={Styles.thText} center>עודכן לאחרונה</Text>
                </View>
                <View style={[{ flex: 1 / 4 }]}>
                    <Text style={Styles.thText} center>עודכן ע״י</Text>
                </View>
                <View style={{ flex: 1 / 4 }} />
            </View>
            <FlatList
                style={{ maxHeight: 250 }}
                removeClippedSubviews
                data={data?.getMemberById?.profile_workouts?.items}
                keyExtractor={(item) => item?.id!}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/workout/${item.id}`)} style={[Styles.tr]}>
                        <View style={{ flex: 1 / 4 }}>
                            <Text center style={Styles.tdText}>
                                {item.name}
                            </Text>
                        </View>
                        <View style={{ flex: 1 / 4 }}>
                            <Text center style={Styles.tdText}>
                                {new Date(item.updated_at).toLocaleString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </View>
                        <View style={{ flex: 1 / 4 }}>
                            <Text center style={Styles.tdText}>
                                {trainers.find((trainer) => trainer.id === item.trainerId)?.name || "מאמן לא קיים"}
                            </Text>
                        </View>
                        <View style={{ flex: 1 / 4, flexDirection: 'row', gap: theme.spacing.sm }}>
                            <Button error onPress={() => yesNoDialogRef.current?.open(() => deleteWorkout({ variables: { workoutId: item.id } }))}>
                                <Ionicons name="trash" size={20} />
                            </Button>
                        </View>
                    </TouchableOpacity>
                )}

                ListEmptyComponent={
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: theme.spacing.lg, gap: theme.spacing.sm }}>
                        <Text>אין אימונים להצגה</Text>
                        <Button onPress={() => createWorkoutModalRef.current?.open()}>צור אימון חדש</Button>
                    </View>
                }
            />

            <CreateWorkoutModal ref={createWorkoutModalRef} memberId={props.memberId} />
            <ImportFromLibraryModal ref={ImportFromLibraryModalRef} />
            <YesNoDialog ref={yesNoDialogRef} />
        </View>
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