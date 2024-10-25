import RangedInput, { RangedInputRef } from "@/components/RangedInput";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Select, { SelectItem } from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import { View } from "@/components/ui/View";
import { REPS_UNITS, REST_UNITS, WEIGHT_UNITS } from "@/constants/units";
import { useCreateSetForm, useWorkout } from "@/features/workout";
import { SetFormInput } from "@/features/workout";
import { useAddSetToExercise } from "@/features/workout/hooks/api/useAddSetToExercise";
import { useUpdateSetInExercise } from "@/features/workout/hooks/api/useUpdateSetInExercise";
import { StrengthExercise } from "@/graphql";
import { removeTypename, removeUndefined } from "@/utils/remove-typename";
import React, { useImperativeHandle, useMemo, useRef } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useExercise } from "./ExerciseProvider";
import CloseButton from "@/components/ui/CloseButton";
import { Keyboard } from "react-native";

interface SetFormModalProps {
    onDismiss?: () => void;
    exerciseId?: string;
}

type SetFormModal = {
    open: (setId?: string) => void;
}

const SetFormModal = React.forwardRef<SetFormModal, SetFormModalProps>(({ onDismiss }, ref) => {

    const { control, reset, handleSubmit, formState: { isSubmitting }, watch, setValue } = useCreateSetForm();

    const [visible, setVisible] = useState(false);
    const [openProps, setOpenProps] = useState<{ setId: string } | null>(null);

    const { exercise: _exercise } = useExercise();
    const exercise = _exercise as StrengthExercise;

    const { workoutId } = useWorkout();
    const { addSetToExercise } = useAddSetToExercise(workoutId);
    const { updateSetInExercise } = useUpdateSetInExercise(workoutId);

    const [weightRef, restRef] = [useRef<RangedInputRef>(null), useRef<RangedInputRef>(null)];

    const onSubmit = async (data: SetFormInput) => {

        if (!openProps?.setId)
            await addSetToExercise(exercise.id, { ...data });
        else
            await updateSetInExercise(exercise.id, openProps.setId, removeTypename(removeUndefined(data)));

        setVisible(false);
    }

    useImperativeHandle(ref, () => {
        return {
            open: (setId) => {

                if (setId) {
                    const set = exercise.sets?.find((set) => set?.id === setId);
                    setOpenProps({ setId });
                    reset({
                        reps: set?.reps || undefined,
                        weight: set?.weight || undefined,
                        rest: set?.rest || undefined,
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

                <Text h1>{openProps?.setId ? 'עריכת סט קיים' : 'הוספת סט'}</Text>
                <CloseButton onPress={() => setVisible(false)} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
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
                                        {showInput && <RangedInput value={value} onSubmitEditing={() => weightRef.current?.focus()} onChangeValue={(val) => onChange({ ...(value || {}), ...val, unit: value?.unit || REPS_UNITS[0].value })} />}
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
                                        {showInput && <RangedInput ref={weightRef} onSubmitEditing={() => restRef.current?.focus()} value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || WEIGHT_UNITS[0].value })} />}
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
                                    <RangedInput value={value} ref={restRef} onSubmitEditing={() => Keyboard.dismiss()} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || REST_UNITS[0].value })} />
                                    <Select containerStyle={{ width: 200 }} items={REST_UNITS} defaultValue={value?.unit || "seconds"} onChangeValue={(item) => onChange({ ...value, unit: item.value })} />
                                </View>
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )}

                    />

                    {!openProps?.setId && <Controller control={control} name="times"

                        render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
                            return (
                                <View>
                                    <Label>מספר סטים</Label>
                                    <TextInput keyboardType="decimal-pad" maxLength={2} onBlur={onBlur} placeholder="1" style={{ width: 100, textAlign: 'center' }} value={value ? value.toString() : ""} onChangeText={(text) => onChange(parseInt(text))} />
                                    {error && <Text error>{error.message}</Text>}
                                </View>
                            )
                        }
                        } />}


                </View>
            </View>
            <Button isLoading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(onSubmit, (err) => console.log(err))}>
                {openProps?.setId ? 'עדכון' : 'הוספה'}
            </Button>
        </Modal>
    );
})

export default SetFormModal;