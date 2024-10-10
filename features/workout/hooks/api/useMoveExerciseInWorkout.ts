import { useClub } from "@/features/club";
import { MoveExerciseInWorkoutMutation, MoveExerciseInWorkoutMutationVariables, useMoveExerciseInWorkoutMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useMoveExerciseInWorkout(workoutId: string, options?: MutationHookOptions<MoveExerciseInWorkoutMutation, MoveExerciseInWorkoutMutationVariables>) {
    const { currentTrainer } = useClub()
    const [moveExerciseInWorkout, result] = useMoveExerciseInWorkoutMutation({
        ...options,
        async update(cache, { data }, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Workout", id: workoutId }),
                fields: {
                    exercises() {
                        return data?.moveExerciseInWorkout?.exercises
                    },
                    updated_at() {
                        return data?.moveExerciseInWorkout?.updated_at
                    }
                }
            })
            await options?.update?.(cache, { data }, opts)
        }
    });

    return {
        moveExerciseInWorkout: (args: Omit<MoveExerciseInWorkoutMutationVariables, "trainerId">) => {
            return moveExerciseInWorkout({ variables: { ...args, trainerId: currentTrainer?.id! } });
        },
        result
    }
}
