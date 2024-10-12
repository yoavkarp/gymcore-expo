import Button from "@/components/ui/Button";
import ImportFromLibraryModal from "@/components/ui/ImportFromLibraryModal";
import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import YesNoDialog from "@/components/YesNoDialog";
import { usePlan } from "@/features/plan/components/PlanProvider";
import { useDeleteEventMutation } from "@/graphql";
import { theme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { FlatList, StyleSheet } from "react-native";
import CreateMeetingModal from "./CreateMeetingModal";

const MeetingsTab = () => {

    const { plan } = usePlan();
    console.log(plan);

    const yesNoDialogRef = useRef<YesNoDialog>(null);
    const importFromLibraryModalRef = useRef<ImportFromLibraryModal>(null);
    const createMeetingModalRef = useRef<CreateMeetingModal>(null);

    const [deleteMeeting] = useDeleteEventMutation({
        update(cache, result, { variables }) {
            cache.evict({
                id: cache.identify({ id: variables?.id, __typename: "Event" })
            })
        }
    })


    return (
        <Section>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: theme.spacing.sm }}>
                <Text h1>אימונים בתכנית</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                    <Button onPress={() => createMeetingModalRef.current?.open()}>מפגש חדש</Button>
                </View>
            </View>
            <View style={Styles.header}>
                <View style={[{ flex: 1 / 10 }]}>
                    <Text style={Styles.thText} center>#</Text>
                </View>
                <View style={[{ flex: 0.9 / 3 }]}>
                    <Text style={Styles.thText} center>תאריך המפגש</Text>
                </View>
                <View style={[{ flex: 0.9 / 3 }]}>
                    <Text style={Styles.thText} center>שעת המפגש</Text>
                </View>
                <View style={[{ flex: 0.9 / 3 }]} />
            </View>
            <FlatList
                style={{ maxHeight: 250 }}
                removeClippedSubviews
                data={plan?.events?.items}
                keyExtractor={(item) => item?.id!}
                renderItem={({ item, index }) => (
                    <View style={[Styles.tr]}>
                        <View style={{ flex: 1 / 10 }}>
                            <Text center style={Styles.tdText}>
                                {index + 1}
                            </Text>
                        </View>
                        <View style={{ flex: 0.9 / 3 }}>
                            <Text center style={Styles.tdText}>
                                {new Date(item.updated_at).toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' })}
                            </Text>
                        </View>
                        <View style={{ flex: 0.9 / 3 }}>
                            <Text center style={Styles.tdText}>
                                {new Date(item.updated_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </View>
                        <View style={{ flex: 0.9 / 3, flexDirection: 'row', gap: theme.spacing.sm }}>
                            <Button error onPress={() => yesNoDialogRef.current?.open(() => deleteMeeting({ variables: { id: item.id } }))}>
                                <Ionicons name="trash" size={20} />
                            </Button>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: theme.spacing.lg, gap: theme.spacing.sm }}>
                        <Text>אין מפגשים להצגה</Text>
                        <Button onPress={() => createMeetingModalRef.current?.open()}>צור מפגש חדש</Button>
                    </View>
                }
            />
            <YesNoDialog ref={yesNoDialogRef} />
            <ImportFromLibraryModal ref={importFromLibraryModalRef} />
            <CreateMeetingModal ref={createMeetingModalRef} />
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

export default MeetingsTab;