import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useWorkoutForm } from "@/contexts/WorkoutContext";
import { useMemo, useState } from "react";
import TextInput from "@/components/ui/TextInput";
import Label from "@/components/ui/Label";
import { Controller } from "react-hook-form";
import Select from "@/components/ui/Select";
import React from "react";
import ExerciseList from "./lists/exercise-list";
import { ExerciseType } from "@/graphql";
import StrengthSection from "./sections/strength-section";

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
    const { control, watch, setValue } = useWorkoutForm();
    const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

    const [exercises] = [watch("exercises") || {}, watch("exercisesOrder") || []];
    const selectedExercise = useMemo(() => selectedExerciseId ? exercises?.[selectedExerciseId] : null, [selectedExerciseId])

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
                    </View>
                </View>
                {selectedExercise && <View style={{ flexBasis: "48%", paddingTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text h1>{selectedExercise?.name}</Text>
                        <Select
                            items={exerciseTypes}
                            defaultValue="strength"
                            onChangeValue={({ value }) => setValue(`exercises.${selectedExerciseId}.type`, value as ExerciseType)}
                        />
                    </View>
                    {selectedExercise.type === ExerciseType.Strength && <StrengthSection selectedExerciseId={selectedExerciseId} />}
                </View>}
            </View>

        </View>
    );
}

export default MainWorkoutScreen;