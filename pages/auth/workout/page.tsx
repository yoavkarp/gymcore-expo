import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import TextInput from "@/components/ui/TextInput";
import Label from "@/components/ui/Label";
import { Controller } from "react-hook-form";
import React from "react";
import Button from "@/components/ui/Button";
import { UpdateWorkoutFormInput, useUpdateWorkoutForm } from "./hooks/useUpdateWorkoutForm";
import ExerciseList from "./components/ExerciseList";
import { useWorkout } from "@/features/workout/components/WorkoutProvider";
import { useSnackbar } from "@/contexts/SnackbarContext";

const WorkoutPage: React.FC = () => {


    const { updateWorkout, workout } = useWorkout();
    const [show] = useSnackbar()

    const { control, formState: { isDirty, dirtyFields }, handleSubmit, reset } = useUpdateWorkoutForm({
        defaultValues: {
            name: workout?.name,
            notes: workout?.notes,
        }
    });

    const onSubmitUpdateWorkout = async (data: UpdateWorkoutFormInput) => {
        try {
            const res = await updateWorkout(
                Object.keys(dirtyFields).reduce<any>((acc, key) => {
                    acc[key] = data[key as keyof UpdateWorkoutFormInput];
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
                <Text h1>מסך יצירת אימון</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 20 }}>
                <View style={{ flexBasis: "50%", gap: 20 }}>
                    <Controller control={control} name="name"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error, isDirty } }) => (
                            <View style={{ alignSelf: 'flex-start' }}>
                                <Label>שם האימון</Label>
                                <TextInput style={{ width: 300, textAlign: 'center' }} error={Boolean(error)} onChangeText={onChange} onBlur={onBlur} value={value} />
                                {isDirty && <Button onPress={handleSubmit(onSubmitUpdateWorkout)}>שמור</Button>}
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )}
                    />
                    <View>
                        <Label>רשימת תרגילים</Label>
                        <ExerciseList exercises={workout?.exercises || []} onChangeSelect={(e) => console.log(e)} />
                    </View>
                    {/* 
                </View>
                {selectedExercise && <View style={{ flexBasis: "48%", paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text h1>{selectedExercise?.name}</Text>
                        <Select
                            items={exerciseTypes}
                            defaultValue="strength"
                            onChangeValue={({ value }) => setValue(`exercises.${exercises.indexOf(selectedExercise)}.type`, value as ExerciseType)}
                        />
                    </View>
                    {selectedExercise.type === ExerciseType.Strength && <StrengthExerciseForm selectedExerciseId={selectedExerciseId} />}
                </View>} */}
                </View>
            </View>

        </View>
    );
}

export default WorkoutPage;