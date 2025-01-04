import SearchModal, { SearchResultItem } from "@/components/SearchModal";
import { useEffect, useState, useTransition } from "react";
import exercisesJSON from "@/assets/exercises2.json";
import { useSearchExercisesLazyQuery } from "@/graphql";

type SearchExerciseModalProps = {
    onChangeValue?: (value: SearchResultItem) => any;
    defaultValue?: SearchResultItem;
}

const translate_with = {
    machine: "מכונה",
    dumbbells: "משקולות",
    barbell: "מוט",
    wBarbell: "מוט W",
    cable: "כבל",
    bodyWeight: "משקל גוף",
    olympicBarble: "מוט אולימפי",
    plate: "פלטה",
    rubberBand: "גומיה",
    "treadmill": "הליכון"
}

const SearchExerciseModal: React.FC<SearchExerciseModalProps> = ({ onChangeValue, defaultValue }) => {

    const [items, setItems] = useState<{ value: string, title: string }[]>([]);
    const [isPending, startTransition] = useTransition();
    const [text, setText] = useState("");

    const [searchExerciseQuery, { }] = useSearchExercisesLazyQuery({
        fetchPolicy: 'cache-first'
    });

    useEffect(() => {

        const sanitized = text.trim().toLowerCase();

        console.log("HRE");

        let to = setTimeout(() => {
            console.log("EXERCUTED");
            searchExerciseQuery({
                variables: {
                    query: sanitized
                },
                onCompleted(data) {
                    console.log(data);
                    setItems(data.searchExercises?.items?.map((item) => ({
                        value: item.id,
                        title: item.hebrew
                    })) || [])
                },
                onError(err) {
                    console.error(err)
                }
            })
        }, 800)

        return () => {
            clearTimeout(to)
        }
    }, [text])


    return (
        <SearchModal
            placeholder={defaultValue?.title || "חפש תרגיל"}
            title="חיפוש תרגיל מהמאגר"
            subtitle="יש להתחיל להקליד על מנת לראות תוצאות"
            searching={isPending}
            onChangeText={setText}
            items={items}
            onChangeValue={onChangeValue}
        />
    );
}

export default SearchExerciseModal;