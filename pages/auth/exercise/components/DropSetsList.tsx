import { theme } from '@/theme';
import React, { useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import { useExercise } from './ExerciseProvider';
import Text from '@/components/ui/Text';
import { StrengthExerciseDropSet } from '@/graphql'
import { parameterToString } from '@/utils/parameter-to-string';
import Button from '@/components/ui/Button';
import TouchableOpacity from '@/components/ui/TouchableOpacity';
import DropSetFormModal from './DropsetFormModal';

type DropsetsListProps = {
    onSelectDropset?: (dropsetId: string) => void;
    dropsets?: StrengthExerciseDropSet[]
}

const DropsetsList: React.FC<DropsetsListProps> = ({ onSelectDropset, dropsets = [] }) => {

    const { exercise } = useExercise();
    const [selectedDropsetId, setSelectedDropsetId] = useState<string | null>(null);

    const dropsetFormModalRef = useRef<DropSetFormModal>(null);

    const handleDropsetPressed = (setId: string) => {
        setSelectedDropsetId(setId);
        onSelectDropset?.(setId);
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
                    <View style={[{ flex: 0.45 }]}>
                        <Text style={Styles.thText} center >חזרות</Text>
                    </View>
                    <View style={[{ flex: 0.45 }]}>
                        <Text style={Styles.thText} center>משקל</Text>
                    </View>
                </View>
                <FlatList
                    removeClippedSubviews
                    data={dropsets}
                    keyExtractor={(item) => item?.id!}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => handleDropsetPressed(item?.id!)} style={[Styles.tr, selectedDropsetId === item?.id && Styles.selectedTr]}>
                            <View style={{ flex: 0.1 }}>
                                <Text center>{index + 1}</Text>
                            </View>
                            <View style={{ flex: 0.45 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.reps)}
                                </Text>
                            </View>
                            <View style={{ flex: 0.45 }}>
                                <Text center style={Styles.tdText}>
                                    {parameterToString(item?.weight)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    ListEmptyComponent={
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: theme.spacing.lg, gap: theme.spacing.sm }}>
                            <Text>אין דרופ סטים להצגה</Text>
                            <Button onPress={() => dropsetFormModalRef.current?.open()}>צור דרופסט חדש</Button>
                        </View>
                    }
                />
            </View>
            <DropSetFormModal ref={dropsetFormModalRef} />
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

export default DropsetsList;