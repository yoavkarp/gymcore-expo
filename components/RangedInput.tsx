import TextInput, { TextInputProps, TextInputRef } from "./ui/TextInput";
import { useEffect, useRef, useState } from "react";
import Text from "./ui/Text";
import { View } from "./ui/View";
import { ParameterInput } from "@/graphql";


export type RangedInputProps = {
    value?: ParameterInput | null;
    onChangeValue?: (value: ParameterInput) => void;
    onSubmitEditing?: TextInputRef['props']['onSubmitEditing']
    returnKeyType?: TextInputRef['props']['returnKeyType']
}

const RangedInput: React.FC<RangedInputProps> = (props) => {

    const [value, setValue] = useState<ParameterInput>(props.value || {});
    const [valRef, maxRef] = [useRef<TextInputRef>(null), useRef<TextInputRef>(null)];

    useEffect(() => {
        setValue(props.value || {});
    }, [props.value])

    const handleValueChange = (val?: string) => {
        if (!val) {
            setValue(prev => ({ ...prev, val: undefined }));
            return;
        }
        const newValue = (isNaN(Number(val)) || !val) ? {} : { ...value, val: Number(val) };
        setValue(newValue);
        props.onChangeValue?.(newValue);
    }

    const handleMaxChange = (max?: string) => {

        if (!value.val) {
            return
        }

        const newValue = (!max || isNaN(Number(max))) ? { val: value.val } : { ...value, max: Number(max) };

        setValue(newValue);
        props.onChangeValue?.(newValue);
    }

    return (
        <View style={{ gap: 5, alignItems: 'center', flexDirection: 'row' }}>
            <TextInput returnKeyType="next" maxLength={4} selectTextOnFocus keyboardType="numeric" defaultValue={value.val ? String(value.val) : ""} ref={valRef} blurOnSubmit={false} onSubmitEditing={() => maxRef.current?.focus()} onChangeText={handleValueChange} style={{ width: 70, textAlign: 'center' }} />
            <Text>עד</Text>
            <TextInput returnKeyType={props.returnKeyType} selectTextOnFocus keyboardType="numeric" defaultValue={value.max ? String(value.max) : ""} ref={maxRef} onSubmitEditing={props.onSubmitEditing} onChangeText={handleMaxChange} style={{ width: 70, textAlign: 'center' }} />
        </View>
    );
}

export default RangedInput;