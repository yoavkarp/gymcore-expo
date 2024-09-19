import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/theme';
import assert from 'node:assert';
import React, { useState, ComponentType, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { View, TouchableOpacity, Modal, FlatList, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import Text from './Text';

type SelectItem = { title: string, value: string }
export type SelectProps = {
    items: SelectItem[];
    onChangeValue?: (item: SelectItem) => void;
    defaultValue?: string;
    placeholder?: string;
    keyExtractor?: (item: SelectItem) => string;
    title?: string;
    containerStyle?: ViewProps['style']
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

export type SelectRef = {
    focus: () => void;
}

const Select = forwardRef<SelectRef, SelectProps>((props, ref) => {

    const { theme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectItem | undefined>(props.items.find((item) => props.defaultValue === item.value))
    const _styles = styles(theme);

    const touchableOpacityRef = useRef<TouchableOpacity>(null);

    const handleSelect = (item: SelectItem) => {
        setSelectedOption(item);
        props.onChangeValue?.(item);
        setIsVisible(false);
    };

    const handleBackgroundClick = () => {
        setIsVisible(false);
    };

    useImperativeHandle(ref, () => {
        return {
            focus: () => {
                return setIsVisible(true);
            }
        }
    }, [touchableOpacityRef.current])

    return (
        <View style={_styles.container}>
            <TouchableOpacity ref={touchableOpacityRef} style={[_styles.comboBox, props.containerStyle]} onPress={() => setIsVisible(true)}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>{selectedOption?.title || props.placeholder || "בחר"}</Text>
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
                            style={{ maxHeight: 350 }}
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
});

const styles = (theme: Theme) => StyleSheet.create({
    container: {

    },
    comboBox: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontSize: 20,
        writingDirection: 'rtl',
        textAlign: 'right',
        color: theme.colors.text
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