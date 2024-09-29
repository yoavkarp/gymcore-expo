import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import SetList from "./SetList";
import IntervalList from "./IntervalList";
import { useUpdateExerciseInWorkout } from "@/features/workout/hooks/api/useUpdateExerciseInWorkout";
import { useWorkout } from "@/features/workout";
import Label from "@/components/ui/Label";

interface CardioSectionProps {
    selectedExerciseId: string | null;
}

const CardioExerciseForm: React.FC<CardioSectionProps> = ({ selectedExerciseId }) => {
    const { workoutId, workout } = useWorkout();

    return (
        <View key="cardio-section">

            {workout?.exercises?.find((ex) => ex.id === selectedExerciseId)?.notes && <>
                <Label>הערות: </Label>
                <Text>{workout?.exercises?.find((ex) => ex.id === selectedExerciseId)?.notes}</Text>
            </>}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text h2>אינטרוולים</Text>
            </View>

            <IntervalList selectedExerciseId={selectedExerciseId} onChangeSelect={(item) => console.log("INTERVAL SELECTED", item)} />
        </View>
    );
}

export default CardioExerciseForm;