import RangedInput from "@/components/RangedInput";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Select, { SelectItem } from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import { View } from "@/components/ui/View";
import { REPS_UNITS, REST_UNITS, WEIGHT_UNITS } from "@/constants/units";
import { useCreateSetForm, useCreateWorkout, useWorkout } from "@/features/workout";
import { SetFormInput } from "@/features/workout";
import { useAddSetToExercise } from "@/features/workout/hooks/api/useAddSetToExercise";
import { useUpdateSetInExercise } from "@/features/workout/hooks/api/useUpdateSetInExercise";
import { StrengthExercise } from "@/graphql";
import { removeTypename, removeUndefined } from "@/utils/remove-typename";
import React, { useImperativeHandle, useMemo, useRef } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList } from "react-native";
import DropSetFormModal from "./DropsetFormModal";

interface SetFormModalProps {
    onDismiss?: () => void;
    exerciseId?: string;
}

type SetFormModal = {
    open: (exerciseId: string, setId?: string) => void;
}

const SetFormModal = React.forwardRef<SetFormModal, SetFormModalProps>(({ onDismiss }, ref) => {

    const { control, reset, handleSubmit, formState: { isSubmitting }, watch, setValue } = useCreateSetForm();

    const [visible, setVisible] = useState(false);
    const [openProps, setOpenProps] = useState<{ exerciseId: string, setId?: string, exerciseIndex: number, setIndex?: number } | null>(null);

    const { workout, workoutId } = useWorkout();
    const { addSetToExercise, result: addSetToExerciseResult } = useAddSetToExercise(workoutId);
    const { updateSetInExercise, result: updateSetInExerciseResult } = useUpdateSetInExercise(workoutId);

    const dropSetModal = useRef<DropSetFormModal>(null);

    const onSubmit = async (data: SetFormInput) => {
        console.log(data);
        if (!openProps) return;

        if (!openProps.setId)
            await addSetToExercise(openProps.exerciseId, { ...data });
        else
            await updateSetInExercise(openProps.exerciseId, openProps.setId, removeTypename(removeUndefined(data)));

        setVisible(false);

    }

    useImperativeHandle(ref, () => {
        return {
            open: (exerciseId, setId) => {
                const exerciseIndex = workout?.exercises?.findIndex((exercise) => exercise.id === exerciseId);

                if (typeof (exerciseIndex) === 'undefined' || exerciseIndex === -1) return;

                const setIndex = setId ? (workout?.exercises?.[exerciseIndex] as StrengthExercise).sets?.findIndex((set) => set?.id === setId) : undefined;

                if (typeof (setIndex) === 'number' && setIndex > -1) {
                    setOpenProps({ exerciseId, setId, exerciseIndex, setIndex });
                    reset({
                        reps: (workout?.exercises?.[exerciseIndex] as StrengthExercise).sets?.[setIndex]?.reps || undefined,
                        weight: (workout?.exercises?.[exerciseIndex] as StrengthExercise).sets?.[setIndex]?.weight || undefined,
                        rest: (workout?.exercises?.[exerciseIndex] as StrengthExercise).sets?.[setIndex]?.rest || undefined,
                    })
                }
                else {
                    setOpenProps({ exerciseId, exerciseIndex });
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
        <Modal dismissable onDismiss={() => setVisible(false)} style={{ gap: 8, width: 1000 }} visible={visible}>
            <Text h1>{openProps?.setId ? 'עריכת סט קיים' : 'הוספת סט'}</Text>
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
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text h2>דרופסטים</Text>
                        <Button onPress={() => dropSetModal.current?.open((data) => setValue("dropsets", [...(watch("dropsets") || []), data]))}>הוסף דרופסט</Button>

                    </View>

                    <FlatList
                        data={watch("dropsets")}
                        renderItem={({ item, index }) => (
                            <View>
                                <Text h2>דרופסט {index + 1}</Text>
                                <Text>
                                    {JSON.stringify(item)}
                                </Text>
                            </View>
                        )}
                    />


                </View>
            </View>

            <Button isLoading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(onSubmit, (err) => console.log(err))}>
                {openProps?.setId ? 'עדכון' : 'הוספה'}
            </Button>

            <DropSetFormModal ref={dropSetModal} />
        </Modal>
    );
})

export default SetFormModal;