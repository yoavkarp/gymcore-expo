import { useClub } from "@/features/club";
import { DeleteExerciseFromWorkoutMutation, DeleteExerciseFromWorkoutMutationVariables, useDeleteExerciseFromWorkoutMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useDeleteExerciseFromWorkout(workoutId: string, options?: MutationHookOptions<DeleteExerciseFromWorkoutMutation, DeleteExerciseFromWorkoutMutationVariables>) {
    const { currentTrainer } = useClub();
    const [deleteExerciseFromWorkout, result] = useDeleteExerciseFromWorkoutMutation({
        ...options,
        async update(cache, { data }, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Workout", id: workoutId }),
                fields: {
                    exercises(exists = []) {
                        return exists.filter((item: any) => item.id !== data?.deleteExerciseFromWorkout?.id)
                    },
                }
            })
            await options?.update?.(cache, { data }, opts)
        }
    });

    return {
        deleteExerciseFromWorkout: (exerciseId: string, options?: MutationHookOptions<DeleteExerciseFromWorkoutMutation, DeleteExerciseFromWorkoutMutationVariables>) => {
            return deleteExerciseFromWorkout({ variables: { workoutId, exerciseId, trainerId: currentTrainer?.id! }, ...options });
        },
        result
    }
}
