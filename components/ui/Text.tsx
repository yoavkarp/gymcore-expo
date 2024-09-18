import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/theme';
import { forwardRef, useMemo } from 'react';
import { Text as T, TextProps as TP, StyleSheet, TextStyle } from 'react-native';

export type TextStyles = {
    h1?: boolean;
    error?: boolean;
    subtitle?: boolean;
}

export type TextProps = TP & TextStyles

export type TextRef = T;

type PrimaryFontFamily =
    | 'bold'
    | 'light'
    | 'medium'
    | 'regular'
    | 'semibold'

const fontFamilyForWeight: Record<
    NonNullable<TextStyle['fontWeight']>,
    PrimaryFontFamily
> = {
    '100': 'light',
    '200': 'light',
    '300': 'light',
    '400': 'regular',
    '500': 'medium',
    '600': 'semibold',
    '700': 'bold',
    '800': 'bold',
    '900': 'bold',
    normal: 'regular',
    bold: 'bold',
    semibold: 'semibold',
    light: 'light',
    medium: 'medium',
    thin: 'light',
    ultralight: 'light',
    black: 'bold',
    condensed: 'regular',
    condensedBold: 'bold',
    heavy: 'bold',
    regular: 'regular',
};


const Text = forwardRef<TextRef, TextProps>(({ style, ...rootProps }, ref) => {

    const { theme } = useTheme();
    const _style = styles(theme);
    const variants = Object.keys(rootProps).filter((key) => (key in _style) && rootProps[key as keyof typeof rootProps] === true).map((key) => _style[key as keyof typeof _style])
    const flattenedStyle = StyleSheet.flatten<TextStyle>([_style.default, variants, style]);
    const { fontWeight, ...otherStyles } = flattenedStyle || {};

    return <T {...rootProps} ref={ref} style={{
        ...otherStyles,
        fontFamily: fontFamilyForWeight[fontWeight ?? '400'],
    }} />
})

Text.displayName = "Text";

const styles = (theme: Theme) => StyleSheet.create<Record<(keyof TextStyles) | "default", TextStyle>>({
    default: {
        fontFamily: "regular",
        color: theme.colors.text
    },
    h1: {
        fontSize: 30,
        fontWeight: "medium",
    },
    error: {
        color: 'red'
    },
    subtitle: {
        lineHeight: 30,
        color: theme.colors.subtitle
    },
})

export default Text;