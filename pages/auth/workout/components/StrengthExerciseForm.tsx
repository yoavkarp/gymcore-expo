import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import SetList from "./SetList";

interface StrengthSectionProps {
    selectedExerciseId: string | null;
}

const StrengthExerciseForm: React.FC<StrengthSectionProps> = ({ selectedExerciseId }) => {
    return (
        <View key="strength-section">
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text h2>סטים</Text>
            </View>
            <SetList selectedExerciseId={selectedExerciseId} onChangeSelect={(item) => console.log("SET SELECTED", item)} />
        </View>
    );
}

export default StrengthExerciseForm;