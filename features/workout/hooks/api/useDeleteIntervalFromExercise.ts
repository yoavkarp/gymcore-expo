import { useClub } from "@/features/club";
import { DeleteIntervalFromExerciseMutation, DeleteIntervalFromExerciseMutationVariables, useDeleteIntervalFromExerciseMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useDeleteIntervalFromExercise(workoutId: string, options?: MutationHookOptions<DeleteIntervalFromExerciseMutation, DeleteIntervalFromExerciseMutationVariables>) {
    const { currentTrainer } = useClub();
    const [deleteIntervalFromExercise, result] = useDeleteIntervalFromExerciseMutation({
        ...options,
        async update(cache, { data }, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Workout", id: workoutId }),
                fields: {
                    exercises() {
                        return data?.deleteIntervalFromExercise?.exercises
                    },
                    updated_at() {
                        return data?.deleteIntervalFromExercise?.updated_at
                    }
                }
            })
            await options?.update?.(cache, { data }, opts)
        }
    });

    return {
        deleteIntervalFromExercise: (exerciseId: string, intervalId: string) => {
            return deleteIntervalFromExercise({ variables: { workoutId, exerciseId, intervalId, trainerId: currentTrainer?.id! } });
        },
        result
    }
}
