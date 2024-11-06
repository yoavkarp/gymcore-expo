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
import { Controller } from "react-hook-form";
import { View } from "react-native";
import Label from "@/components/ui/Label";
import TextInput from "@/components/ui/TextInput";
import CloseButton from "@/components/ui/CloseButton";
import { router } from "expo-router";

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
    const { handleSubmit, setValue, getValues, reset, formState: { errors, isSubmitting }, control } = useExerciseForm();
    const { workout, workoutId } = useWorkout();

    const { addExerciseToWorkout, result: addExerciseToWorkoutResult } = useAddExerciseToWorkout(workoutId, {
        onCompleted(data) {
            console.log(data.addExerciseToWorkout?.exercises?.at(-1)?.id)
            if (data.addExerciseToWorkout?.exercises?.at(-1)?.id)
                router.push(`/workout/${workoutId}/${data.addExerciseToWorkout?.exercises?.at(-1)?.id}`)
        }
    });
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
        <Modal visible={visible} onDismiss={() => { dismiss() }} style={{ gap: 8, width: 700 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text h1>{openProps?.exerciseId ? 'עריכת תרגיל קיים' : 'הוספת תרגיל'}</Text>
                <CloseButton onPress={() => dismiss()} />
            </View>

            <SearchExerciseModal defaultValue={selectedExercise || undefined} onChangeValue={(val) => {
                setValue("xid", val.value)
                setValue("name", val.title)
            }} />
            {errors.xid && <Text error>{errors.xid.message}</Text>}
            {!openProps?.exerciseId && <Select items={[{
                value: "CARDIO",
                title: "קרדיו"
            },
            {
                value: "STRENGTH",
                title: "כוח"
            }]} defaultValue={getValues("type")} onChangeValue={(val) => setValue("type", val.value as ExerciseType)} placeholder="בחר סוג" />}
            {errors.type && <Text error>{errors.type.message}</Text>}

            <Controller control={control} name="notes"
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View style={{ alignSelf: 'flex-start', width: '100%' }}>
                        <Label>הערות</Label>
                        <TextInput style={{ width: '100%', textAlign: 'right' }} error={Boolean(error)} onChangeText={onChange} onBlur={onBlur} value={value || ""} />
                        {error && <Text error>{error.message}</Text>}
                    </View>
                )}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Controller control={control} name="machine_number"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <View>
                            <Label>מספר מכונה</Label>
                            <TextInput style={{ width: 300, textAlign: 'center' }} error={Boolean(error)} onChangeText={onChange} value={value || ""} />
                            {error && <Text error>{error.message}</Text>}
                        </View>
                    )}
                />

                <Controller control={control} name="seat_height"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <View>
                            <Label>גובה מושב</Label>
                            <TextInput style={{ width: 300, textAlign: 'center' }} error={Boolean(error)} onChangeText={onChange} value={value || ""} />
                            {error && <Text error>{error.message}</Text>}
                        </View>
                    )}
                />
            </View>
            <Button isLoading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(onSubmit, (err) => console.log(err))}>
                {openProps?.exerciseId ? 'עדכון' : 'הוספה'}
            </Button>
        </Modal>
    );
})

export default ExerciseNameModal;