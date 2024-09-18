import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/theme';
import { forwardRef, useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput as T, TextStyle, TextInputProps as TIP } from 'react-native';

export type TextInputStyles = {
    error?: boolean;
}

export type TextInputProps = TIP & TextInputStyles;

export type TextInputRef = T;

const TextInput = forwardRef<TextInputRef, TextInputProps>(({ ...rootProps }, ref) => {

    const [focusStyle, setFocusStyle] = useState<TextStyle>()
    const { theme } = useTheme();
    const _style = useMemo(() => styles(theme), [theme]);

    return <T {...rootProps} ref={ref}
        style={[
            _style.default,
            rootProps.style,
            focusStyle,
            ...Object.keys(rootProps).filter((key) => key in _style && rootProps[key as keyof typeof rootProps] === true).map((key) => _style[key as keyof typeof _style])
        ]}
        selectionColor={theme.colors.secondary}
        onFocus={(e) => {
            rootProps.onFocus?.(e);
            setFocusStyle(_style.onFocus)
        }}
        onBlur={(e) => {
            rootProps.onBlur?.(e);
            setFocusStyle(undefined)
        }}
    />
})

TextInput.displayName = "TextInput";

const styles = (theme: Theme) => StyleSheet.create<Record<(keyof TextInputStyles) | "default" | "onFocus", TextStyle>>({
    default: {
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
    onFocus: {
        borderColor: theme.colors.primary
    },
    error: {
        borderColor: theme.colors.error
    }
})

export default TextInput;