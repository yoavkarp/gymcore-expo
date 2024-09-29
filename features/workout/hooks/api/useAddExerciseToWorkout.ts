import { AddExerciseToWorkoutInput, AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables, useAddExerciseToWorkoutMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useAddExerciseToWorkout(workoutId: string, options?: MutationHookOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>) {
    const [addExerciseToWorkout, result] = useAddExerciseToWorkoutMutation({
        ...options,
        async update(cache, { data }, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Workout", id: workoutId }),
                fields: {
                    exercises() {
                        return data?.addExerciseToWorkout?.exercises
                    },
                    updated_at() {
                        return data?.addExerciseToWorkout?.updated_at
                    }
                }
            })
            await options?.update?.(cache, { data }, opts)
        }
    });

    return {
        addExerciseToWorkout: (args: AddExerciseToWorkoutInput) => {
            return addExerciseToWorkout({ variables: { id: workoutId, input: args } });
        },
        result
    }
}
