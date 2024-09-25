import RangedInput from "@/components/RangedInput";
import { SearchResultItem } from "@/components/SearchModal";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Select, { SelectItem } from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { REPS_UNITS, REST_UNITS, WEIGHT_UNITS } from "@/constants/units";
import { useWorkoutForm } from "@/contexts/WorkoutContext";
import { ParameterInput } from "@/graphql";
import { CreateSetFormInput, CreateWorkoutFormInput, setSchema } from "@/hooks/forms/useCreateWorkoutForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { randomUUID } from "expo-crypto";
import { rest } from "lodash";
import React, { useEffect, useImperativeHandle, useMemo } from "react";
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

    const { control, reset, handleSubmit } = useForm<CreateSetFormInput>({
        resolver: zodResolver(setSchema),
    });


    const [visible, setVisible] = useState(false);
    const [openProps, setOpenProps] = useState<{ exerciseId: string, setId: string, exists?: boolean } | null>(null);
    const [invalidError, setInvalidError] = useState<string | null>(null);

    const workoutForm = useWorkoutForm();

    const onSubmit = (data: CreateSetFormInput) => {
        console.log(data);
        workoutForm.setValue(`exercises.${openProps?.exerciseId}.sets.${openProps?.setId}`, data);

        if (!openProps?.exists)
            workoutForm.setValue(`exercises.${openProps?.exerciseId}.setsOrder`, [...(workoutForm.getValues(`exercises.${openProps?.exerciseId}.setsOrder`) || []), openProps!.setId]);

        setVisible(false);

    }

    useImperativeHandle(ref, () => {
        return {
            open: (exerciseId, setId) => {
                const newSetId = randomUUID();

                if (setId) {
                    reset({
                        reps: workoutForm.getValues(`exercises.${exerciseId}.sets.${setId}.reps`),
                        weight: workoutForm.getValues(`exercises.${exerciseId}.sets.${setId}.weight`),
                        rest: workoutForm.getValues(`exercises.${exerciseId}.sets.${setId}.rest`),
                        id: setId
                    })
                }
                else {
                    reset({ id: newSetId })
                }
                setOpenProps({ exerciseId, setId: setId || newSetId, exists: Boolean(setId) });
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