import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import TextInput from "@/components/ui/TextInput";
import { View } from "@/components/ui/View";
import { useCreateWorkout } from "@/features/workout";
import { useState } from "react";

interface CreateWorkoutFormProps {

}

const CreateWorkoutForm: React.FC<CreateWorkoutFormProps> = () => {

    const { setValue } = useCreateWorkout();
    const [workoutName, setWorkoutName] = useState("");

    return (
        <View style={{ gap: 8 }}>
            <View>
                <Label>שם האימון</Label>
                <TextInput onChangeText={setWorkoutName} />
            </View>

            <Button onPress={() => setValue("name", workoutName)}>הבא</Button>
        </View>
    );
}

export default CreateWorkoutForm;