import Text from "@/components/ui/Text";
import { Alert, NativeSyntheticEvent, TextInputFocusEventData, View } from "react-native";
import SetsList from "./components/SetsList";
import { useExercise } from "./components/ExerciseProvider";
import DropsetsList from "./components/DropSetsList";
import { useEffect, useMemo, useState } from "react";
import { theme } from "@/theme";
import IntervalsList from "./components/IntervalsList";
import Section from "@/components/ui/Section";
import StrengthExerciseForm from "./components/StrengthExerciseForm";
import CardioExerciseForm from "./components/CardioExerciseForm";
import Label from "@/components/ui/Label";
import { useExerciseForm } from "./hooks/useExerciseForm";
import { Controller } from "react-hook-form";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";
import { useUpdateExerciseInWorkout } from "@/features/workout/hooks/api/useUpdateExerciseInWorkout";
import { ExerciseFormInput, useWorkout } from "@/features/workout";
import SearchExerciseModal from "@/components/SearchExerciseModal";
import { useSnackbar } from "@/contexts/SnackbarContext";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

const translateSections: any = {
    "strength": "כוח",
    "cardio": "קרדיו"
}

const ExercisePage = () => {

    const { exercise } = useExercise();
    const { workoutId } = useWorkout();
    const { handleSubmit, setValue, getValues, reset, formState: { errors, isSubmitting, dirtyFields, isDirty: isFormDirty }, control } = useExerciseForm();
    const [show] = useSnackbar();

    const { updateExerciseInWorkout } = useUpdateExerciseInWorkout(workoutId, {
        onCompleted() {
            show("התרגיל עודכן בהצלחה")
        },
        onError(err) {
            show(err.message)
        }
    });

    const onSubmit = (e: ExerciseFormInput) => {
        if (isFormDirty)
            return updateExerciseInWorkout(exercise.id, e)
    }

    const handleBlur = async (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        await handleSubmit(onSubmit, (env) => console.log(env))();
    }

    useEffect(() => {
        reset({
            type: exercise.type,
            name: exercise.name,
            xid: exercise.xid,
            machine_number: exercise.machine_number,
            seat_height: exercise.seat_height,
            notes: exercise.notes
        })
    }, [exercise])

    return (
        <View style={{ padding: theme.spacing.md, gap: theme.spacing.sm }}>
            <Section style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
                    <Label>שם התרגיל:</Label>
                    <SearchExerciseModal defaultValue={{ value: exercise.xid, title: exercise.name }} onChangeValue={async (val) => {
                        setValue("xid", val.value)
                        setValue("name", val.title)
                        await updateExerciseInWorkout(exercise.id, getValues())
                        show("התרגיל עודכן בהצלחה")
                    }} />
                </View>
                <Label>{translateSections[exercise.type.toLowerCase()]}</Label>
            </Section>

            <Section style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Controller control={control} name="notes"
                    render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => {

                        const handleChange = (val: string) => {
                            onChange(val.trim() ? val : undefined)
                        }

                        return (
                            <View style={{}}>
                                <Label>הערות על התרגיל:</Label>
                                <View style={{ flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'center' }}>
                                    <TextInput style={{ width: 500, textAlign: 'center' }} error={Boolean(error)} onBlur={handleBlur} onChangeText={handleChange} value={value || ""} />
                                    {isSubmitting && isDirty && <LoadingIndicator />}
                                </View>
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }}
                />

                <Controller control={control} name="machine_number"
                    render={({ field: { onChange, onBlur, value }, fieldState: { error, isDirty } }) => {

                        const handleChange = (val: string) => {
                            onChange(val.trim() || undefined)
                        }

                        return (
                            <View>
                                <Label>מספר מכונה:</Label>
                                <View style={{ flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'center' }}>
                                    <TextInput selectTextOnFocus style={{ width: 250, textAlign: 'center' }} error={Boolean(error)} onBlur={handleBlur} onChangeText={handleChange} value={value || ""} />
                                    {isSubmitting && isDirty && <LoadingIndicator />}
                                </View>
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }}
                />

                <Controller control={control} name="seat_height"
                    render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => {

                        const handleChange = (val: string) => {
                            onChange(val.trim() || undefined)
                        }

                        return (
                            <View>
                                <Label>גובה מושב:</Label>
                                <View style={{ flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'center' }}>
                                    <TextInput selectTextOnFocus style={{ width: 250, textAlign: 'center' }} error={Boolean(error)} onBlur={handleBlur} onChangeText={handleChange} value={value || ""} />
                                    {isSubmitting && isDirty && <LoadingIndicator />}
                                </View>
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )
                    }}
                />
            </Section>
            {exercise.__typename === "StrengthExercise" ? <StrengthExerciseForm /> : exercise.__typename === "CardioExercise" ? <CardioExerciseForm /> : null}

        </View>
    );
}

export default ExercisePage;