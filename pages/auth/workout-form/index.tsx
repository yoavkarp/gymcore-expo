import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import CreateWorkoutForm from "./create-workout-form";

interface WorkoutFormPageProps {

}

const WorkoutFormPage: React.FC<WorkoutFormPageProps> = () => {


    return (
        <View>
            <Text h1>יצירת אימון חדש</Text>
            <CreateWorkoutForm />
        </View>
    );
}

export default WorkoutFormPage;