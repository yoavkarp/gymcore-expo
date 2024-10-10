import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useWorkout } from "@/features/workout";
import Label from "@/components/ui/Label";
import SetsList from "./SetsList";
import { useMemo, useRef, useState } from "react";
import DropsetsList from "./DropSetsList";
import { useExercise } from "./ExerciseProvider";
import { theme } from "@/theme";
import Button from "@/components/ui/Button";
import SetFormModal from "./SetFormModal";
import Section from "@/components/ui/Section";

interface StrengthSectionProps {
}

const StrengthExerciseForm: React.FC<StrengthSectionProps> = () => {

    const { workout } = useWorkout();
    const { exercise } = useExercise();
    const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
    const selectedSet = useMemo(() => exercise.__typename === "StrengthExercise" ? exercise.sets?.find((set) => set?.id === selectedSetId) || undefined : undefined, [selectedSetId, exercise]);

    const setFormModalRef = useRef<SetFormModal>(null);

    return (
        <View key="strength-section">
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: theme.spacing.sm, gap: theme.spacing.sm }}>
                    <Section style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text h2>סטים</Text>
                        <Button onPress={() => setFormModalRef.current?.open()}>הוספת סט</Button>
                    </Section>
                    {Boolean(selectedSetId) && (
                        <Section style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text h2>דרופ סטים</Text>
                            <Button onPress={() => setFormModalRef.current?.open()}>הוספת דרופסט</Button>
                        </Section>
                    )}
                </View>
                <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                    <Section style={{ flex: 1 }}>
                        <SetsList onSelectSet={setSelectedSetId} />
                    </Section>
                    {Boolean(selectedSetId) && <Section style={{ flex: 1 }}>
                        <DropsetsList setId={selectedSetId!} dropsets={selectedSet?.dropsets || []} />
                    </Section>}
                </View>
            </View>

            <SetFormModal ref={setFormModalRef} />
        </View>
    );
}

export default StrengthExerciseForm;