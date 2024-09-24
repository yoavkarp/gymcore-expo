import { View } from "@/components/ui/View";
import { useWorkoutForm } from "@/contexts/WorkoutContext";

interface CreateIntervalFormProps {

}

const CreateIntervalForm: React.FC<CreateIntervalFormProps> = () => {

    const { control } = useWorkoutForm();

    return (
        <View>

        </View>
    );
}

export default CreateIntervalForm;