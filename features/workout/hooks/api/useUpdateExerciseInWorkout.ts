import { UpdateExerciseInWorkoutInput, UpdateExerciseInWorkoutMutation, UpdateExerciseInWorkoutMutationVariables, useUpdateExerciseInWorkoutMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useUpdateExerciseInWorkout(workoutId: string, options?: MutationHookOptions<UpdateExerciseInWorkoutMutation, UpdateExerciseInWorkoutMutationVariables>) {
    const [updateExerciseInWorkout, result] = useUpdateExerciseInWorkoutMutation({
        ...options,
        async update(cache, { data }, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Workout", id: workoutId }),
                fields: {
                    exercises() {
                        return data?.updateExerciseInWorkout?.exercises
                    },
                    updated_at() {
                        return data?.updateExerciseInWorkout?.updated_at
                    }
                }
            })
            await options?.update?.(cache, { data }, opts)
        }
    });

    return {
        updateExerciseInWorkout: (exerciseId: string, args: UpdateExerciseInWorkoutInput) => {
            return updateExerciseInWorkout({ variables: { workoutId, exerciseId, input: args } });
        },
        result
    }
}
