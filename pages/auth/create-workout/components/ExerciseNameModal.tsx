import SearchExerciseModal from "@/components/SearchExerciseModal";
import { SearchResultItem } from "@/components/SearchModal";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import { useCreateWorkout } from "@/features/workout";
import { ExerciseType } from "@/graphql";
import { randomUUID } from "expo-crypto";
import React, { useImperativeHandle } from "react";
import { useState } from "react";

interface ExerciseNameModalProps {
    onDismiss?: () => void;
}

type ExerciseNameModal = {
    open: (exerciseId?: string) => void;
}

const ExerciseNameModal = React.forwardRef<ExerciseNameModal, ExerciseNameModalProps>(({ onDismiss }, ref) => {


    const [selectedExercise, setSelectedExercise] = useState<SearchResultItem | null>(null);
    const [openProps, setOpenProps] = useState<{ exerciseIndex?: number } | null>(null);
    const [visible, setVisible] = useState(false);
    const { setValue, watch, getValues } = useCreateWorkout();

    useImperativeHandle(ref, () => {
        return {
            open: (exerciseId) => {
                const exerciseIndex = getValues("exercises")?.findIndex((exercise) => exercise.id === exerciseId);
                setOpenProps({ exerciseIndex });

                setVisible(true);
                if (exerciseId && exerciseIndex !== -1) {
                    setSelectedExercise({ title: getValues(`exercises.${exerciseIndex}`).name, value: getValues(`exercises.${exerciseIndex}`).xid });
                }
                else {
                    setSelectedExercise(null);
                }
            }
        }
    })

    const handleSubmit = () => {
        if (openProps?.exerciseIndex && selectedExercise) {
            setValue(`exercises.${openProps.exerciseIndex}`, { ...getValues(`exercises.${openProps.exerciseIndex}`)!, name: selectedExercise.title, xid: selectedExercise.value });
        }
        else if (selectedExercise) {
            const newId = randomUUID();
            setValue("exercises", [...(getValues(`exercises`) || []), { name: selectedExercise.title, id: newId, type: ExerciseType.Strength, xid: selectedExercise.value }])
        }

        setVisible(false);
    }

    return (
        <Modal visible={visible} dismissable onDismiss={() => { onDismiss?.(); setVisible(false) }} style={{ gap: 8 }}>
            <Text h1>{openProps?.exerciseIndex ? 'עריכת תרגיל קיים' : 'הוספת תרגיל'}</Text>
            <SearchExerciseModal defaultValue={selectedExercise || undefined} onChangeValue={setSelectedExercise} />
            <Button onPress={handleSubmit}>
                {openProps?.exerciseIndex ? 'עדכון' : 'הוספה'}
            </Button>
        </Modal>
    );
})

export default ExerciseNameModal;