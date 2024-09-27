import { createContext, PropsWithChildren, useEffect } from "react";
import { useContext } from "react";
import { AddExerciseToWorkoutInput, AddExerciseToWorkoutMutation, Exact, GetWorkoutByIdLazyQueryHookResult, GetWorkoutByIdQuery, Scalars, UpdateWorkoutMutation, useGetWorkoutByIdLazyQuery, Workout } from "@/graphql";
import { FetchResult, QueryResult } from "@apollo/client";
import { UseFormReturn } from "react-hook-form";
import { CreateWorkoutFormInput } from "../../../components/CreateWorkoutModal/hooks/useCreateWorkoutForm";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import Text from "@/components/ui/Text";
import { useWorkoutActions } from "../hooks/useWorkoutActions";


type WorkoutContextValue = {
    query: QueryResult<GetWorkoutByIdQuery, Exact<{
        workoutId: Scalars["ID"]["input"];
    }>>;
    workout?: Workout | null;

    updateWorkout: (input: CreateWorkoutFormInput) => Promise<FetchResult<UpdateWorkoutMutation>>;
    addExerciseToWorkout: (input: AddExerciseToWorkoutInput) => Promise<FetchResult<AddExerciseToWorkoutMutation>>;
};

const WorkoutContext = createContext<WorkoutContextValue | null>(null);

WorkoutContext.displayName = "WorkoutContext";

type WorkoutProviderProps = {
    workoutId: string;
}

export function WorkoutProvider({ children, workoutId }: PropsWithChildren<WorkoutProviderProps>) {

    const actions = useWorkoutActions(workoutId);

    useEffect(() => {
        actions.getWorkout()
    }, [workoutId])

    return (
        <WorkoutContext.Provider value={{
            query: actions.getWorkoutResult,
            workout: actions.getWorkoutResult.data?.getWorkoutById,
            updateWorkout: (input) => {
                return actions.updateWorkout(input)
            },
            addExerciseToWorkout: (input) => {
                return actions.addExerciseToWorkout(input)
            },
        }}>
            {children}
        </WorkoutContext.Provider>
    )
};

export function useWorkout() {
    const value = useContext(WorkoutContext);
    if (!value) {
        throw new Error("useWorkout must be used within a WorkoutProvider");
    }
    return value;
}


export default WorkoutProvider