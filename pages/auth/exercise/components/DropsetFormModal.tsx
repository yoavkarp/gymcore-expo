import RangedInput, { RangedInputRef } from "@/components/RangedInput";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Select, { SelectItem } from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { REPS_UNITS, WEIGHT_UNITS } from "@/constants/units";
import React, { useImperativeHandle, useMemo, useRef } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { DropSetFormInput, useDropSetForm } from "../hooks/useDropsetForm";
import { StrengthExercise, useUpdateSetInExerciseMutation } from "@/graphql";
import { useExercise } from "./ExerciseProvider";
import { useWorkout } from "@/features/workout";
import { useUpdateSetInExercise } from "@/features/workout/hooks/api/useUpdateSetInExercise";
import { removeTypename } from "@/utils/remove-typename";
import CloseButton from "@/components/ui/CloseButton";
import { Keyboard } from "react-native";

interface DropSetFormModalProps {
    onDismiss?: () => void;
    exerciseId?: string;
}

type DropSetFormModal = {
    open: (setId: string, dropsetId?: string) => void;
}

const DropSetFormModal = React.forwardRef<DropSetFormModal, DropSetFormModalProps>(({ onDismiss }, ref) => {

    const { control, reset, handleSubmit, formState: { isSubmitting } } = useDropSetForm();
    const { exercise: _exercise } = useExercise();
    const { workoutId } = useWorkout();
    const exercise = _exercise as StrengthExercise;

    const [visible, setVisible] = useState(false);
    const [openProps, setOpenProps] = useState<{ setId: string, dropsetId?: string } | null>(null);
    const weightRef = useRef<RangedInputRef>(null)

    const set = useMemo(() => exercise.sets?.find((set) => set?.id === openProps?.setId), [openProps?.setId, exercise]);
    const { updateSetInExercise } = useUpdateSetInExercise(workoutId);

    const onSubmit = async (e: DropSetFormInput) => {
        if (!openProps) return;

        const payload = removeTypename({
            reps: set?.reps,
            weight: set?.weight,
            rest: set?.rest,
            dropsets: openProps.dropsetId ? set?.dropsets?.map((ds) => {
                if (ds.id === openProps.dropsetId) {
                    return e;
                }
                return ds;
            }) : [...(set?.dropsets || []), e]
        })

        await updateSetInExercise(exercise.id, openProps.setId, payload)
        setOpenProps(null);
        setVisible(false);
    }

    useImperativeHandle(ref, () => {
        return {
            open: (setId, dropsetId) => {
                setOpenProps({ setId, dropsetId });

                const exists = openProps?.dropsetId ? exercise.sets?.find((set) => set?.id === openProps?.setId)?.dropsets?.find((dropset) => dropset.id === openProps.dropsetId) : undefined;
                if (exists) {
                    reset({ reps: exists.reps, weight: exists.weight, id: exists.id });
                }
                else {
                    reset({});
                }

                setVisible(true);
            },
            close: () => {
                setOpenProps(null);
                onDismiss?.();
            }
        }
    }, [visible])

    return (
        <Modal onDismiss={() => setVisible(false)} style={{ gap: 8 }} visible={visible}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text h2>דרופסט</Text>
                <CloseButton onPress={() => setVisible(false)} />
            </View>
            <Text subtitle>הכנס משקל וחזרות עבור דרופסט</Text>
            <View>
                <Controller control={control} name={"reps"}

                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {

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
                                    {showInput && <RangedInput onSubmitEditing={() => weightRef.current?.focus()} value={value} onChangeValue={(val) => onChange({ ...(value || {}), ...val, unit: value?.unit || REPS_UNITS[0].value })} />}
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
                                    {showInput && <RangedInput ref={weightRef} onSubmitEditing={() => Keyboard.dismiss()} value={value} onChangeValue={(val) => onChange({ ...value, ...val, unit: value?.unit || WEIGHT_UNITS[0].value })} />}
                                    <Select containerStyle={{ width: 200 }} items={WEIGHT_UNITS} defaultValue={value?.unit || "kg"} onChangeValue={handleChangeUnits} />
                                </View>

                                {error && <Text error>{error.message}</Text>}

                            </View>
                        )
                    }}

                />

            </View>

            <Button isLoading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(onSubmit, (err) => console.log(err))}>
                {openProps?.dropsetId ? 'עדכון' : 'הוספה'}
            </Button>
        </Modal>
    );
})

export default DropSetFormModal;