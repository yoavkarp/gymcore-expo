import { UpdateWorkoutInput, UpdateWorkoutMutation, AddExerciseToWorkoutMutation, UpdateWorkoutMutationVariables, useAddExerciseToWorkoutMutation, useGetWorkoutByIdLazyQuery, useGetWorkoutByIdQuery, useUpdateWorkoutMutation, AddExerciseToWorkoutMutationVariables, AddExerciseToWorkoutInput } from "@/graphql"
import { MutationHookOptions } from "@apollo/client";

function useGetWorkoutById(workoutId: string, options?: MutationHookOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>) {
    const [getWorkoutById, result] = useGetWorkoutByIdLazyQuery();

    return {
        getWorkout: () => {
            return getWorkoutById({ variables: { workoutId } });
        },
        result
    }
}


function useUpdateWorkout(workoutId: string, options?: MutationHookOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>) {
    const [updateWorkout, result] = useUpdateWorkoutMutation({
        update(cache, { data }) {
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
        }
    });

    return {
        updateWorkout: (args: UpdateWorkoutInput) => {
            return updateWorkout({ variables: { id: workoutId, input: args } });
        },
        result
    }
}

function useAddExerciseToWorkout(workoutId: string, options?: MutationHookOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>) {
    const [addExerciseToWorkout, result] = useAddExerciseToWorkoutMutation({
        update(cache, { data }) {
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
        }
    });

    return {
        addExerciseToWorkout: (args: AddExerciseToWorkoutInput) => {
            return addExerciseToWorkout({ variables: { id: workoutId, input: args } });
        },
        result
    }
}

export function useWorkoutActions(workoutId: string) {
    const { updateWorkout, result: updateWorkoutResult } = useUpdateWorkout(workoutId);
    const { getWorkout, result: getWorkoutResult } = useGetWorkoutById(workoutId);
    const { addExerciseToWorkout, result: useAddExerciseToWorkoutResult } = useAddExerciseToWorkout(workoutId);

    return {
        updateWorkout,
        updateWorkoutResult,
        getWorkout,
        getWorkoutResult,
        addExerciseToWorkout,
        useAddExerciseToWorkoutResult
    }
}