import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/theme';
import { forwardRef, useMemo } from 'react';
import { Text as T, TextProps as TP, StyleSheet, TextStyle, ColorValue } from 'react-native';
import { View } from './View';
import { textLayout, viewLayout } from './utils/localeLayout';

export type TextStyles = {
    h1?: boolean;
    h2?: boolean;
    error?: boolean;
    subtitle?: boolean;
    center?: boolean;
}

export type TextProps = TP & TextStyles & {
    bulletColor?: ColorValue;
}

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


const Text = forwardRef<TextRef, TextProps>(({ bulletColor, style, ...rootProps }, ref) => {

    const { theme } = useTheme();
    const _style = styles(theme);
    const variants = Object.keys(rootProps).filter((key) => (key in _style) && rootProps[key as keyof typeof rootProps] === true).map((key) => _style[key as keyof typeof _style])
    const flattenedStyle = StyleSheet.flatten<TextStyle>([_style.default, variants, style]);
    const { fontWeight, ...otherStyles } = flattenedStyle || {};

    const textComponent = <T {...rootProps} ref={ref} style={textLayout({
        writingDirection: 'rtl',
        textAlign: 'right',
        direction: 'rtl',
        ...otherStyles,
        fontFamily: fontFamilyForWeight[fontWeight ?? '400'],

    })} />

    if (rootProps.h1) {
        return <View style={{ alignItems: 'center', gap: 10, flexDirection: 'row' }}>
            <View style={viewLayout([_style.bullet, bulletColor ? { backgroundColor: bulletColor } : {}])} />
            {textComponent}
        </View>
    }

    return textComponent;
})

Text.displayName = "Text";

const styles = (theme: Theme) => StyleSheet.create<Record<(keyof TextStyles) | "default" | "bullet", TextStyle>>({
    default: {
        writingDirection: 'rtl',
        fontFamily: "regular",
        color: theme.colors.text,
        fontSize: 20,
        paddingBottom: 3 // fix for text not aligning to the bottom
    },
    h1: {
        fontSize: 35,
        fontWeight: "medium",
    },
    bullet: {
        height: 37,
        width: 15,
        borderRadius: 4,
        backgroundColor: theme.colors.primary,
    },
    h2: {
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
    center: {
        textAlign: 'center'
    }
})

export default Text;