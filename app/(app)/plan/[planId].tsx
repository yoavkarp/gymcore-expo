import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import PlanProvider from "@/features/plan/components/PlanProvider";
import PlanPage from "@/pages/auth/plan";
import { Slot, useLocalSearchParams } from "expo-router";

export default function Index() {
    const { planId } = useLocalSearchParams<{ planId: string }>();

    return (
        <PlanProvider planId={planId}>
            <PlanPage />
        </PlanProvider>
    )
}