import RangedInput from "@/components/RangedInput";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Modal from "@/components/ui/Modal";
import Select, { SelectItem } from "@/components/ui/Select";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import { View } from "@/components/ui/View";
import { REPS_UNITS, REST_UNITS, WEIGHT_UNITS } from "@/constants/units";
import { useAddSetToExercise } from "@/features/workout/hooks/api/useAddSetToExercise";
import { useUpdateSetInExercise } from "@/features/workout/hooks/api/useUpdateSetInExercise";
import { StrengthExercise } from "@/graphql";
import { removeTypename, removeUndefined } from "@/utils/remove-typename";
import React, { useImperativeHandle, useMemo } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList } from "react-native";
import { DropSetFormInput, useDropSetForm } from "../hooks/useDropsetForm";

interface DropSetFormModalProps {
    onDismiss?: () => void;
    exerciseId?: string;
}

type DropSetFormModal = {
    open: (onSubmit?: (data: DropSetFormInput) => any, defaultValues?: Partial<DropSetFormInput>) => void;
}

const DropSetFormModal = React.forwardRef<DropSetFormModal, DropSetFormModalProps>(({ onDismiss }, ref) => {

    const { control, reset, handleSubmit, formState: { isSubmitting }, watch, setValue } = useDropSetForm();

    const [visible, setVisible] = useState(false);
    const [openProps, setOpenProps] = useState<{ onSubmit?: (data: DropSetFormInput) => any, defaultValues?: Partial<DropSetFormInput> } | null>(null);

    useImperativeHandle(ref, () => {
        return {
            open: (onSubmit, defaultValues) => {
                if (defaultValues) {
                    reset(defaultValues);
                }
                setOpenProps({ onSubmit, defaultValues });
                setVisible(true);
            },
            close: () => {
                setOpenProps(null);
                onDismiss?.();
            }
        }
    }, [visible])

    return (
        <Modal dismissable onDismiss={() => setVisible(false)} style={{ gap: 8 }} visible={visible}>
            <Text h2>דרופסט</Text>
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

            </View>

            <Button isLoading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(async (data) => {
                await openProps?.onSubmit?.(data);
                setVisible(false);
            }, (err) => console.log(err))}>
                {openProps?.defaultValues ? 'עדכון' : 'הוספה'}
            </Button>
        </Modal>
    );
})

export default DropSetFormModal;