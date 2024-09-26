import { Measurement } from "@/graphql";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Label from "@/components/ui/Label";
import Text from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import { View } from "@/components/ui/View";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useCreateMeasurementForMemberMutation } from "@/graphql";
import { CreateMeasurementFormValues, useCreateMeasurementForm } from "@/features/measurements/hooks/useCreateMeasurementForm";
import { Controller } from "react-hook-form";

interface MemberMeasurementsCardProps {
    measurement?: DeepPartial<Measurement> | null;
    memberId: string;
}



const MemberMeasurementsCard: React.FC<MemberMeasurementsCardProps> = ({ measurement, memberId }) => {

    const { control, handleSubmit, formState: { isSubmitting, errors, isDirty, dirtyFields }, reset, watch } = useCreateMeasurementForm({
        defaultValues: {
            height: measurement?.height || undefined,
            weight: measurement?.weight || undefined,
            heart_rate: measurement?.heart_rate || undefined,
            fat: measurement?.fat || undefined
        }
    })

    const [createMeasurementForMember, { error }] = useCreateMeasurementForMemberMutation();
    const [showToast] = useSnackbar();

    const onSubmit = async (data: CreateMeasurementFormValues) => {
        await createMeasurementForMember({
            variables: {
                input: data,
                memberId
            },
            onCompleted() {
                showToast("המדד נוסף בהצלחה!")
            },
            onError(err) {
                console.log(err.stack)
                showToast("שגיאה בהוספת מדד: " + err.message, "error")
            },
            update(cache, { data }) {
                const b = cache.modify({
                    id: `Member:${memberId}`,
                    fields: {
                        measurement() {
                            return data?.createMeasurementForMember
                        }
                    },
                })

                reset({
                    height: data?.createMeasurementForMember?.height || undefined,
                    weight: data?.createMeasurementForMember?.weight || undefined,
                    heart_rate: data?.createMeasurementForMember?.heart_rate || undefined,
                    fat: data?.createMeasurementForMember?.fat || undefined
                })
            }
        })
    }

    const onInvalid = (errors: any) => {

    }

    return (
        <Card style={{ flexDirection: 'row', shadowOpacity: 0, elevation: 2, gap: 40, alignItems: 'center' }}>
            <View>
                <Text h1>מדדים</Text>
                {!measurement && <Text>
                    לא הוזן מדד עבור מנוי זה
                </Text>}
            </View>

            <View style={{ gap: 5, alignItems: 'center' }}>
                <Label>גובה (ס״מ)</Label>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value }, fieldState }) => {
                        return <TextInput keyboardType="number-pad" onBlur={onBlur} value={value ? value.toString() : ""} onChangeText={(val) => onChange(Number(val) || undefined)} error={Boolean(fieldState.error)} style={{ width: 100, textAlign: 'center' }} maxLength={3} />
                    }}
                    name="height"
                />
            </View>

            <View style={{ gap: 5, alignItems: 'center' }}>
                <Label>משקל (ק״ג)</Label>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value }, fieldState }) => {
                        return <TextInput keyboardType="number-pad" onBlur={onBlur} value={value ? value.toString() : ""} onChangeText={(val) => onChange(Number(val) || undefined)} error={Boolean(fieldState.error)} style={{ width: 100, textAlign: 'center' }} maxLength={3} />
                    }}
                    name="weight"
                />
            </View>

            <View style={{ gap: 5, alignItems: 'center' }}>
                <Label>דופק מנוחה (BPM)</Label>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value }, fieldState }) => {
                        return <TextInput keyboardType="number-pad" onBlur={onBlur} value={value ? value.toString() : ""} onChangeText={(val) => onChange(Number(val) || undefined)} error={Boolean(fieldState.error)} style={{ width: 100, textAlign: 'center' }} maxLength={3} />
                    }}
                    name="heart_rate"
                />
            </View>

            <View style={{ gap: 5, alignItems: 'center' }}>
                <Label>אחוזי שומן (%)</Label>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value }, fieldState }) => {
                        return <TextInput keyboardType="number-pad" onBlur={onBlur} value={value ? value.toString() : ""} onChangeText={(val) => onChange(Number(val) || undefined)} error={Boolean(fieldState.error)} style={{ width: 100, textAlign: 'center' }} maxLength={3} />
                    }}
                    name="fat"
                />
            </View>

            <Button disabled={isSubmitting || !isDirty} isLoading={isSubmitting} onPress={handleSubmit(onSubmit, (err) => showToast(err[Object.keys(err)[0] as keyof typeof err]?.message!, "error"))}>
                צור
            </Button>
        </Card>
    );
}

export default MemberMeasurementsCard;