import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/theme';
import React, { useState } from 'react';
import { TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Text from './ui/Text';
import TextInput, { TextInputRef } from './ui/TextInput';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from './ui/Modal';
import { View } from './ui/View';

export type SearchResultItem = { title: string, value: string }
export type SearchModalProps = {
    items: SearchResultItem[];
    onChangeValue?: (item: SearchResultItem) => any;
    onChangeText?: (text: string) => any;
    searching?: boolean;
    defaultValue?: string;
    placeholder?: string;
    keyExtractor?: (item: SearchResultItem) => string;
    title?: string;
    subtitle?: string;
    dismissable?: boolean;
}

type OptionProps = {
    item: SearchResultItem;
    handleSelect: (item: SearchResultItem) => void;
    selected?: boolean;
}

const Option: React.FC<OptionProps> = ({ item, handleSelect, selected }) => {
    const { theme } = useTheme();
    const _styles = styles(theme);
    return (
        <TouchableOpacity
            style={[_styles.option, selected ? _styles.selectedValue : {}, { zIndex: 10 }]}
            onPress={() => handleSelect(item)}
        >
            <Text>{item.title}</Text>
        </TouchableOpacity>
    )
}

const SearchModal: React.FC<SearchModalProps> = (props) => {

    const { theme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SearchResultItem | undefined>(props.items.find((item) => props.defaultValue === item.value))
    const _styles = styles(theme);
    const searchInputRef = React.createRef<TextInputRef>();

    const handleSelect = (item: SearchResultItem) => {
        setSelectedOption(item);
        props.onChangeValue?.(item);
        setIsVisible(false);
    };

    return (
        <View style={_styles.container}>
            <TouchableOpacity style={_styles.comboBox} onPress={() => setIsVisible(true)}>
                <Text>{selectedOption?.title || props.placeholder || "בחר"}</Text>
            </TouchableOpacity>

            <Modal visible={isVisible} onShow={() => {
                setTimeout(() => {
                    searchInputRef.current?.focus();
                }, 100);
            }} dismissable={props.dismissable} onDismiss={() => setIsVisible(false)}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text h1>{props.title || "חיפוש"}</Text>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => setIsVisible(false)}>
                        <MaterialIcons name="close" size={30} />
                    </TouchableOpacity>
                </View>
                <Text subtitle style={{ marginBottom: 5 }}>{props.subtitle || "תיבת חיפוש:"}</Text>
                <TextInput defaultValue={selectedOption?.title} ref={searchInputRef} onChangeText={props.onChangeText} />

                <FlatList
                    keyboardShouldPersistTaps="always"
                    data={props.items}
                    keyExtractor={props.keyExtractor || ((item) => item.value ? item.value : "1")}
                    renderItem={({ item }) => (
                        <Option item={item} selected={selectedOption?.value === item.value} handleSelect={handleSelect} />
                    )}
                />
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
        padding: 20,
        width: 500
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

export default SearchModal;