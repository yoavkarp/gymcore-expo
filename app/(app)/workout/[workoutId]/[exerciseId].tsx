import { useWorkout } from "@/features/workout";
import ExercisePage from "@/pages/auth/exercise";
import ExerciseProvider from "@/pages/auth/exercise/components/ExerciseProvider";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo } from "react";

export default function ExerciseId() {

    const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
    const { workout } = useWorkout();

    const exercise = useMemo(() => workout?.exercises?.find((ex) => ex.id === exerciseId), [workout, exerciseId]);

    useEffect(() => {
        if (!exercise) {
            router.back();
        }
    }, [exercise])

    if (!exercise) {
        return null;
    }

    return (
        <ExerciseProvider exercise={exercise}>
            <ExercisePage />
        </ExerciseProvider>

    )
}