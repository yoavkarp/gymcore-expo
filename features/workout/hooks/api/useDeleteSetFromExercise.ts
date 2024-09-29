import { DeleteSetFromExerciseMutation, DeleteSetFromExerciseMutationVariables, useDeleteSetFromExerciseMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useDeleteSetFromExercise(workoutId: string, options?: MutationHookOptions<DeleteSetFromExerciseMutation, DeleteSetFromExerciseMutationVariables>) {
    const [deleteSetFromExercise, result] = useDeleteSetFromExerciseMutation({
        ...options,
        async update(cache, { data }, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Workout", id: workoutId }),
                fields: {
                    exercises() {
                        return data?.deleteSetFromExercise?.exercises
                    },
                    updated_at() {
                        return data?.deleteSetFromExercise?.updated_at
                    }
                }
            })
            await options?.update?.(cache, { data }, opts)
        }
    });

    return {
        deleteSetFromExercise: (exerciseId: string, setId: string) => {
            return deleteSetFromExercise({ variables: { workoutId, exerciseId, setId } });
        },
        result
    }
}
