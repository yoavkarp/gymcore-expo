import { View } from "react-native";
import TextInput, { TextInputProps, TextInputRef } from "./ui/TextInput";
import { useEffect, useRef, useState } from "react";
import Text from "./ui/Text";

export type RangedValue = {
    val?: number;
    max?: number;
}

export type RangedInputProps = {
    value?: RangedValue;
    onChangeValue?: (value: RangedValue) => void;
    onSubmitEditing?: TextInputRef['props']['onSubmitEditing']
    returnKeyType?: TextInputRef['props']['returnKeyType']
}

const RangedInput: React.FC<RangedInputProps> = (props) => {

    const [value, setValue] = useState<RangedValue>(props.value || {});
    const [valRef, maxRef] = [useRef<TextInputRef>(null), useRef<TextInputRef>(null)];

    useEffect(() => {
        setValue(props.value || {});
    }, [props.value])

    const handleValueChange = (val?: string) => {
        const newValue = (isNaN(Number(val)) || !val) ? {} : { ...value, val: Number(val) };
        setValue(newValue);
        props.onChangeValue?.(newValue);
    }

    const handleMaxChange = (max?: string) => {

        if (!value.val) {
            return;
        }

        const newValue = (!max || isNaN(Number(max))) ? { val: value.val } : { ...value, max: Number(max) };

        setValue(newValue);
        props.onChangeValue?.(newValue);
    }

    return (
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <TextInput returnKeyType="next" maxLength={4} selectTextOnFocus keyboardType="numeric" defaultValue={value.val ? String(value.val) : ""} ref={valRef} blurOnSubmit={false} onSubmitEditing={() => maxRef.current?.focus()} onChangeText={handleValueChange} style={{ width: 70, textAlign: 'center' }} />
            <Text>עד</Text>
            <TextInput returnKeyType={props.returnKeyType} selectTextOnFocus keyboardType="numeric" defaultValue={value.max ? String(value.max) : ""} ref={maxRef} onSubmitEditing={props.onSubmitEditing} onChangeText={handleMaxChange} style={{ width: 70, textAlign: 'center' }} />
        </View>
    );
}

export default RangedInput;