import { Controller } from "react-hook-form";
import Modal from "../ui/Modal";
import Text from "../ui/Text";
import TextInput from "../ui/TextInput";
import { CreateWorkoutFormInput, useCreateWorkoutForm } from "./hooks/useCreateWorkoutForm";
import { View } from "../ui/View";
import Button from "../ui/Button";
import { forwardRef, useImperativeHandle, useState } from "react";
import { router } from "expo-router";
import { useClub } from "@/features/club";
import { useCreateWorkout } from "@/features/workout";

interface CreateWorkoutModalProps {
    memberId?: string;
    planId?: string;
}

type CreateWorkoutModal = {
    open: () => void;
    close: () => void;
}

const CreateWorkoutModal = forwardRef<CreateWorkoutModal, CreateWorkoutModalProps>(({ memberId, planId }, ref) => {

    const [visible, setIsVisible] = useState(false);
    const { control, handleSubmit } = useCreateWorkoutForm();
    const { currentTrainer } = useClub();

    const {
        createWorkout: createWorkoutMutation,
        result: { loading, error: apiError }
    } = useCreateWorkout({
        onCompleted(data) {
            if (data.createWorkout?.id)
                router.push(`/workout/${data.createWorkout.id}`)

            setIsVisible(false);
        }
    });


    useImperativeHandle(ref, () => {
        return {
            open: () => setIsVisible(true),
            close: () => setIsVisible(false)
        }
    }, [])

    const onSubmit = (data: CreateWorkoutFormInput) => {
        return createWorkoutMutation({
            variables: {
                input: {
                    name: data.name,
                    memberId,
                    trainerId: currentTrainer?.id!,
                    planId
                }
            }
        })
    }

    return (
        <Modal visible={visible} dismissable onDismiss={() => setIsVisible(false)} style={{ gap: 8 }}>
            <Text h1>יצירת אימון חדש</Text>
            <Text subtitle>הכניסו שם לאימון</Text>
            <Controller control={control} name="name"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                    return (
                        <View>
                            <TextInput error={Boolean(error)} onChangeText={onChange} onBlur={onBlur} value={value} />
                            {error && <Text error>{error.message}</Text>}
                        </View>
                    )
                }}
            />
            {apiError && <Text error>שגיאת שרת: {apiError.message}</Text>}
            <Button onPress={handleSubmit(onSubmit)}>יצירת אימון</Button>
        </Modal>
    );
})

export default CreateWorkoutModal;