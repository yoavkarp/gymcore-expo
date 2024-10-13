import { useClub } from "@/features/club";
import { IntervalInput, AddIntervalToExerciseMutation, AddIntervalToExerciseMutationVariables, useAddIntervalToExerciseMutation, GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables, GetWorkoutByIdDocument } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useAddIntervalToExercise(workoutId: string, options?: MutationHookOptions<AddIntervalToExerciseMutation, AddIntervalToExerciseMutationVariables>) {
    const { currentTrainer } = useClub()
    const [addIntervalToExercise, result] = useAddIntervalToExerciseMutation({
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
                            ...data?.addIntervalToExercise
                        }
                    }
                });
        }
    });

    return {
        addIntervalToExercise: (exerciseId: string, args: IntervalInput) => {
            return addIntervalToExercise({ variables: { workoutId, exerciseId, input: args, trainerId: currentTrainer?.id! } });
        },
        result
    }
}
