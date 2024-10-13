import RangedInput from "@/components/RangedInput";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { DISTANCE_UNITS, REST_UNITS, TEMPO_UNITS, WEIGHT_UNITS } from "@/constants/units";
import { useIntervalForm, useWorkout } from "@/features/workout";
import { IntervalFormInput } from "@/features/workout";
import { useAddIntervalToExercise } from "@/features/workout/hooks/api/useAddIntervalToExercise";
import { useUpdateIntervalInExercise } from "@/features/workout/hooks/api/useUpdateIntervalInExercise";
import { CardioExercise } from "@/graphql";
import { removeTypename, removeUndefined } from "@/utils/remove-typename";
import React, { useImperativeHandle, useMemo } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useExercise } from "./ExerciseProvider";
import CloseButton from "@/components/ui/CloseButton";

interface IntervalFormModalProps {
    onDismiss?: () => void;
    exerciseId?: string;
}

type IntervalFormModal = {
    open: (intervalId?: string) => void;
}

const IntervalFormModal = React.forwardRef<IntervalFormModal, IntervalFormModalProps>(({ onDismiss }, ref) => {

    const { control, reset, handleSubmit, formState: { isSubmitting } } = useIntervalForm();

    const [visible, setVisible] = useState(false);
    const [openProps, setOpenProps] = useState<{ intervalId: string } | null>(null);

    const { exercise: _exercise } = useExercise();
    const exercise = _exercise as CardioExercise;

    const { workout, workoutId } = useWorkout();
    const { addIntervalToExercise, result: addIntervalToExerciseResult } = useAddIntervalToExercise(workoutId);
    const { updateIntervalInExercise, result: updateIntervalInExerciseResult } = useUpdateIntervalInExercise(workoutId, {
        onError(err) {
            console.log("ERRR", err)
        }
    });

    const onSubmit = async (data: IntervalFormInput) => {

        if (!openProps?.intervalId) {
            await addIntervalToExercise(exercise.id, { ...data });
        }
        else {
            await updateIntervalInExercise(exercise.id, openProps.intervalId, removeTypename(removeUndefined(data)));
        }

        setVisible(false);

    }

    useImperativeHandle(ref, () => {
        return {
            open: (intervalId) => {

                if (intervalId) {
                    const interval = exercise.intervals?.find((interval) => interval?.id === intervalId);
                    setOpenProps({ intervalId });
                    reset({
                        resistance: interval?.resistance || undefined,
                        rest: interval?.rest || undefined,
                        angle: interval?.angle || undefined,
                        distance: interval?.distance || undefined,
                        duration: interval?.duration || undefined,
                        intensity: interval?.intensity || undefined,
                        tempo: interval?.tempo || undefined,
                    })
                }
                else {
                    setOpenProps(null);
                    reset({})
                }
                setVisible(true);
            },
            close: () => {
                onDismiss?.();
            }
        }
    }, [visible])

    return (
        <Modal onDismiss={() => setVisible(false)} style={{ gap: 8 }} visible={visible}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text h1>{openProps?.intervalId ? 'עריכת אינטרוול קיים' : 'הוספת אינטרוול'}</Text>
                <CloseButton onPress={() => setVisible(false)} />
            </View>

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
                {openProps?.intervalId ? 'עדכון' : 'הוספה'}
            </Button>
        </Modal>
    );
})

export default IntervalFormModal;