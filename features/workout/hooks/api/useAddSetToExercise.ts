import { useClub } from "@/features/club";
import { SetInput, AddSetToExerciseMutation, AddSetToExerciseMutationVariables, useAddSetToExerciseMutation, GetWorkoutByIdQuery, GetWorkoutByIdDocument, GetWorkoutByIdQueryVariables } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useAddSetToExercise(workoutId: string, options?: MutationHookOptions<AddSetToExerciseMutation, AddSetToExerciseMutationVariables>) {
    const { currentTrainer } = useClub()

    const [addSetToExercise, result] = useAddSetToExerciseMutation({
        ...options,
        async update(cache, { data }, opts) {
            const existingItems = cache.readQuery<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>({
                query: GetWorkoutByIdDocument,
                variables: {
                    workoutId
                }
            });

            if (existingItems?.getWorkoutById)
                cache.writeQuery<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>({
                    query: GetWorkoutByIdDocument,
                    variables: {
                        workoutId
                    },
                    data: {
                        getWorkoutById: {
                            ...existingItems?.getWorkoutById!,
                            ...data?.addSetToExercise
                        }
                    }
                });
        }
    });

    return {
        addSetToExercise: (exerciseId: string, args: SetInput) => {
            return addSetToExercise({ variables: { workoutId, exerciseId, input: args, trainerId: currentTrainer?.id! } });
        },
        result
    }
}
