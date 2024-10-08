import Text from "@/components/ui/Text";
import { View } from "react-native";
import SetsList from "./components/SetsList";
import { useExercise } from "./components/ExerciseProvider";
import DropsetsList from "./components/DropSetsList";
import { useMemo, useState } from "react";
import { theme } from "@/theme";
import IntervalsList from "./components/IntervalsList";

const ExercisePage = () => {

    const { exercise } = useExercise();

    const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
    const selectedSet = useMemo(() => exercise.__typename === "StrengthExercise" ? exercise.sets?.find((set) => set?.id === selectedSetId) || undefined : undefined, [selectedSetId, exercise]);

    return (
        <View>
            <Text h1>{exercise.name}</Text>
            <View style={{ flexDirection: 'row', padding: theme.spacing.sm, gap: theme.spacing.sm }}>
                {exercise.__typename === "StrengthExercise" ? (
                    <>
                        <View style={{ flex: 1 }}>
                            <SetsList onSelectSet={setSelectedSetId} />
                        </View>
                        {Boolean(selectedSetId) && <View style={{ flex: 1 }}>
                            <DropsetsList dropsets={selectedSet?.dropsets || []} />
                        </View>}
                    </>
                ) : (
                    <View style={{ flex: 1 }}>
                        <IntervalsList />
                    </View>
                )}
            </View>
        </View>
    );
}

export default ExercisePage;