import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useWorkout } from "@/features/workout";
import Label from "@/components/ui/Label";
import IntervalsList from "./IntervalsList";
import { useExercise } from "./ExerciseProvider";
import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import { theme } from "@/theme";
import Section from "@/components/ui/Section";

interface CardioSectionProps {
}

const CardioExerciseForm: React.FC<CardioSectionProps> = () => {

    const { workout } = useWorkout();
    const { exercise } = useExercise();
    const [selectedIntervalId, intervalSelectedIntervalId] = useState<string | null>(null);
    const selectedInterval = useMemo(() => exercise.__typename === "CardioExercise" ? exercise.intervals?.find((interval) => interval?.id === selectedIntervalId) || undefined : undefined, [selectedIntervalId, exercise]);

    return (
        <Section key="cardio-section">
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: theme.spacing.sm }}>
                    <Text h2>אינטרוולים</Text>
                    <Button>הוספת אינטרוול</Button>
                </View>
                <IntervalsList />
            </View>

        </Section>
    );
}

export default CardioExerciseForm;