import LoadingIndicator from "@/components/ui/LoadingIndicator";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useGetMemberByIdQuery } from "@/graphql";
import MemberDetailsCard from "./components/MemberDetailsCard";
import MemberMeasurementsCard from "./components/MemberMeasurementsCard";
import MemberPlanSection from "./components/MemberPlanSection";
import MemberProfileWorkoutsSection from "./components/MemberProfileWorkoutsSection";
import TouchableOpacity from "@/components/ui/TouchableOpacity";
import { useEffect, useState } from "react";
import { theme } from "@/theme";
import { StyleSheet } from "react-native";
import Section from "@/components/ui/Section";

interface MemberPageProps {
    memberId: string
}

const MemberPage: React.FC<MemberPageProps> = ({ memberId }) => {
    const query = useGetMemberByIdQuery({ variables: { id: memberId }, fetchPolicy: "network-only" })
    const [selectedTab, setSelectedTab] = useState<'workouts' | 'plans'>('workouts')

    useEffect(() => {
        if (!query.data?.getMemberById) return;

        if ((query.data?.getMemberById?.plans?.items?.length || 0) > 0) {
            setSelectedTab("plans")
        }
        else {
            setSelectedTab("workouts")
        }
    }, [query.data])

    if (query.loading) {
        return <LoadingIndicator />
    }

    if (query.error) {
        return <Text error>{query.error.message}</Text>
    }

    if (!query.data?.getMemberById) {
        return <Text error>Data not found</Text>
    }

    return (
        <View style={{ padding: 10, gap: 10, flex: 1 }}>
            <MemberDetailsCard member={query.data!.getMemberById} />
            <MemberMeasurementsCard memberId={memberId} measurement={query.data.getMemberById.measurement} />
            <View id="Tabs" style={{ flexDirection: 'row', gap: theme.spacing.md }}>
                <TouchableOpacity
                    onPress={() => setSelectedTab('workouts')}
                    style={[Styles.tab, selectedTab === 'workouts' && Styles.selectedTab]}>
                    <Text style={selectedTab === 'workouts' && Styles.selectedTabText}>אימוני פרופיל</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedTab('plans')}
                    style={[Styles.tab, selectedTab === 'plans' && Styles.selectedTab]}>
                    <Text style={selectedTab === 'plans' && Styles.selectedTabText} >תכניות</Text>
                </TouchableOpacity>
            </View>
            <Section>
                {selectedTab === 'workouts' ? <MemberProfileWorkoutsSection memberId={memberId} /> : <MemberPlanSection memberId={memberId} />}
            </Section>
        </View>
    );
}

const Styles = StyleSheet.create({
    tab: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: 8
    },
    selectedTab: {
        backgroundColor: theme.colors.primary
    },
    selectedTabText: {
        color: theme.colors.white
    }
})

export default MemberPage;