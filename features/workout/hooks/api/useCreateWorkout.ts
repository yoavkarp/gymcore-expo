import { useClub } from "@/features/club";
import { CreateWorkoutMutation, CreateWorkoutMutationVariables, ListLibraryWorkoutsDocument, useCreateWorkoutMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useCreateWorkout(options?: MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) {
    const { currentTrainer } = useClub();
    const [createWorkout, result] = useCreateWorkoutMutation({
        ...options,
        update(cache, { data }, opts) {
            if (opts.variables?.input.memberId) {
                cache.modify({
                    id: cache.identify({ __typename: "Member", id: opts.variables?.input.memberId }),
                    fields: {
                        profile_workouts(exists) {
                            return {
                                ...exists,
                                items: [data?.createWorkout, ...(exists.items || [])]
                            }
                        }
                    }
                })
            }
            else if (opts.variables?.input.library) {
                const q = cache.read({
                    query: ListLibraryWorkoutsDocument,
                    optimistic: true
                })

                cache.writeQuery({
                    query: ListLibraryWorkoutsDocument,
                    data: {
                        listLibraryWorkouts: {
                            ...q.listLibraryWorkouts,
                            items: [data?.createWorkout, ...(q.listLibraryWorkouts.items || [])]
                        }
                    },
                })
            }
        },

    });

    return {
        createWorkout: (options?: MutationHookOptions<CreateWorkoutMutation, Omit<CreateWorkoutMutationVariables, "trainerId">>) => {
            return createWorkout({ variables: { trainerId: currentTrainer?.id!, input: options?.variables?.input! } });
        },
        result
    }

}
