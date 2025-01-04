import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import TextInput from "@/components/ui/TextInput";
import Label from "@/components/ui/Label";
import { Controller } from "react-hook-form";
import React from "react";
import Button from "@/components/ui/Button";
import { WorkoutFormInput, useWorkoutForm } from "./hooks/useWorkoutForm";
import ExerciseList from "./components/ExerciseList";
import { useWorkout } from "@/features/workout/components/WorkoutProvider";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUpdateWorkout } from "@/features/workout/hooks/api/useUpdateWorkout";
import StrengthExerciseForm from "../exercise/components/StrengthExerciseForm";
import CardioExerciseForm from "../exercise/components/CardioExerciseForm";
import { useAddWorkoutToLibraryMutation } from "@/graphql";
import { router } from "expo-router";
import Section from "@/components/ui/Section";
import { theme } from "@/theme";
import StrengthExerciseSection from "./components/StrengthExerciseSection";
import CardioExerciseSection from "./components/CardioExerciseSection";
import { useClub } from "@/features/club";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

const WorkoutPage: React.FC = () => {


    const { workout } = useWorkout();
    const { updateWorkout, result } = useUpdateWorkout(workout!.id);
    const [show] = useSnackbar()
    const [selectedExerciseId, setSelectedExerciseId] = React.useState<string | null>(null);
    const { currentTrainer } = useClub()
    const [addWorkoutToLibrary] = useAddWorkoutToLibraryMutation({
        onCompleted(data) {
            show("האימון נוסף לספרייה")
        },
        onError(e) {
            show("שגיאה בהוספת האימון לספרייה", "error")
        },
        variables: {
            workoutId: workout?.id!,
            trainerId: currentTrainer?.id!
        }
    });

    const handleBlur = async (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        await handleSubmit(onSubmitUpdateWorkout, (env) => console.log(env))();
    }

    const selectedExercise = workout?.exercises?.find((exercise) => exercise.id === selectedExerciseId);

    const { control, formState: { isDirty, dirtyFields, isSubmitting }, handleSubmit, reset } = useWorkoutForm({
        defaultValues: {
            name: workout?.name,
            notes: workout?.notes,
        }
    });

    const onSubmitUpdateWorkout = async (data: WorkoutFormInput) => {
        try {
            const res = await updateWorkout(
                Object.keys(dirtyFields).reduce<any>((acc, key) => {
                    acc[key] = data[key as keyof WorkoutFormInput];
                    return acc;
                }, {})
            )
            show("האימון עודכן בהצלחה")
            reset({
                name: res.data?.updateWorkout?.name,
                notes: res.data?.updateWorkout?.notes
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={{ padding: theme.spacing.sm, gap: theme.spacing.sm }}>
            <Section>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Controller control={control} name="name"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error, isDirty } }) => {

                            const handleChange = (val: string) => {
                                onChange(val.trim() ? val : "")
                            }

                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                                    <Label style={{}}>שם האימון:</Label>
                                    <TextInput readOnly={isSubmitting} style={{ width: 300, textAlign: 'center' }} error={Boolean(error)} onChangeText={handleChange} onBlur={handleBlur} value={value} />
                                    {isSubmitting && isDirty && <LoadingIndicator />}
                                    {error && <Text error>{error.message}</Text>}
                                </View>
                            )
                        }}
                    />
                    {!workout?.library && <Button onPress={() => addWorkoutToLibrary()}>הוספה לספרייה</Button>}
                </View>
                <Controller control={control} name="notes"
                    render={({ field: { onChange, onBlur, value }, fieldState: { error, isDirty } }) => {

                        const handleChange = (val: string) => {
                            onChange(val.trim() ? val : undefined)
                        }

                        return (
                            <View style={{ alignSelf: 'flex-start', flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'center', marginTop: 4 }}>
                                <Label>הערות על האימון:</Label>
                                <TextInput readOnly={isSubmitting} style={{ width: 960, textAlign: 'right', maxHeight: 100 }} error={Boolean(error)} onChangeText={handleChange} onBlur={handleBlur} value={value || ""} />
                                {isSubmitting && isDirty && <LoadingIndicator />}
                                {error && <Text error>{error.message}</Text>}
                            </View>

                        )
                    }}
                />
            </Section>

            <Section>
                <ExerciseList onChangeSelect={setSelectedExerciseId} />
            </Section>

            {selectedExercise?.__typename === "StrengthExercise" ? (
                <StrengthExerciseSection exercise={selectedExercise} />
            ) : selectedExercise?.__typename === "CardioExercise" && <CardioExerciseSection exercise={selectedExercise} />}
        </View>
    );
}

export default WorkoutPage;