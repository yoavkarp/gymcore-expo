import { CreateWorkoutMutation, CreateWorkoutMutationVariables, useCreateWorkoutMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useCreateWorkout(options?: MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) {
    const [createWorkout, result] = useCreateWorkoutMutation({
        ...options,
        async update(cache, { data }, opts) {
            if (data?.createWorkout?.memberId) {
                cache.modify({
                    id: cache.identify({ __typename: "Member", id: data.createWorkout.memberId }),
                    fields: {
                        profile_workouts(existingWorkouts = []) {
                            return [...existingWorkouts, data.createWorkout]
                        }
                    }
                })
            }

            await options?.update?.(cache, { data }, opts);
        },

    });

    return {
        createWorkout: (options?: MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) => {
            return createWorkout(options);
        },
        result
    }

}
