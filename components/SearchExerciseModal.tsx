import SearchModal from "@/components/SearchModal";
import { useState, useTransition } from "react";
import exercisesJSON from "@/assets/exercises2.json";

const SearchExerciseModal = () => {

    const [items, setItems] = useState<{ value: string, title: string }[]>([]);
    const [isPending, startTransition] = useTransition();

    const searchExercise = (text: string) => {
        startTransition(() => {
            const result: { value: string, title: string }[] = []
            if (text.trim().length > 2)
                result.push(
                    ...exercisesJSON.strength.filter((exercise) => exercise.name.he.includes(text.trim()))
                        .map((ex) => ({ value: ex.id, title: ex.name.he })).slice(0, 5)
                );

            setItems(result);
        });
    }

    return (
        <SearchModal
            placeholder="חפש תרגיל"
            title="חיפוש תרגיל מהמאגר"
            subtitle="יש להתחיל להקליד על מנת לראות תוצאות"
            searching={isPending}
            onChangeText={searchExercise} items={items} />
    );
}

export default SearchExerciseModal;