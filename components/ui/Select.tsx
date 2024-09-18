import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/theme';
import assert from 'node:assert';
import React, { useState, ComponentType, useEffect } from 'react';
import { View, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import Text from './Text';

type SelectItem = { title: string, value: string }
export type SelectProps = {
    items: SelectItem[];
    onChangeValue?: (item: SelectItem) => void;
    defaultValue?: string;
    placeholder?: string;
    keyExtractor?: (item: SelectItem) => string;
    title?: string;
}

type OptionProps = {
    item: SelectItem;
    handleSelect: (item: SelectItem) => void;
    selected?: boolean;
}
const Option: React.FC<OptionProps> = ({ item, handleSelect, selected }) => {
    const { theme } = useTheme();
    const _styles = styles(theme);
    return (
        <TouchableOpacity
            style={[_styles.option, selected ? _styles.selectedValue : {}]}
            onPress={() => handleSelect(item)}
        >
            <Text>{item.title}</Text>
        </TouchableOpacity>
    )
}

const Select: React.FC<SelectProps> = (props) => {

    const { theme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectItem | undefined>(props.items.find((item) => props.defaultValue === item.value))
    const _styles = styles(theme);

    const handleSelect = (item: SelectItem) => {
        setSelectedOption(item);
        props.onChangeValue?.(item);
        setIsVisible(false);
    };

    const handleBackgroundClick = () => {
        setIsVisible(false);
    };

    return (
        <View style={_styles.container}>
            <TouchableOpacity style={_styles.comboBox} onPress={() => setIsVisible(true)}>
                <Text>{selectedOption?.title || props.placeholder || "בחר"}</Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={isVisible}
                animationType="fade"
                onRequestClose={handleBackgroundClick}
            >
                <TouchableOpacity style={_styles.modalBackground} onPress={handleBackgroundClick} activeOpacity={0.9}>
                    <View style={_styles.modalContent}>
                        <Text h1>{props.title || "סימון בחירה"}</Text>
                        <Text subtitle style={{ marginBottom: 5 }}>יש ללחוץ על אחת מהאפשרויות:</Text>
                        <FlatList
                            data={props.items}
                            keyExtractor={props.keyExtractor || ((item) => item.value)}
                            renderItem={({ item }) => (
                                <Option item={item} selected={selectedOption?.value === item.value} handleSelect={handleSelect} />
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    container: {
        padding: 20,
    },
    comboBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    modalBackground: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center'
    },
    modalContent: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        width: 350
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.primary.toString() + "50",
    },
    selectedValue: {
        backgroundColor: theme.colors.primary.toString() + "20",
    }
});

export default Select;