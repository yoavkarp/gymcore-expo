import { theme } from '@/theme';
import React, { useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import { useExercise } from './ExerciseProvider';
import Text from '@/components/ui/Text';
import { parameterToString } from '@/utils/parameter-to-string';
import Button from '@/components/ui/Button';
import TouchableOpacity from '@/components/ui/TouchableOpacity';
import SetFormModal from './SetFormModal';

type SetsListProps = {
    onSelectSet?: (setId: string) => void;
}

const SetsList: React.FC<SetsListProps> = ({ onSelectSet }) => {

    const { exercise } = useExercise();
    const [selectedSetId, setSelectedSetId] = useState<string | null>(null);

    const setFormModalRef = useRef<SetFormModal>(null);

    const handleSetPressed = (setId: string) => {
        setSelectedSetId(setId);
        onSelectSet?.(setId);
    }

    if (exercise.__typename !== "StrengthExercise") {
        return null;
    }

    return (
        <View style={Styles.container}>
            <View>
                <View style={Styles.header}>
                    <View style={[{ flex: 0.1 }]}>
                        <Text style={Styles.thText} center>#</Text>
                    </View>
                    <View style={[{ flex: 0.3 }]}>
                        <Text style={Styles.thText} center >חזרות</Text>
                    </View>
                    <View style={[{ flex: 0.3 }]}>
                        <Text style={Styles.thText} center>משקל</Text>
                    </View>
                    <View style={[{ flex: 0.3 }]}>
                        <Text style={Styles.thText} center>מנוחה</Text>
                    </View>
                </View>
                <FlatList
                    removeClippedSubviews
                    data={exercise.sets}
                    keyExtractor={(item) => item?.id!}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => handleSetPressed(item?.id!)} style={[Styles.tr, selectedSetId === item?.id && Styles.selectedTr]}>
                            <View style={{ flex: 0.1 }}>
                                <Text center>{index + 1}</Text>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.reps)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.weight)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.3 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.rest)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    ListEmptyComponent={
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: theme.spacing.lg, gap: theme.spacing.sm }}>
                            <Text>אין סטים להצגה</Text>
                            <Button onPress={() => setFormModalRef.current?.open()}>צור סט חדש</Button>
                        </View>
                    }
                />
            </View>
            <SetFormModal ref={setFormModalRef} />
        </View>
    )

}

const Styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row', backgroundColor: theme.colors.secondary, paddingVertical: theme.spacing.sm, borderRadius: 12
    },
    thText: {
        color: theme.colors.background
    },
    tr: {
        flexDirection: 'row', paddingVertical: theme.spacing.sm
    },
    tdText: {

    },
    selectedTr: {
        backgroundColor: theme.colors.warning
    }
})

export default SetsList;