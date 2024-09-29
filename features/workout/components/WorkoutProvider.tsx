import { createContext, PropsWithChildren, useEffect } from "react";
import { useContext } from "react";
import { Exact, GetWorkoutByIdQuery, Scalars, useGetWorkoutByIdLazyQuery, Workout } from "@/graphql";
import { QueryResult } from "@apollo/client";


type WorkoutContextValue = {
    query: QueryResult<GetWorkoutByIdQuery, Exact<{
        workoutId: Scalars["ID"]["input"];
    }>>;
    workout?: Workout | null;
    workoutId: string;
};

const WorkoutContext = createContext<WorkoutContextValue | null>(null);

WorkoutContext.displayName = "WorkoutContext";

type WorkoutProviderProps = {
    workoutId: string;
}

export function WorkoutProvider({ children, workoutId }: PropsWithChildren<WorkoutProviderProps>) {

    const [getWorkoutById, result] = useGetWorkoutByIdLazyQuery({
        fetchPolicy: "network-only"
    });

    useEffect(() => {
        getWorkoutById({ variables: { workoutId } });
    }, [workoutId])

    return (
        <WorkoutContext.Provider value={{
            query: result,
            workout: result.data?.getWorkoutById,
            workoutId
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