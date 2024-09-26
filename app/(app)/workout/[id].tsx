import WorkoutProvider from "@/features/workout/components/WorkoutProvider"
import WorkoutPage from "@/pages/auth/workout";
import { Slot, useLocalSearchParams } from "expo-router"

type WorkoutPageParams = {
    id: string;
}

export default function Index() {
    const { id } = useLocalSearchParams<WorkoutPageParams>();

    return (
        <WorkoutProvider workoutId={id}>
            <WorkoutPage />
        </WorkoutProvider>
    )
}