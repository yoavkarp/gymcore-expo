import RangedInput from "@/components/RangedInput";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Select, { SelectItem } from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { DISTANCE_UNITS, REPS_UNITS, REST_UNITS, TEMPO_UNITS, WEIGHT_UNITS } from "@/constants/units";
import { useIntervalForm, useCreateWorkout, useWorkout } from "@/features/workout";
import { IntervalFormInput } from "@/features/workout";
import { useAddIntervalToExercise } from "@/features/workout/hooks/api/useAddIntervalToExercise";
import { useUpdateIntervalInExercise } from "@/features/workout/hooks/api/useUpdateIntervalInExercise";
import { CardioExercise } from "@/graphql";
import React, { useImperativeHandle, useMemo } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface IntervalFormModalProps {
    onDismiss?: () => void;
    exerciseId?: string;
}

type IntervalFormModal = {
    open: (exerciseId: string, intervalId?: string) => void;
}

const IntervalFormModal = React.forwardRef<IntervalFormModal, IntervalFormModalProps>(({ onDismiss }, ref) => {

    const { control, reset, handleSubmit, formState: { isSubmitting } } = useIntervalForm();

    const [visible, setVisible] = useState(false);
    const [openProps, setOpenProps] = useState<{ exerciseId: string, intervalId?: string, exists?: boolean, exerciseIndex: number, setIndex?: number } | null>(null);

    const { workout, workoutId } = useWorkout();
    const { addIntervalToExercise, result: addIntervalToExerciseResult } = useAddIntervalToExercise(workoutId);
    const { updateIntervalInExercise, result: updateIntervalInExerciseResult } = useUpdateIntervalInExercise(workoutId);

    const onSubmit = async (data: IntervalFormInput) => {
        console.log(data);
        if (!openProps) return;

        if (!openProps.setIndex)
            await addIntervalToExercise(openProps.exerciseId, { ...data });
        else if (openProps.setIndex && openProps.intervalId)
            await updateIntervalInExercise(openProps.exerciseId, openProps.intervalId, data);

        setVisible(false);

    }

    useImperativeHandle(ref, () => {
        return {
            open: (exerciseId, intervalId) => {
                const exerciseIndex = workout?.exercises?.findIndex((exercise) => exercise.id === exerciseId);

                if (typeof (exerciseIndex) === 'undefined' || exerciseIndex === -1) return;

                const setIndex = intervalId ? (workout?.exercises?.[exerciseIndex] as CardioExercise).intervals?.findIndex((set) => set?.id === intervalId) : undefined;

                if (typeof (setIndex) === 'number' && setIndex > -1) {
                    setOpenProps({ exerciseId, intervalId, exists: Boolean(setIndex), exerciseIndex, setIndex });
                    reset({
                        resistance: (workout?.exercises?.[exerciseIndex] as CardioExercise).intervals?.[setIndex]?.resistance || undefined,
                        rest: (workout?.exercises?.[exerciseIndex] as CardioExercise).intervals?.[setIndex]?.rest || undefined,
                        angle: (workout?.exercises?.[exerciseIndex] as CardioExercise).intervals?.[setIndex]?.angle || undefined,
                        distance: (workout?.exercises?.[exerciseIndex] as CardioExercise).intervals?.[setIndex]?.distance || undefined,
                        duration: (workout?.exercises?.[exerciseIndex] as CardioExercise).intervals?.[setIndex]?.duration || undefined,
                        intensity: (workout?.exercises?.[exerciseIndex] as CardioExercise).intervals?.[setIndex]?.intensity || undefined,
                        tempo: (workout?.exercises?.[exerciseIndex] as CardioExercise).intervals?.[setIndex]?.tempo || undefined,
                    })
                }
                else {
                    setOpenProps({ exerciseId, exists: Boolean(setIndex), exerciseIndex });
                    reset()
                }

                setVisible(true);
            },
            close: () => {
                onDismiss?.();
            }
        }
    }, [visible])

    return (
        <Modal dismissable onDismiss={() => setVisible(false)} style={{ gap: 8 }} visible={visible}>
            <Text h1>{openProps?.exists ? 'עריכת אינטרוול קיים' : 'הוספת אינטרוול'}</Text>

            <Controller control={control} name="distance"
                render={({ field: { onChange, value }, fieldState: { error } }) => {

                    return (
                        <View>
                            <Label>מרחק</Label>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <RangedInput value={value} onChangeValue={(val) => onChange({ ...(value || {}), ...val, unit: value?.unit || DISTANCE_UNITS[0].value })} />
                                <Select containerStyle={{ width: 200 }} items={DISTANCE_UNITS} defaultValue={value?.unit || "meter"} onChangeValue={(val) => onChange({ ...(value || {}), units: val })} />
                            </View>
                            {error && <Text error>{error.message}</Text>}
                        </View>
                    )
                }}

            />

            <Controller control={control} name="tempo"
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                    return (
                        <View>
                            <Label>קצב</Label>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <RangedInput value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || TEMPO_UNITS[0].value })} />
                                <Select containerStyle={{ width: 200 }} items={TEMPO_UNITS} defaultValue={value?.unit || "meter/minute"} onChangeValue={(val) => onChange({ ...(value || {}), units: val })} />
                            </View>
                            {error && <Text error>{error.message}</Text>}
                        </View>
                    )
                }}

            />

            <Controller control={control} name="intensity"
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                    return (
                        <View>
                            <Label>עצימות</Label>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <RangedInput value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || WEIGHT_UNITS[0].value })} />
                                <Text>%</Text>
                            </View>
                            {error && <Text error>{error.message}</Text>}
                        </View>
                    )
                }}
            />

            <Controller control={control} name="angle"
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                    return (
                        <View>
                            <Label>שיפוע</Label>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <RangedInput value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || WEIGHT_UNITS[0].value })} />
                            </View>
                            {error && <Text error>{error.message}</Text>}
                        </View>
                    )
                }}
            />

            <Controller control={control} name="resistance"
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                    return (
                        <View>
                            <Label>התנגדות</Label>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <RangedInput value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || WEIGHT_UNITS[0].value })} />
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

            <Button isLoading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(onSubmit, (err) => console.log(err))}>
                {openProps?.exists ? 'עדכון' : 'הוספה'}
            </Button>
        </Modal>
    );
})

export default IntervalFormModal;