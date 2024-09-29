import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import SetList from "./SetList";
import { useWorkout } from "@/features/workout";
import Label from "@/components/ui/Label";

interface StrengthSectionProps {
    selectedExerciseId: string | null;
}

const StrengthExerciseForm: React.FC<StrengthSectionProps> = ({ selectedExerciseId }) => {

    const { workout } = useWorkout();

    return (
        <View key="strength-section">

            {workout?.exercises?.find((ex) => ex.id === selectedExerciseId)?.notes && <>
                <Label>הערות: </Label>
                <Text>{workout?.exercises?.find((ex) => ex.id === selectedExerciseId)?.notes}</Text>
            </>}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text h2>סטים</Text>
            </View>

            <SetList selectedExerciseId={selectedExerciseId} onChangeSelect={(item) => console.log("SET SELECTED", item)} />
        </View>
    );
}

export default StrengthExerciseForm;