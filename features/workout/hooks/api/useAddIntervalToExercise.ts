import { IntervalInput, AddIntervalToExerciseMutation, AddIntervalToExerciseMutationVariables, useAddIntervalToExerciseMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useAddIntervalToExercise(workoutId: string, options?: MutationHookOptions<AddIntervalToExerciseMutation, AddIntervalToExerciseMutationVariables>) {
    const [addIntervalToExercise, result] = useAddIntervalToExerciseMutation({
        ...options,
        async update(cache, { data }, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Workout", id: workoutId }),
                fields: {
                    exercises() {
                        return data?.addIntervalToExercise?.exercises
                    },
                    updated_at() {
                        return data?.addIntervalToExercise?.updated_at
                    }
                }
            })
            await options?.update?.(cache, { data }, opts)
        }
    });

    return {
        addIntervalToExercise: (exerciseId: string, args: IntervalInput) => {
            return addIntervalToExercise({ variables: { workoutId, exerciseId, input: args } });
        },
        result
    }
}
