import { createContext, PropsWithChildren } from "react";
import { useContext } from "react";
import { useCreateWorkoutMutation } from "@/graphql";
import { CreateWorkoutFormInput, useCreateWorkoutForm } from "../hooks/useCreateWorkoutForm";
import { UseFormReturn } from "react-hook-form";

type CreateWorkoutContextValue = UseFormReturn<CreateWorkoutFormInput> & {
    submitForm: () => any;
};

const CreateWorkoutContext = createContext<CreateWorkoutContextValue | null>(null);

CreateWorkoutContext.displayName = "WorkoutContext";

type CreateWorkoutProviderProps = {

}

export function CreateWorkoutProvider({ children }: PropsWithChildren<CreateWorkoutProviderProps>) {

    const createWorkoutForm = useCreateWorkoutForm();
    const [createWorkout] = useCreateWorkoutMutation();
    const submitForm = createWorkoutForm.handleSubmit((data) => {
        // createWorkout({ variables: { input: data } })
    })

    return (
        <CreateWorkoutContext.Provider value={{
            ...createWorkoutForm,
            submitForm
        }}>
            {children}
        </CreateWorkoutContext.Provider>
    )
};

export function useCreateWorkout() {
    const value = useContext(CreateWorkoutContext);

    if (!value) {
        throw new Error("useWorkout must be used within a WorkoutProvider");
    }

    return value;
}


export default CreateWorkoutProvider