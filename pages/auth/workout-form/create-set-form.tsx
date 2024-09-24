import { View } from "@/components/ui/View";
import { useWorkoutForm } from "@/contexts/WorkoutContext";

interface CreateSetFormProps {

}

const CreateSetForm: React.FC<CreateSetFormProps> = () => {

    const { control } = useWorkoutForm();

    return (
        <View>

        </View>
    );
}

export default CreateSetForm;