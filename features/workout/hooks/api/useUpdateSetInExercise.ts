import { useClub } from "@/features/club";
import { SetInput, UpdateSetInExerciseMutation, UpdateSetInExerciseMutationVariables, useUpdateSetInExerciseMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useUpdateSetInExercise(workoutId: string, options?: MutationHookOptions<UpdateSetInExerciseMutation, UpdateSetInExerciseMutationVariables>) {
    const { currentTrainer } = useClub();

    const [updateSetInExercise, result] = useUpdateSetInExerciseMutation({
        ...options,
        async update(cache, { data }, opts) {
            const mod = cache.modify({
                id: cache.identify({ __typename: "Workout", id: workoutId }),
                fields: {
                    exercises() {
                        return data?.updateSetInExercise?.exercises
                    },
                    updated_at() {
                        return data?.updateSetInExercise?.updated_at
                    }
                }
            })

            console.log("Modified", mod)
            await options?.update?.(cache, { data }, opts)
        }
    });

    return {
        updateSetInExercise: (exerciseId: string, setId: string, args: SetInput) => {
            return updateSetInExercise({ variables: { workoutId, exerciseId, setId, input: args, trainerId: currentTrainer?.id! } });
        },
        result
    }
}
