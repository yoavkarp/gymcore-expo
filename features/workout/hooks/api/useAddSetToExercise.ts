import { SetInput, AddSetToExerciseMutation, AddSetToExerciseMutationVariables, useAddSetToExerciseMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useAddSetToExercise(workoutId: string, options?: MutationHookOptions<AddSetToExerciseMutation, AddSetToExerciseMutationVariables>) {
    const [addSetToExercise, result] = useAddSetToExerciseMutation({
        ...options,
        async update(cache, { data }, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Workout", id: workoutId }),
                fields: {
                    exercises() {
                        return data?.addSetToExercise?.exercises
                    },
                    updated_at() {
                        return data?.addSetToExercise?.updated_at
                    }
                }
            })
            await options?.update?.(cache, { data }, opts)
        }
    });

    return {
        addSetToExercise: (exerciseId: string, args: SetInput) => {
            return addSetToExercise({ variables: { workoutId, exerciseId, input: args } });
        },
        result
    }
}
