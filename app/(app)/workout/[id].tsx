import WorkoutProvider from "@/features/workout/components/WorkoutProvider";
import WorkoutScreen from "@/pages/auth/workout";
import { useLocalSearchParams } from "expo-router";

export default function Index() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <WorkoutProvider workoutId={id}>
            <WorkoutScreen />
        </WorkoutProvider>
    )
}