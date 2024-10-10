import CreatePlanModal from "@/components/CreatePlanModal/CreatePlanModal";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useTheme } from "@/contexts/ThemeContext";
import { useClub } from "@/features/club";
import { GetMemberByIdQuery, useGetMemberByIdQuery } from "@/graphql";
import { theme, Theme } from "@/theme";
import { parameterToString } from "@/utils/parameter-to-string";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

interface MemberPlansSectionProps {
    memberId: string;
}

type PlanResult = Exclude<Exclude<Exclude<GetMemberByIdQuery['getMemberById'], null | undefined>['plans'], null | undefined>['items'], null | undefined>[number];

const MemberPlanItem: React.FC<{ plan: PlanResult }> = ({ plan }) => {
    const { theme } = useTheme();
    return (
        <Card style={{ margin: 10 }}>
            <Text style={{ textAlign: 'justify' }}>{plan.id}</Text>
            <Text subtitle>{new Date(plan.updated_at).toLocaleString()}</Text>
        </Card>
    )
}

const MemberPlansSection: React.FC<MemberPlansSectionProps> = (props) => {
    const { theme } = useTheme();
    const styles = stylesWithTheme(theme);
    const createPlanModalRef = useRef<CreatePlanModal>(null);
    const { data, loading, error } = useGetMemberByIdQuery({ variables: { id: props.memberId } });
    const { trainers } = useClub();
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: theme.spacing.sm }}>
                <Text h1>תכניות</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                    <Button onPress={() => createPlanModalRef.current?.open()}>תכנית חדשה</Button>
                </View>
            </View>

            <View style={Styles.header}>
                <View style={[{ flex: 1 / 4 }]}>
                    <Text style={Styles.thText} center>מאמן</Text>
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
                removeClippedSubviews
                data={data?.getMemberById?.plans?.items}
                keyExtractor={(item) => item?.id!}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/plan/${item.id}`)} style={[Styles.tr]}>
                        <View style={{ flex: 1 / 4 }}>
                            <Text center style={Styles.tdText}>
                                {trainers.find((trainer) => trainer.id === item.trainerId)?.name || "מאמן לא קיים"}
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
                        <Button onPress={() => createPlanModalRef.current?.open()}>צור תכנית חדשה</Button>
                    </View>
                }
            />

            <CreatePlanModal ref={createPlanModalRef} memberId={props.memberId} />
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

export default MemberPlansSection;