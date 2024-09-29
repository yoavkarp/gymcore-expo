import { UpdateWorkoutMutation, UpdateWorkoutMutationVariables, useUpdateWorkoutMutation, UpdateWorkoutInput } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useUpdateWorkout(workoutId: string, options?: MutationHookOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>) {
    const [updateWorkout, result] = useUpdateWorkoutMutation({
        ...options,
        async update(cache, { data }, opts) {
            cache.modify({
                id: cache.identify({ __typename: "Workout", id: workoutId }),
                fields: {
                    name() {
                        return data?.updateWorkout?.name;
                    },
                    notes() {
                        return data?.updateWorkout?.notes;
                    },
                    updated_at() {
                        return data?.updateWorkout?.updated_at
                    }
                }
            })

            await options?.update?.(cache, { data }, opts);
        }
    });

    return {
        updateWorkout: (args: UpdateWorkoutInput) => {
            return updateWorkout({ variables: { id: workoutId, input: args } });
        },
        result
    }
}
