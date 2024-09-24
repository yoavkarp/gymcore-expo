import { createContext, PropsWithChildren, useState } from "react";
import { useContext } from "react";
import { Workout } from "@/graphql";
import { CreateWorkoutFormInput, useCreateWorkoutForm } from "@/hooks/forms/useCreateWorkoutForm";
import { UseFormProps } from "react-hook-form";

type WorkoutContextType = {
    workout: Partial<Workout> | null;
    setWorkout: React.Dispatch<React.SetStateAction<Partial<Workout> | null>>;
    form: ReturnType<typeof useCreateWorkoutForm> | null;
}
const WorkoutContext = createContext<WorkoutContextType>({
    workout: null,
    setWorkout: () => null,
    form: null,
});

WorkoutContext.displayName = "WorkoutContext";

type WorkoutProviderProps = {
    workout?: Partial<Workout>;
}

export function WorkoutProvider({ children }: PropsWithChildren<WorkoutProviderProps>) {

    const [workout, setWorkout] = useState<Partial<Workout> | null>(null);

    const form = useCreateWorkoutForm({
        defaultValues: {

        }
    });

    return (
        <WorkoutContext.Provider value={{
            workout,
            setWorkout,
            form
        }}
        >
            {children}
        </WorkoutContext.Provider>
    )
};

export function useWorkoutForm(options?: UseFormProps<CreateWorkoutFormInput>): ReturnType<typeof useCreateWorkoutForm> {
    const { form } = useContext(WorkoutContext);

    if (process.env.NODE_ENV !== 'production') {
        if (!form) {
            throw new Error('useWorkout must be wrapped in a <WorkoutProvider />');
        }
    }
    return form!;
}


export default WorkoutProvider