import { ViewStyle, TextStyle, StyleProp, StyleSheet } from "react-native";

export const viewLayout = (styleProp?: StyleProp<ViewStyle>, dir: 'rtl' | 'ltr' = 'rtl'): StyleProp<ViewStyle> => {

    if (dir === 'rtl')
        return styleProp;

    if (!styleProp) {
        return styleProp;
    }

    const flattenStyle = StyleSheet.flatten(styleProp);

    const styles: ViewStyle = {
        ...flattenStyle,
        flexDirection: flattenStyle.flexDirection === 'row' ? 'row-reverse' : flattenStyle.flexDirection === 'row-reverse' ? 'row' : flattenStyle.flexDirection
    }
    return styles;
}

export const textLayout = (styleProp?: StyleProp<TextStyle>, dir: 'rtl' | 'ltr' = 'rtl'): StyleProp<TextStyle> => {
    if (dir === 'rtl')
        return styleProp;

    if (!styleProp) {
        return styleProp;
    }

    const flattenStyle = StyleSheet.flatten(styleProp);

    const styles: TextStyle = {
        ...flattenStyle,
        flexDirection: flattenStyle.flexDirection === 'row' ? 'row-reverse' : flattenStyle.flexDirection === 'row-reverse' ? 'row' : flattenStyle.flexDirection,
        textAlign: dir === 'ltr' ? 'right' : 'left',
        writingDirection: dir
    }
    return styles;
}