import { usePlan } from "@/features/plan/components/PlanProvider";
import PlanPage from "./page";
import Text from "@/components/ui/Text";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

const Index = () => {
    const { query } = usePlan();

    if (query.loading) {
        return <LoadingIndicator />
    }

    if (query.error) {
        return <Text error>{query.error.message}</Text>
    }

    if (!query.data?.getPlanById) {
        return <Text error>Data not found</Text>
    }

    return <PlanPage />
}

export default Index;