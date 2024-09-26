import { createContext, PropsWithChildren, useEffect } from "react";
import { useContext } from "react";
import { Exact, GetWorkoutByIdQuery, Scalars, useGetWorkoutByIdLazyQuery, Workout } from "@/graphql";
import { QueryResult } from "@apollo/client";
import { UseFormReturn } from "react-hook-form";
import { CreateWorkoutFormInput } from "../hooks/useCreateWorkoutForm";


type WorkoutContextValue = QueryResult<GetWorkoutByIdQuery, Exact<{
    workoutId: Scalars["ID"]["input"];
}>>

const WorkoutContext = createContext<WorkoutContextValue | null>(null);

WorkoutContext.displayName = "WorkoutContext";

type WorkoutProviderProps = {
    workoutId: string;
}

export function WorkoutProvider({ children, workoutId }: PropsWithChildren<WorkoutProviderProps>) {

    const [getWorkoutById, getWorkoutByIdQueryResult] = useGetWorkoutByIdLazyQuery();
    const workout = getWorkoutByIdQueryResult.data?.getWorkoutById!;

    const A: CreateWorkoutFormInput = {
        name: workout.name,
        exercises: workout.exercises
    };

    useEffect(() => {
        getWorkoutById({ variables: { workoutId } });
    }, [workoutId])

    return (
        <WorkoutContext.Provider value={getWorkoutByIdQueryResult}>
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