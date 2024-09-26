import RangedInput from "@/components/RangedInput";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Select, { SelectItem } from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { REPS_UNITS, REST_UNITS, WEIGHT_UNITS } from "@/constants/units";
import { useCreateSetForm, useCreateWorkout } from "@/features/workout";
import { CreateSetFormInput, createSetSchema } from "@/features/workout";
import { zodResolver } from "@hookform/resolvers/zod";
import { randomUUID } from "expo-crypto";
import React, { useImperativeHandle, useMemo } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface SetFormModalProps {
    onDismiss?: () => void;
    exerciseId?: string;
}

type SetFormModal = {
    open: (exerciseId: string, setId?: string) => void;
}

const SetFormModal = React.forwardRef<SetFormModal, SetFormModalProps>(({ onDismiss }, ref) => {

    const { control, reset, handleSubmit } = useCreateSetForm();

    const [visible, setVisible] = useState(false);
    const [openProps, setOpenProps] = useState<{ exerciseId: string, setId: string, exists?: boolean, exerciseIndex: number, setIndex?: number } | null>(null);

    const workoutForm = useCreateWorkout();

    const onSubmit = (data: CreateSetFormInput) => {
        if (!openProps) return;

        if (!openProps.setIndex)
            workoutForm.setValue(`exercises.${openProps.exerciseIndex}.sets`, [...(workoutForm.getValues(`exercises.${openProps.exerciseIndex}.sets`) || []), data]);
        else if (openProps.setIndex)
            workoutForm.setValue(`exercises.${openProps.exerciseIndex}.sets.${openProps.setIndex}`, data);

        setVisible(false);

    }

    useImperativeHandle(ref, () => {
        return {
            open: (exerciseId, setId) => {
                const newSetId = randomUUID();
                const exerciseIndex = workoutForm.getValues("exercises").findIndex((exercise) => exercise.id === exerciseId);
                const setIndex = setId ? workoutForm.getValues(`exercises.${exerciseIndex}.sets`)?.findIndex((set) => set?.id === setId) : undefined;

                if (exerciseIndex === -1) return;

                if (setIndex) {
                    reset({
                        reps: workoutForm.getValues(`exercises.${exerciseIndex}.sets.${setIndex}.reps`),
                        weight: workoutForm.getValues(`exercises.${exerciseIndex}.sets.${setIndex}.weight`),
                        rest: workoutForm.getValues(`exercises.${exerciseIndex}.sets.${setIndex}.rest`),
                        id: setId
                    })
                }
                else {
                    reset({ id: newSetId })
                }
                setOpenProps({ exerciseId, setId: setId || newSetId, exists: Boolean(setIndex), exerciseIndex, setIndex });
                setVisible(true);
            },
            close: () => {
                onDismiss?.();
            }
        }
    }, [])

    return (
        <Modal dismissable onDismiss={() => setVisible(false)} style={{ gap: 8 }} visible={visible}>
            <Text h1>{openProps?.exists ? 'עריכת סט קיים' : 'הוספת סט'}</Text>

            <Controller control={control} name="reps"
                render={({ field: { onChange, value }, fieldState: { error } }) => {

                    const handleChangeUnits: (item: SelectItem) => void = (item) => {

                        if (item.value === "max")
                            onChange({ unit: item.value });
                        else
                            onChange({ ...value, unit: item.value });
                    }

                    const showInput = value?.unit !== "max"

                    return (
                        <View>
                            <Label>חזרות</Label>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                {showInput && <RangedInput value={value} onChangeValue={(val) => onChange({ ...(value || {}), ...val, unit: value?.unit || REPS_UNITS[0].value })} />}
                                <Select containerStyle={{ width: 200 }} items={REPS_UNITS} defaultValue={value?.unit || "reps"} onChangeValue={handleChangeUnits} />
                            </View>
                            {error && <Text error>{error.message}</Text>}
                        </View>
                    )
                }}

            />

            <Controller control={control} name="weight"
                render={({ field: { onChange, value }, fieldState: { error } }) => {

                    const handleChangeUnits: (item: SelectItem) => void = (item) => {
                        if (["max", "body"].includes(item.value))
                            onChange({ unit: item.value });
                        else
                            onChange({ ...value, unit: item.value });
                    }

                    const showInput = !["max", "body"].includes(value?.unit || "");

                    return (
                        <View>
                            <Label>משקל</Label>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                {showInput && <RangedInput value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || WEIGHT_UNITS[0].value })} />}
                                <Select containerStyle={{ width: 200 }} items={WEIGHT_UNITS} defaultValue={value?.unit || "kg"} onChangeValue={handleChangeUnits} />
                            </View>

                            {error && <Text error>{error.message}</Text>}

                        </View>
                    )
                }}

            />

            <Controller control={control} name="rest"
                render={({ field: { onChange, value }, fieldState: { error }, }) => (
                    <View>
                        <Label>מנוחה</Label>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <RangedInput value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || REST_UNITS[0].value })} />
                            <Select containerStyle={{ width: 200 }} items={REST_UNITS} defaultValue={value?.unit || "seconds"} onChangeValue={(item) => onChange({ ...value, unit: item.value })} />
                        </View>
                        {error && <Text error>{error.message}</Text>}
                    </View>
                )}

            />

            <Button onPress={handleSubmit(onSubmit, (err) => console.log(err))}>
                {openProps?.exists ? 'עדכון' : 'הוספה'}
            </Button>
        </Modal>
    );
})

export default SetFormModal;