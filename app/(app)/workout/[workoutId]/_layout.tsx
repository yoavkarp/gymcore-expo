import WorkoutProvider from "@/features/workout/components/WorkoutProvider";
import { Slot, useLocalSearchParams } from "expo-router";

export default function Index() {
    const { workoutId } = useLocalSearchParams<{ workoutId: string }>();

    return (
        <WorkoutProvider workoutId={workoutId}>
            <Slot />
        </WorkoutProvider>
    )
}