import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import Label from "@/components/ui/Label";
import React, { useEffect, useState } from "react";
import ExerciseList from "./components/ExerciseList";
import { useGetWorkoutByIdQuery } from "@/graphql";
import Section from "@/components/ui/Section";
import { theme } from "@/theme";
import StrengthExerciseSection from "./components/StrengthExerciseSection";
import CardioExerciseSection from "./components/CardioExerciseSection";
import { useClub } from "@/features/club";
import LoadingIndicator from "../LoadingIndicator";
import Button from "../Button";

type WorkoutViewProps = {
    workoutId: string;
    onPressBack: () => any;
    onPressImport: (workoutId: string) => any;
}

const WorkoutView: React.FC<WorkoutViewProps> = ({ workoutId, onPressBack, onPressImport }) => {

    const { data, error, loading } = useGetWorkoutByIdQuery({ variables: { workoutId } })
    const workout = data?.getWorkoutById;

    const [selectedExerciseId, setSelectedExerciseId] = React.useState<string | null>(null);

    const [isPending, setIsPending] = useState(false);

    const selectedExercise = workout?.exercises?.find((exercise) => exercise.id === selectedExerciseId);

    if (loading) {
        return <LoadingIndicator />
    }

    if (error) {
        return <Text error>{error.message}</Text>
    }

    return (
        <View style={{ padding: theme.spacing.sm, gap: theme.spacing.sm }}>
            <Section>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                        <Label>שם האימון:</Label>
                        <Text>{workout?.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
                        <Button isLoading={isPending} disabled={isPending} onPress={async () => {
                            setIsPending(true)
                            await onPressImport(workoutId)
                            setIsPending(false)
                        }}>ייבוא</Button>
                        <Button onPress={onPressBack}>הקודם</Button>
                    </View>

                </View>
            </Section>
            {workout?.notes && <Section>
                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'flex-start' }}>
                    <Label>הערות:</Label>
                    <Text>{workout?.notes}</Text>
                </View>
            </Section>}

            <Section>
                <ExerciseList exercises={workout?.exercises || []} onChangeSelect={setSelectedExerciseId} />
            </Section>

            {selectedExercise?.__typename === "StrengthExercise" ? (
                <StrengthExerciseSection exercise={selectedExercise} />
            ) : selectedExercise?.__typename === "CardioExercise" && <CardioExerciseSection exercise={selectedExercise} />}
        </View>
    );
}

export default WorkoutView;