import { createContext, PropsWithChildren } from "react";
import { useContext } from "react";
import { ExerciseType, useCreateWorkoutMutation } from "@/graphql";
import { CreateWorkoutFormInput, useCreateWorkoutForm } from "../hooks/useCreateWorkoutForm";
import { UseFormReturn } from "react-hook-form";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { router } from "expo-router";

type CreateWorkoutContextValue = UseFormReturn<CreateWorkoutFormInput> & {
    submitForm: (trainerId: string, memberId?: string) => any;
};

const CreateWorkoutContext = createContext<CreateWorkoutContextValue | null>(null);

CreateWorkoutContext.displayName = "CreateWorkoutContext";

type CreateWorkoutProviderProps = {

}

export function CreateWorkoutProvider({ children }: PropsWithChildren<CreateWorkoutProviderProps>) {

    const createWorkoutForm = useCreateWorkoutForm();
    const [createWorkout] = useCreateWorkoutMutation();
    const [show] = useSnackbar();
    const submitForm: CreateWorkoutContextValue['submitForm'] = (trainerId, memberId) => createWorkoutForm.handleSubmit((data) => {
        return createWorkout({
            variables: {
                input: {
                    ...data,
                    memberId,
                    trainerId
                }
            },
            onCompleted: () => {
                show(data.name + " נוצר בהצלחה")
                createWorkoutForm.reset();
                router.back();
            },
            onError: (err) => {
                show("ארעה שגיאה בעת יצירת האימון", "error")
            }
        })
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