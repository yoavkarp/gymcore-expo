import { theme } from "@/paper.theme";
import { useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, LayoutRectangle, Pressable, ScrollView, View } from "react-native";
import { Button, List, Modal, Portal, Text, TextInput, TextInputProps } from "react-native-paper"
import { MaterialIcons } from '@expo/vector-icons'
const _data = ["123412341234123412341234", "567856785678567856785678", "123123123123123123123", "1212121212121212121212"]

type ComboboxProps = {
    data?: string[];
    placeholder?: string;
    style?: TextInputProps['style'];
    onChangeText?: (text: string) => any;
    isPending?: boolean;
    renderItem?: (item: string) => React.JSX.Element;
}



const Combobox: React.FC<ComboboxProps> = ({ data = _data, placeholder, style, onChangeText, renderItem, isPending = false }) => {
    const [visible, setVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [textInputLayout, setTextInputLayout] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });
    const scrollViewRef = useRef<ScrollView>(null);
    const onChangeValue = async (text: string) => {
        setSearchText(text);

        if (!text.trim()) {
            setVisible(false);
            setSuggestions([]);
            return;
        }

        await onChangeText?.(text.trim());

        if (data.length) {
            setVisible(true);
            setSuggestions(data);
        }
        else {
            setVisible(false);
            setSuggestions([]);
        }
    }

    const renderItemDefault = (suggestion: string) => (
        <List.Item style={{ borderBottomWidth: 1, marginHorizontal: 10, borderBottomColor: theme.colors.primary }} key={suggestion} onPress={() => {
            setSearchText(suggestion);
            setVisible(false)
        }} title={suggestion}></List.Item>
    )

    return (
        <View style={{ height: '100%' }}>
            <View style={{ flexDirection: 'row' }}>
                <TextInput left={isPending ? <MaterialIcons color="#000" size={20} name="swap-horizontal-circle" /> : null} placeholder={placeholder} mode="outlined" style={[{ minWidth: 200 }, style]} onLayout={(e) => setTextInputLayout(e.nativeEvent.layout)} value={searchText} onChangeText={onChangeValue} />
            </View>
            <Pressable onPress={() => {
                if (Keyboard.isVisible()) Keyboard.dismiss()
                else {
                    setVisible(false)
                    scrollViewRef.current?.scrollTo({ y: 0, animated: true })
                }
            }} style={{ display: visible ? 'flex' : 'none', backgroundColor: `#FFFFFF00`, position: 'absolute', height: '100%', width: '100%', top: 0, alignItems: 'flex-start' }}>
                <KeyboardAvoidingView>
                    <ScrollView ref={scrollViewRef} contentContainerStyle={{ backgroundColor: theme.colors.secondary }} style={{ maxHeight: 200, top: textInputLayout.height + textInputLayout.y + 1, left: textInputLayout.y, minWidth: textInputLayout.width, borderRadius: 12 }}>
                        {suggestions.map(renderItem || renderItemDefault)}
                    </ScrollView>
                </KeyboardAvoidingView>
            </Pressable>
        </View >
    )
}

Combobox.displayName = "Combobox";

export default Combobox;