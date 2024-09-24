import { View } from "@/components/ui/View";
import { useWorkoutForm } from "@/contexts/WorkoutContext";
import { Controller } from "react-hook-form";

interface CreateWorkoutFormProps {

}

const CreateWorkoutForm: React.FC<CreateWorkoutFormProps> = () => {

    const { control } = useWorkoutForm();

    return (
        <View>
            <Controller control={control} name="name"
                render={({ field }) => (
                    <input {...field} placeholder="שם האימון" />
                )}
            />
        </View>
    );
}

export default CreateWorkoutForm;