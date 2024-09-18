import { TextStyle, StyleSheet } from "react-native";
import Text, { TextProps, TextRef } from "./Text";
import { forwardRef, useMemo } from "react";
import { Theme } from "@/theme";
import { useTheme } from "@/contexts/ThemeContext";

export type LabelStyles = {

}

export type LabelProps = TextProps & LabelStyles;


const Label = forwardRef<TextRef, LabelProps>(({ ...rootProps }, ref) => {

    const { theme } = useTheme();
    const _style = styles(theme);

    return <Text {...rootProps} ref={ref} style={[
        _style.default,
        rootProps.style,
        ...Object.keys(rootProps).filter((key) => key in _style).map((key) => _style[key as keyof typeof _style])
    ]} />
})

Label.displayName = "Label";


const styles = (theme: Theme) => StyleSheet.create<Record<(keyof LabelStyles) | "default", TextStyle>>({
    default: {
        fontSize: 18,
        fontFamily: "medium",
        letterSpacing: 0.5
    }
})

export default Label;