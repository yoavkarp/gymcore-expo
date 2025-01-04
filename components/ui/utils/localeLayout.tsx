import { ViewStyle, TextStyle, StyleProp, StyleSheet, I18nManager } from "react-native";

export const viewLayout = (styleProp?: StyleProp<ViewStyle>, dir: 'rtl' | 'ltr' = 'rtl'): StyleProp<ViewStyle> => {

    if (!styleProp) {
        return styleProp;
    }

    const flattenStyle = StyleSheet.flatten(styleProp);

    const styles: ViewStyle = {
        ...flattenStyle,
    }
    return styles;
}

export const textLayout = (styleProp?: StyleProp<TextStyle>, dir: 'rtl' | 'ltr' = 'rtl'): StyleProp<TextStyle> => {
    if (!styleProp) {
        return styleProp;
    }

    const flattenStyle = StyleSheet.flatten(styleProp);

    const styles: TextStyle = {
        ...flattenStyle,
        direction: 'rtl',
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    }
    return styles;
}