import SearchModal, { SearchResultItem } from "@/components/SearchModal";
import { useState, useTransition } from "react";
import exercisesJSON from "@/assets/exercises2.json";

type SearchExerciseModalProps = {
    onChangeValue?: (value: SearchResultItem) => void;
    defaultValue?: SearchResultItem;
}

const SearchExerciseModal: React.FC<SearchExerciseModalProps> = ({ onChangeValue, defaultValue }) => {

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
            placeholder={defaultValue?.title || "חפש תרגיל"}
            title="חיפוש תרגיל מהמאגר"
            subtitle="יש להתחיל להקליד על מנת לראות תוצאות"
            searching={isPending}
            onChangeText={searchExercise}
            items={items}
            onChangeValue={onChangeValue}
            defaultValue={defaultValue?.value}
        />
    );
}

export default SearchExerciseModal;