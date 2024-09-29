import SearchExerciseModal from "@/components/SearchExerciseModal";
import { SearchResultItem } from "@/components/SearchModal";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import { ExerciseType } from "@/graphql";
import { randomUUID } from "expo-crypto";
import React, { useImperativeHandle } from "react";
import { useState } from "react";
import { ExerciseFormInput, useExerciseForm } from "../hooks/useExerciseForm";
import { useWorkout } from "@/features/workout";
import { useSnackbar } from "@/contexts/SnackbarContext";
import Select from "@/components/ui/Select";
import { useAddExerciseToWorkout } from "@/features/workout/hooks/api/useAddExerciseToWorkout";
import { useUpdateExerciseInWorkout } from "@/features/workout/hooks/api/useUpdateExerciseInWorkout";

interface ExerciseNameModalProps {
    onDismiss?: () => void;
}

type ExerciseNameModal = {
    open: (exerciseId?: string) => void;
    close: () => void;
}

const ExerciseNameModal = React.forwardRef<ExerciseNameModal, ExerciseNameModalProps>(({ onDismiss }, ref) => {

    const [selectedExercise, setSelectedExercise] = useState<SearchResultItem | null>(null);
    const [openProps, setOpenProps] = useState<{ exerciseId?: string } | null>(null);
    const [visible, setVisible] = useState(false);
    const { handleSubmit, setValue, getValues, reset, formState: { errors } } = useExerciseForm();
    const { workout, workoutId } = useWorkout();

    const { addExerciseToWorkout, result: addExerciseToWorkoutResult } = useAddExerciseToWorkout(workoutId);
    const { updateExerciseInWorkout, result: updateExerciseInWorkoutResult } = useUpdateExerciseInWorkout(workoutId);

    const [show] = useSnackbar();

    const dismiss = () => {
        setVisible(false);
        setOpenProps(null);
        setSelectedExercise(null)
        reset()
        console.log("Reset")
    }

    useImperativeHandle(ref, () => {
        return {
            open: (exerciseId) => {

                setOpenProps({ exerciseId });
                const exercise = workout?.exercises?.find((exercise) => exercise.id === exerciseId);

                setVisible(true);
                if (exercise) {
                    reset({
                        type: exercise.type,
                        name: exercise.name,
                        xid: exercise.xid
                    })
                    setSelectedExercise({ title: exercise.name, value: exercise.xid });
                }
                else {
                    setSelectedExercise(null);
                }
            },
            close: () => {
                dismiss();
            }
        }
    })


    const onSubmit = async (data: ExerciseFormInput) => {
        if (openProps?.exerciseId) {
            try {
                await updateExerciseInWorkout(openProps.exerciseId, data)
                show("התרגיל עודכן בהצלחה")
                dismiss();
            }
            catch (e) {
                show("שגיאה בהוספת התרגיל", "error")
                console.log(e)
            }
        }
        else {
            try {
                await addExerciseToWorkout(data)
                show("התרגיל נוסף בהצלחה")
                dismiss();
            }
            catch (e) {
                show("שגיאה בהוספת התרגיל", "error")
                console.log(e)
            }
        }


    }

    return (
        <Modal visible={visible} dismissable onDismiss={() => { dismiss() }} style={{ gap: 8 }}>
            <Text h1>{openProps?.exerciseId ? 'עריכת תרגיל קיים' : 'הוספת תרגיל'}</Text>
            <SearchExerciseModal defaultValue={selectedExercise || undefined} onChangeValue={(val) => {
                setValue("xid", val.value)
                setValue("name", val.title)
            }} />
            {errors.xid && <Text error>{errors.xid.message}</Text>}
            <Select items={[{
                value: "CARDIO",
                title: "קרדיו"
            },
            {
                value: "STRENGTH",
                title: "כוח"
            }]} defaultValue={getValues("type")} onChangeValue={(val) => setValue("type", val.value as ExerciseType)} placeholder="בחר סוג" />
            {errors.type && <Text error>{errors.type.message}</Text>}
            <Button onPress={handleSubmit(onSubmit, (err) => console.log(err))}>
                {openProps?.exerciseId ? 'עדכון' : 'הוספה'}
            </Button>
        </Modal>
    );
})

export default ExerciseNameModal;