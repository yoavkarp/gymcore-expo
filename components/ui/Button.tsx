import { forwardRef, useEffect, useMemo } from 'react';
import { TouchableOpacity as T, TouchableOpacityProps, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import Text from './Text';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/theme';

export type ButtonStyles = {
    disabled?: boolean;
    error?: boolean;
}

export type ButtonProps = TouchableOpacityProps & ButtonStyles & {
    isLoading?: boolean;
};

export type ButtenRef = T;

const Button = forwardRef<ButtenRef, ButtonProps>(({ ...rootProps }, ref) => {

    const { theme } = useTheme();
    const _style = styles(theme);
    const _textStyle = textStyles(theme);

    return <T disabled={rootProps.isLoading} activeOpacity={0.55} {...rootProps} ref={ref} style={[
        _style.default,
        rootProps.style,
        ...Object.keys(rootProps).filter((key) => key in _style && rootProps[key as keyof typeof rootProps] === true).map((key) => _style[key as keyof typeof _style])
    ]}>
        <Text style={[
            _textStyle.default,
            ...Object.keys(rootProps).filter((key) => (key in _textStyle) && rootProps[key as keyof typeof rootProps] === true).map((key) => _textStyle[key as keyof typeof _textStyle])
        ]}>{rootProps.children}</Text>
        <ActivityIndicator style={{ display: rootProps.isLoading ? 'flex' : 'none' }} color={theme.colors.background} />
    </T>
})

Button.displayName = "Button";

const styles = (theme: Theme) => StyleSheet.create<Record<(keyof ButtonStyles) | "default", ViewStyle>>({
    default: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10
    },
    disabled: {
        backgroundColor: theme.colors.muted
    },
    error: {
        backgroundColor: theme.colors.error
    }
})

const textStyles = (theme: Theme) => StyleSheet.create<Record<(keyof ButtonStyles) | "default", TextStyle>>({
    default: {
        color: theme.colors.buttonText,
        fontSize: 18,
        fontWeight: 'medium'
    },
    disabled: {
        color: theme.colors.background
    },
    error: {
        color: theme.colors.background
    }
})

export default Button;