import RangedInput, { RangedInputRef } from "@/components/RangedInput";
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
import React, { useImperativeHandle, useMemo, useRef } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useExercise } from "./ExerciseProvider";
import { Keyboard } from "react-native";

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


    const [tempoRef, durationRef, intensityRef, angleRef, resistanceRef, restRef, target_heart_rateRef] = [useRef<RangedInputRef>(null), useRef<RangedInputRef>(null), useRef<RangedInputRef>(null), useRef<RangedInputRef>(null), useRef<RangedInputRef>(null), useRef<RangedInputRef>(null), useRef<RangedInputRef>(null)]

    const { workout, workoutId } = useWorkout();
    const { addIntervalToExercise, result: addIntervalToExerciseResult } = useAddIntervalToExercise(workoutId);
    const { updateIntervalInExercise, result: updateIntervalInExerciseResult } = useUpdateIntervalInExercise(workoutId, {
        onError(err) {
            console.log("ERRR", err)
        }
    });

    const onSubmit = async (data: IntervalFormInput) => {

        console.log("DATA", JSON.stringify(data, null, 2));

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
                        target_heart_rate: interval?.target_heart_rate || undefined
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
        <Modal width={1200} onDismiss={() => setVisible(false)} style={{ gap: 8 }} visible={visible}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text h1>{openProps?.intervalId ? 'עריכת אינטרוול קיים' : 'הוספת אינטרוול'}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Controller control={control} name="distance"
                    render={({ field: { onChange, value }, fieldState: { error } }) => {

                        return (
                            <View style={{ flex: 0.5 }}>
                                <Label>מרחק</Label>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <RangedInput onSubmitEditing={() => tempoRef.current?.focus()} value={value} onChangeValue={(val) => onChange({ ...(value || {}), ...val, unit: value?.unit || DISTANCE_UNITS[0].value })} />
                                    <Select containerStyle={{ width: 200 }} items={DISTANCE_UNITS} defaultValue={value?.unit || "meter"} onChangeValue={(val) => onChange({ ...(value || {}), unit: val.value })} />
                                </View>
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }}

                />

                <Controller control={control} name="tempo"
                    render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                            <View style={{ flex: 0.5 }}>
                                <Label>קצב</Label>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <RangedInput ref={tempoRef} onSubmitEditing={() => durationRef.current?.focus()} value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || TEMPO_UNITS[0].value })} />
                                    <Select containerStyle={{ width: 200 }} items={TEMPO_UNITS} defaultValue={value?.unit || "meter/minute"} onChangeValue={(val) => onChange({ ...(value || {}), unit: val.value })} />
                                </View>
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }}

                />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Controller control={control} name="duration"
                    render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                            <View style={{ flex: 0.5 }}>
                                <Label>משך</Label>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <RangedInput ref={durationRef} onSubmitEditing={() => intensityRef.current?.focus()} value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || REST_UNITS[0].value })} />
                                    <Select containerStyle={{ width: 200 }} items={REST_UNITS} defaultValue={value?.unit || "minutes"} onChangeValue={(val) => onChange({ ...(value || {}), unit: val.value })} />
                                </View>
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }}
                />

                <Controller control={control} name="intensity"
                    render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                            <View style={{ flex: 0.25 }}>
                                <Label>עצימות</Label>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <RangedInput ref={intensityRef} onSubmitEditing={() => target_heart_rateRef.current?.focus()} value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: "%" })} />
                                    <Text>%</Text>
                                </View>
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }}
                />

                <Controller control={control} name="target_heart_rate"
                    render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                            <View style={{ flex: 0.25 }}>
                                <Label>דופק מטרה</Label>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <RangedInput ref={target_heart_rateRef} onSubmitEditing={() => restRef.current?.focus()} value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: "BPM" })} />
                                    <Text>BPM</Text>
                                </View>
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }}
                />

            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Controller control={control} name="rest"
                    render={({ field: { onChange, value }, fieldState: { error }, }) => (
                        <View style={{ flex: 0.5 }}>
                            <Label>מנוחה</Label>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <RangedInput ref={restRef} onSubmitEditing={() => angleRef.current?.focus()} value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || REST_UNITS[0].value })} />
                                <Select containerStyle={{ width: 200 }} items={REST_UNITS} defaultValue={value?.unit || "seconds"} onChangeValue={(item) => onChange({ ...value, unit: item.value })} />
                            </View>
                            {error && <Text error>{error.message}</Text>}
                        </View>
                    )}
                />

                <Controller control={control} name="angle"
                    render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                            <View style={{ flex: 0.25 }}>
                                <Label>שיפוע</Label>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <RangedInput ref={angleRef} onSubmitEditing={() => resistanceRef.current?.focus()} value={value} onChangeValue={(val) => onChange({ ...value, ...val })} />
                                </View>
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }}
                />

                <Controller control={control} name="resistance"
                    render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                            <View style={{ flex: 0.25 }}>
                                <Label>התנגדות</Label>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <RangedInput onSubmitEditing={() => Keyboard.dismiss()} ref={resistanceRef} value={value} onChangeValue={(val) => onChange({ ...value, ...val })} />
                                </View>
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }}
                />
            </View>

            <Button style={{ width: 200, alignSelf: 'center' }} isLoading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(onSubmit, (err) => console.log(err))}>
                {openProps?.intervalId ? 'עדכון' : 'הוספה'}
            </Button>
        </Modal>
    );
})

export default IntervalFormModal;