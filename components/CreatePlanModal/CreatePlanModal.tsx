import { Controller } from "react-hook-form";
import Modal from "../ui/Modal";
import Text from "../ui/Text";
import TextInput from "../ui/TextInput";
import { CreatePlanFormInput, useCreatePlanForm } from "./hooks/useCreatePlanForm";
import { View } from "../ui/View";
import Button from "../ui/Button";
import { forwardRef, useImperativeHandle, useState } from "react";
import { router } from "expo-router";
import { useClub } from "@/features/club";
import { useCreatePlan } from "@/features/plan";
import Label from "../ui/Label";

interface CreatePlanModalProps {
    memberId: string;
}

type CreatePlanModal = {
    open: () => void;
    close: () => void;
}

const CreatePlanModal = forwardRef<CreatePlanModal, CreatePlanModalProps>(({ memberId }, ref) => {

    const [visible, setIsVisible] = useState(false);
    const { control, handleSubmit } = useCreatePlanForm();
    const { currentTrainer } = useClub();

    const {
        createPlan: createPlanMutation,
        result: { loading, error: apiError }
    } = useCreatePlan({
        onCompleted(data) {
            if (data.createPlan?.id)
                router.push(`/plan/${data.createPlan.id}`)

            setIsVisible(false);
        }
    });


    useImperativeHandle(ref, () => {
        return {
            open: () => setIsVisible(true),
            close: () => setIsVisible(false)
        }
    }, [])

    const onSubmit = (data: CreatePlanFormInput) => {
        return createPlanMutation({
            memberId,
            ...data
        })
    }

    return (
        <Modal visible={visible} dismissable onDismiss={() => setIsVisible(false)} style={{ gap: 8 }}>
            <Text h1>יצירת תכנית חדשה</Text>
            <Controller control={control} name="weeks"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                    return (
                        <View>
                            <Label>מספר שבועות</Label>
                            <TextInput keyboardType="numeric" error={Boolean(error)} onChangeText={(text) => onChange(parseInt(text))} onBlur={onBlur} value={`${value || ""}`} />
                            {error && <Text error>{error.message}</Text>}
                        </View>
                    )
                }}
            />

            <Controller control={control} name="meetings"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                    return (
                        <View>
                            <Label>מספר מפגשים</Label>
                            <TextInput keyboardType="numeric" error={Boolean(error)} onChangeText={(text) => onChange(parseInt(text))} onBlur={onBlur} value={`${value || ""}`} />
                            {error && <Text error>{error.message}</Text>}
                        </View>
                    )
                }}
            />
            {apiError && <Text error>שגיאת שרת: {apiError.message}</Text>}
            <Button onPress={handleSubmit(onSubmit)}>יצירת תכנית</Button>
        </Modal>
    );
})

export default CreatePlanModal;