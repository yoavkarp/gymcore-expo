import { Exercise } from "@/graphql";
import { createContext, PropsWithChildren } from "react";
import { useContext } from "react";


type ExerciseContextType = {
    exercise: Exercise;
}
const ExerciseContext = createContext<ExerciseContextType | null>(null);

ExerciseContext.displayName = "ExerciseContext";

type ExerciseProviderProps = {
    exercise: Exercise;
}

export function ExerciseProvider({ children, exercise }: PropsWithChildren<ExerciseProviderProps>) {

    return (
        <ExerciseContext.Provider value={{
            exercise
        }}>
            {children}
        </ExerciseContext.Provider>
    )
};

export function useExercise() {
    const value = useContext(ExerciseContext);
    if (!value) {
        throw new Error('useExercise must be wrapped in a <ExerciseProvider />');
    }
    return value;
}


export default ExerciseProvider