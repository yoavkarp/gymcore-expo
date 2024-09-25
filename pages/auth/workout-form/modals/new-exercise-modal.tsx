import SearchExerciseModal from "@/components/SearchExerciseModal";
import { SearchResultItem } from "@/components/SearchModal";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import { useWorkoutForm } from "@/contexts/WorkoutContext";
import { ExerciseType } from "@/graphql";
import { randomUUID } from "expo-crypto";
import React, { useImperativeHandle } from "react";
import { useState } from "react";

interface NewExerciseModalProps {
    onDismiss?: () => void;
}

type NewExerciseModal = {
    open: (exerciseId?: string) => void;
}

const NewExerciseModal = React.forwardRef<NewExerciseModal, NewExerciseModalProps>(({ onDismiss }, ref) => {


    const [selectedExercise, setSelectedExercise] = useState<SearchResultItem | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);
    const { setValue, watch, getValues } = useWorkoutForm();
    const exercises = watch("exercises");

    const editMode = Boolean(updatingId);

    useImperativeHandle(ref, () => {
        return {
            open: (exerciseId) => {
                setVisible(true);
                if (exerciseId && exercises[exerciseId]) {
                    setUpdatingId(exerciseId);
                    setSelectedExercise({ title: exercises[exerciseId].name, value: exercises[exerciseId].xid });
                }
                else {
                    setUpdatingId(null);
                    setSelectedExercise(null);
                }
            }
        }
    })

    const handleSubmit = () => {
        if (updatingId && selectedExercise) {
            setValue(`exercises.${updatingId}`, { ...getValues(`exercises.${updatingId}`)!, name: selectedExercise.title, xid: selectedExercise.value });
        }
        else if (selectedExercise) {
            const newId = randomUUID();
            setValue("exercises", { ...(exercises || {}), [updatingId || newId]: { name: selectedExercise.title, id: newId, sets: {}, setsOrder: [], intervalsOrder: [], intervals: {}, type: ExerciseType.Strength, xid: selectedExercise.value } })
            setValue("exercisesOrder", [...(getValues("exercisesOrder") || []), newId]);

        }

        setVisible(false);
    }

    return (
        <Modal visible={visible} dismissable onDismiss={() => { onDismiss?.(); setVisible(false) }} style={{ gap: 8 }}>
            <Text h1>{editMode ? 'עריכת תרגיל קיים' : 'הוספת תרגיל'}</Text>
            <SearchExerciseModal defaultValue={selectedExercise || undefined} onChangeValue={setSelectedExercise} />
            <Button onPress={handleSubmit}>
                {editMode ? 'עדכון' : 'הוספה'}
            </Button>
        </Modal>
    );
})

export default NewExerciseModal;