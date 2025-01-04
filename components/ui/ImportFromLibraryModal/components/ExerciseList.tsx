import React from 'react';
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { Exercise } from "@/graphql";
import FlatList from "react-native-draggable-flatlist";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import TouchableOpacity from "@/components/ui/TouchableOpacity";
import Label from "@/components/ui/Label";

interface ExerciseListItemProps {
    item: Exercise;
    selected: boolean;
    onPress: (exerciseId: string) => any;
}

export const ExerciseListItem: React.FC<ExerciseListItemProps> = ({ item, selected, onPress }) => {

    const { theme } = useTheme()
    return (
        <TouchableOpacity style={[{ padding: 5 }, selected && { backgroundColor: `${theme.colors.primary.toString()}55`, borderRadius: 8 }]} onPress={() => onPress(item.id)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>{item.name}</Text>
                <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
                    {item.machine_number && <><Label>מספר מכונה:</Label><Text>{item.machine_number}</Text></>}
                    {item.seat_height && <><Label>גובה מושב:</Label><Text>{item.seat_height}</Text></>}
                </View>
            </View>

        </TouchableOpacity>
    );
}


type ExerciseListProps = {
    onChangeSelect: (exerciseId: string | null) => any;
    exercises: Exercise[]
}

const ExerciseList: React.FC<ExerciseListProps> = ({ onChangeSelect, exercises }) => {

    const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

    const { theme } = useTheme();

    useEffect(() => {
        if (!selectedExerciseId) {
            setSelectedExerciseId(exercises?.at(0)?.id || null)
            onChangeSelect(exercises?.at(0)?.id || null)
        }
    }, [exercises])

    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: theme.spacing.sm }}>
                <Label>תרגילים</Label>
            </View>
            <FlatList
                style={{ maxHeight: 200 }}
                persistentScrollbar
                data={exercises || []}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme.colors.primary, marginBottom: 10 }} />}
                renderItem={({ item, drag, isActive }) => {
                    return (
                        <ExerciseListItem
                            selected={isActive || selectedExerciseId === item.id}
                            item={item as unknown as Exercise}
                            onPress={(exerciseId) => {
                                setSelectedExerciseId(exerciseId)
                                onChangeSelect(exerciseId)
                            }}
                        />

                    )
                }}
                keyExtractor={(item) => (item as unknown as Exercise).id}
                ListEmptyComponent={() => <Text subtitle>לא נוספו תרגילים לאימון זה</Text>}
            />
        </>
    );
}

export default ExerciseList;