import CreateWorkoutModal from "@/components/CreateWorkoutModal/CreateWorkoutModal";
import Button from "@/components/ui/Button";
import ImportFromLibraryModal from "@/components/ui/ImportFromLibraryModal";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import YesNoDialog from "@/components/YesNoDialog";
import { useClub } from "@/features/club";
import { usePlan } from "@/features/plan/components/PlanProvider";
import { useDeleteWorkoutMutation, useImportWorkoutFromLibraryMutation } from "@/graphql";
import { theme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

const WorkoutsTab = () => {

    const { plan } = usePlan();
    const { currentTrainer } = useClub();

    const createWorkoutModalRef = useRef<CreateWorkoutModal>(null);
    const yesNoDialogRef = useRef<YesNoDialog>(null);
    const importFromLibraryModalRef = useRef<ImportFromLibraryModal>(null);


    const [deleteWorkout] = useDeleteWorkoutMutation({
        update(cache, result, { variables }) {
            cache.evict({
                id: cache.identify({ id: variables?.workoutId, __typename: "Workout" })
            })
        }
    })

    const [importWorkoutFromLibrary] = useImportWorkoutFromLibraryMutation({
        update(cache, result, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Plan", id: opts.variables?.input.planId }),
                fields: {
                    workouts(exists, { toReference }) {
                        return {
                            ...exists,
                            items: [toReference(result.data?.importWorkoutFromLibrary!), ...(exists?.items || [])]
                        }
                    }
                }
            })
        }
    });



    return (
        <Section>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: theme.spacing.sm }}>
                <Text h1>אימונים בתכנית</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                    <Button onPress={() => createWorkoutModalRef.current?.open()}>אימון חדש</Button>
                    <Button onPress={() => importFromLibraryModalRef.current?.open((workoutId) => importWorkoutFromLibrary({ variables: { workoutId: workoutId, trainerId: currentTrainer?.id!, input: { planId: plan?.id } } }))}>ייבוא מהספרייה</Button>
                </View>
            </View>
            <View style={Styles.header}>
                <View style={[{ flex: 1 / 3 }]}>
                    <Text style={Styles.thText} center>שם האימון</Text>
                </View>
                <View style={[{ flex: 1 / 3 }]}>
                    <Text style={Styles.thText} center>עודכן לאחרונה</Text>
                </View>
                <View style={{ flex: 1 / 3 }} />
            </View>
            <FlatList
                style={{ height: 460 }}
                removeClippedSubviews
                data={plan?.workouts?.items}
                keyExtractor={(item) => item?.id!}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/workout/${item.id}`)} style={[Styles.tr]}>
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
                        <View style={{ flex: 1 / 3, flexDirection: 'row', gap: theme.spacing.sm }}>
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
            <CreateWorkoutModal ref={createWorkoutModalRef} planId={plan?.id} />
            <YesNoDialog ref={yesNoDialogRef} />
            <ImportFromLibraryModal ref={importFromLibraryModalRef} />
        </Section>
    )
}

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

export default WorkoutsTab;