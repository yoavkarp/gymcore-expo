import SearchExerciseModal from "@/components/SearchExerciseModal";
import { SearchResultItem } from "@/components/SearchModal";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Text from "@/components/ui/Text";
import { useWorkoutForm } from "@/contexts/WorkoutContext";
import { randomUUID } from "expo-crypto";
import { useState } from "react";
import { set } from "react-hook-form";

interface NewExerciseModalProps {
    onDismiss?: () => void;
}

const NewExerciseModal: React.FC<NewExerciseModalProps> = ({ onDismiss }) => {

    const [selectedExercise, setSelectedExercise] = useState<SearchResultItem | null>(null);
    const { setValue, watch } = useWorkoutForm();
    const exercises = watch("exercises");

    return (
        <Modal dismissable onDismiss={onDismiss} style={{ gap: 8 }} visible>
            <Text h1>הוספת תרגיל</Text>
            <SearchExerciseModal onChangeValue={setSelectedExercise} />
            <Button onPress={() => {
                // setValue("exercises", [...(getValues("exercises") || []), { name: }]);
                if (selectedExercise) {
                    setValue("exercises", [...(exercises || []), { name: selectedExercise.title, id: randomUUID() }])
                    onDismiss?.();
                }
            }}>הוספה</Button>
        </Modal>
    );
}

export default NewExerciseModal;