import RangedInput from "@/components/RangedInput";
import { SearchResultItem } from "@/components/SearchModal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import { useWorkoutForm } from "@/contexts/WorkoutContext";
import { ParameterInput } from "@/graphql";
import { CreateWorkoutFormInput } from "@/hooks/forms/useCreateWorkoutForm";
import { randomUUID } from "expo-crypto";
import React, { useImperativeHandle, useMemo } from "react";
import { useState } from "react";

interface NewSetModalProps {
    onDismiss?: () => void;
    exerciseId?: string;
}

type NewSetModal = {
    open: () => void;
}

const NewSetModal = React.forwardRef<NewSetModal, NewSetModalProps>(({ onDismiss }, ref) => {

    const [visible, setVisible] = useState(false);

    const { setValue, watch } = useWorkoutForm();

    const [exerciseIndex, setExerciseIndex] = useState<number>(0)
    const [setIndex, setSetIndex] = useState<number>()


    const [reps, setReps] = useState<ParameterInput>({});
    const [weight, setWeight] = useState<ParameterInput>({});
    const [rest, setRest] = useState<ParameterInput>({});

    const exerciseSet = setIndex ? watch("exercises")?.[exerciseIndex]?.sets?.[setIndex] : { reps, weight, rest };

    useImperativeHandle(ref, () => {
        return {
            open: () => setVisible(true)
        }
    }, [])

    return (
        <Modal dismissable style={{ gap: 8 }} visible={visible}>
            <Text h1>הוספת סט</Text>

            <Label>מספר חזרות</Label>
            <RangedInput value={reps} onChangeValue={(val) => setReps(val)} />

            <Button onPress={() => {
                setValue(`exercises.${exerciseIndex}.sets`, reps as any);
                setValue("exercises.0.sets.0.id", randomUUID());
                setVisible(false);

            }}>הוספה</Button>
        </Modal>
    );
})

export default NewSetModal;