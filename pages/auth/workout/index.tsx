import LoadingIndicator from "@/components/ui/LoadingIndicator";
import Text from "@/components/ui/Text";
import { useWorkout } from "@/features/workout/components/WorkoutProvider"
import WorkoutPage from "./page";

const Index = () => {
    const { query } = useWorkout();

    if (query.loading) {
        return <LoadingIndicator />
    }

    if (query.error) {
        return <Text error>{query.error.message}</Text>
    }

    if (!query.data?.getWorkoutById) {
        return <Text error>Data not found</Text>
    }

    return <WorkoutPage />
}

export default Index;