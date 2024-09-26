import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useWorkout } from "@/features/workout/components/WorkoutProvider";

interface WorkoutPageProps {

}

const WorkoutPage: React.FC<WorkoutPageProps> = () => {

    const { loading, data } = useWorkout();

    return (
        <View>
            <Text>
                {JSON.stringify(data, null, 2)}
            </Text>
        </View>
    );
}

export default WorkoutPage;