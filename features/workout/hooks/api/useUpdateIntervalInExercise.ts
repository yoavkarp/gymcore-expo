import { SetInput, UpdateIntervalInExerciseMutation, UpdateIntervalInExerciseMutationVariables, useUpdateIntervalInExerciseMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useUpdateIntervalInExercise(workoutId: string, options?: MutationHookOptions<UpdateIntervalInExerciseMutation, UpdateIntervalInExerciseMutationVariables>) {
    const [updateIntervalInExercise, result] = useUpdateIntervalInExerciseMutation({
        ...options,
        async update(cache, { data }, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Workout", id: workoutId }),
                fields: {
                    exercises() {
                        return data?.updateIntervalInExercise?.exercises
                    },
                    updated_at() {
                        return data?.updateIntervalInExercise?.updated_at
                    }
                }
            })
            await options?.update?.(cache, { data }, opts)
        }
    });

    return {
        updateIntervalInExercise: (exerciseId: string, intervalId: string, args: SetInput) => {
            return updateIntervalInExercise({ variables: { workoutId, exerciseId, intervalId, input: args } });
        },
        result
    }
}
