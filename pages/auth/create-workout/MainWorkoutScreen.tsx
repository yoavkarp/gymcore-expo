import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useCreateWorkout } from "@/features/workout";
import { useMemo, useState } from "react";
import TextInput from "@/components/ui/TextInput";
import Label from "@/components/ui/Label";
import { Controller } from "react-hook-form";
import Select from "@/components/ui/Select";
import React from "react";
import ExerciseList from "./components/ExerciseList";
import { CreateExerciseInput, ExerciseType } from "@/graphql";
import StrengthExerciseForm from "./components/StrengthExerciseForm";
import Button from "@/components/ui/Button";
import { useClub } from "@/features/club";

const exerciseTypes = [{
    title: "קרדיו",
    value: "CARDIO"
}, {
    title: "כוח",
    value: "STRENGTH"
}];

interface MainWorkoutScreenProps {

}

const MainWorkoutScreen: React.FC<MainWorkoutScreenProps> = () => {
    const { control, watch, setValue, submitForm, formState: { errors, isSubmitSuccessful } } = useCreateWorkout();
    const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

    const exercises = watch("exercises");
    const selectedExercise = exercises?.find((exercise) => exercise.id === selectedExerciseId)

    const { currentTrainer } = useClub();


    return (
        <View style={{ padding: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text h1>מסך יצירת אימון</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 20 }}>
                <View style={{ flexBasis: "50%", gap: 20 }}>
                    <Controller control={control} name="name"
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                            <View style={{ alignSelf: 'flex-start' }}>
                                <Label>שם האימון</Label>
                                <TextInput style={{ width: 300, textAlign: 'center' }} error={Boolean(error)} onChangeText={onChange} onBlur={onBlur} value={value} />
                                {error && <Text error>{error.message}</Text>}
                            </View>
                        )}
                    />
                    <View>
                        <Label>רשימת תרגילים</Label>
                        <ExerciseList onChangeSelect={setSelectedExerciseId} />
                        <Button onPress={submitForm(currentTrainer?.id!)}>סיום</Button>
                        <Text>
                            {JSON.stringify(errors, null, 2)}
                        </Text>
                    </View>
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
                </View>}
            </View>

        </View>
    );
}

export default MainWorkoutScreen;