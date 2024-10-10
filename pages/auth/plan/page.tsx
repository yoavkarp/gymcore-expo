import Section from "@/components/ui/Section";
import Text from "@/components/ui/Text";
import TouchableOpacity from "@/components/ui/TouchableOpacity";
import { View } from "@/components/ui/View";
import { usePlan } from "@/features/plan/components/PlanProvider";
import { theme } from "@/theme";
import { useState } from "react";
import { StyleSheet } from "react-native";
import MeetingsTab from "./components/MeetingsTab";
import PlanTab from "./components/PlanTab";
import WorkoutsTab from "./components/WorkoutsTab";

const PlanPage = () => {
    const { planId } = usePlan()
    const [selectedTab, setSelectedTab] = useState<'plan' | 'workouts' | 'meetings'>('plan')

    return (
        <View>
            <View id="Tabs" style={{ flexDirection: 'row', gap: theme.spacing.md, paddingBottom: theme.spacing.md }}>

                <TouchableOpacity
                    onPress={() => setSelectedTab('plan')}
                    style={[Styles.tab, selectedTab === 'plan' && Styles.selectedTab]}>
                    <Text style={selectedTab === 'plan' && Styles.selectedTabText} >תכנית</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedTab('workouts')}
                    style={[Styles.tab, selectedTab === 'workouts' && Styles.selectedTab]}>
                    <Text style={selectedTab === 'workouts' && Styles.selectedTabText}>אימונים</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedTab('meetings')}
                    style={[Styles.tab, selectedTab === 'meetings' && Styles.selectedTab]}>
                    <Text style={selectedTab === 'meetings' && Styles.selectedTabText}>מפגשים</Text>
                </TouchableOpacity>
            </View>
            <Section>
                {
                    selectedTab === 'meetings' ? <MeetingsTab /> : selectedTab === "plan" ? <PlanTab />
                        : selectedTab === "workouts" ?
                            <WorkoutsTab />
                            : null
                }
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

export default PlanPage;