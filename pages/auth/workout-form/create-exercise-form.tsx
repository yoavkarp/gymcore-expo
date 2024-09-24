import { View } from "@/components/ui/View";
import { useWorkoutForm } from "@/contexts/WorkoutContext";

interface CreateExerciseFormProps {

}

const CreateExerciseForm: React.FC<CreateExerciseFormProps> = () => {

    const { control } = useWorkoutForm();

    return (
        <View>

        </View>
    );
}

export default CreateExerciseForm;