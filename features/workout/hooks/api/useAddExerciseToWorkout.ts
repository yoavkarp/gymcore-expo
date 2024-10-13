import { useClub } from "@/features/club";
import { AddExerciseToWorkoutInput, AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables, GetWorkoutByIdDocument, GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables, useAddExerciseToWorkoutMutation } from "@/graphql";
import { MutationHookOptions } from "@apollo/client";

export function useAddExerciseToWorkout(workoutId: string, options?: MutationHookOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>) {
    const { currentTrainer } = useClub()
    const [addExerciseToWorkout, result] = useAddExerciseToWorkoutMutation({
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
                            ...data?.addExerciseToWorkout
                        }
                    }
                });
        }
    });

    return {
        addExerciseToWorkout: (args: AddExerciseToWorkoutInput) => {
            return addExerciseToWorkout({ variables: { id: workoutId, input: args, trainerId: currentTrainer?.id! } });
        },
        result
    }
}
