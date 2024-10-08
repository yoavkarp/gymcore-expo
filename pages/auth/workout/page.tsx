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
import Select from "@/components/ui/Select";
import StrengthExerciseForm from "./components/StrengthExerciseForm";
import CardioExerciseForm from "./components/CardioExerciseForm";
import { useAddWorkoutToLibraryMutation } from "@/graphql";
import { router } from "expo-router";

const WorkoutPage: React.FC = () => {


    const { workout } = useWorkout();
    const { updateWorkout, result } = useUpdateWorkout(workout!.id);
    const [show] = useSnackbar()
    const [selectedExerciseId, setSelectedExerciseId] = React.useState<string | null>(null);
    const [addWorkoutToLibrary] = useAddWorkoutToLibraryMutation({
        onCompleted(data) {
            show("האימון נוסף לספרייה")
        },
        onError(e) {
            show("שגיאה בהוספת האימון לספרייה", "error")
        },
        variables: {
            workoutId: workout?.id!
        }
    });

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
        <View style={{ padding: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text h1>אימון</Text>
            </View>

            {!workout?.library && <Button onPress={() => addWorkoutToLibrary()}>Add To Library</Button>}

            <View style={{ flexDirection: 'row', gap: 20 }}>
                <View style={{ flexBasis: "50%", gap: 20 }}>
                    <Controller control={control} name="name"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error, isDirty } }) => (
                            <View style={{ alignSelf: 'flex-start' }}>
                                <Label>שם האימון</Label>
                                <TextInput readOnly={isSubmitting} style={{ width: 300, textAlign: 'center' }} error={Boolean(error)} onChangeText={onChange} onBlur={onBlur} value={value} />
                                {isDirty && <Button isLoading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(onSubmitUpdateWorkout)}>שמור</Button>}
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller control={control} name="notes"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error, isDirty } }) => (
                            <View style={{ alignSelf: 'flex-start' }}>
                                <Label>הערות</Label>
                                <TextInput readOnly={isSubmitting} multiline numberOfLines={3} style={{ width: 500, textAlign: 'right', maxHeight: 100 }} error={Boolean(error)} onChangeText={onChange} onBlur={onBlur} value={value || ""} />
                                {isDirty && <Button isLoading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(onSubmitUpdateWorkout)}>שמור</Button>}
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )}
                    />
                    <View style={{ maxHeight: 350 }}>
                        <Label>רשימת תרגילים</Label>
                        <ExerciseList exercises={workout?.exercises || []} onChangeSelect={(e) => router.push(`/workout/${workout?.id}/${e}`)} />
                    </View>

                </View>
                {selectedExercise && <View style={{ flexBasis: "48%", paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text h1>{selectedExercise?.name}</Text>
                    </View>
                    {selectedExercise.__typename === "StrengthExercise" ? <StrengthExerciseForm selectedExerciseId={selectedExerciseId} />
                        : selectedExercise.__typename === "CardioExercise" && <CardioExerciseForm selectedExerciseId={selectedExerciseId} />}
                </View>}
            </View>
        </View>
    );
}

export default WorkoutPage;