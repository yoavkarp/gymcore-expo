import { useClub } from "@/features/club";
import { CreateWorkoutMutation, CreateWorkoutMutationVariables, GetMemberByIdDocument, GetMemberByIdQuery, GetMemberByIdQueryVariables, GetPlanByIdDocument, ListLibraryWorkoutsDocument, useCreateWorkoutMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useCreateWorkout(options?: MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) {
    const { currentTrainer } = useClub();
    const [createWorkout, result] = useCreateWorkoutMutation({
        ...options,
        update(cache, { data }, opts) {
            if (opts.variables?.input.memberId) {
                cache.modify({
                    id: cache.identify({ id: opts.variables.input.memberId, __typename: "Member" }),
                    fields: {
                        profile_workouts(prev, { toReference }) {

                            console.log({
                                items: [toReference(data?.createWorkout!), ...prev.items],
                                nextToken: prev.nextToken
                            })
                            return {
                                items: [toReference(data?.createWorkout!), ...prev.items],
                                nextToken: prev.nextToken
                            }
                        }
                    },
                    broadcast: false
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

            if (opts.variables?.input.planId) {

                const q = cache.read({
                    query: GetPlanByIdDocument,
                    variables: { id: opts.variables?.input.planId },
                    optimistic: true
                })

                cache.writeQuery({
                    query: GetPlanByIdDocument,
                    variables: { id: opts.variables?.input.planId },
                    data: {
                        getPlanById: {
                            ...q.getPlanById,
                            workouts: {
                                items: [data?.createWorkout, ...(q.getPlanById.workouts.items || [])],
                                nextToken: q.getPlanById.workouts.nextToken
                            }
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
