import { createContext, PropsWithChildren, useEffect } from "react";
import { useContext } from "react";
import { Exact, GetWorkoutByIdQuery, Scalars, useGetWorkoutByIdLazyQuery, Workout } from "@/graphql";
import { QueryResult } from "@apollo/client";

type WorkoutContextValue = QueryResult<GetWorkoutByIdQuery, Exact<{
    workoutId: Scalars["ID"]["input"];
}>>


const WorkoutContext = createContext<WorkoutContextValue | null>(null);

WorkoutContext.displayName = "WorkoutContext";

type WorkoutProviderProps = {
    workoutId: string;
}

export function WorkoutProvider({ children, workoutId }: PropsWithChildren<WorkoutProviderProps>) {

    const [getWorkout, data] = useGetWorkoutByIdLazyQuery({ variables: { workoutId } });

    useEffect(() => {
        getWorkout();
    }, [workoutId])

    return (
        <WorkoutContext.Provider value={data}>
            {children}
        </WorkoutContext.Provider>
    )
};

export function useWorkout(): WorkoutContextValue {
    const value = useContext(WorkoutContext);
    if (!value) {
        throw new Error("useWorkout must be used within a WorkoutProvider");
    }
    return value;
}


export default WorkoutProvider