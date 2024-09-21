import { useTheme } from "@/contexts/ThemeContext";
import { Theme } from "@/theme";
import { useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { viewLayout } from "./utils/localeLayout";

type CardProps = ViewProps & {

}

const Card: React.FC<CardProps> = ({ ...rootProps }) => {
    const { theme } = useTheme();
    const _style = useMemo(() => styles(theme), [theme]);
    return (
        <View {...rootProps} style={viewLayout([
            _style.default,
            rootProps.style,
            ...Object.keys(rootProps).filter((key) => key in _style).map((key) => _style[key as keyof typeof _style])
        ])} />
    );
}

const styles = (theme: Theme) => StyleSheet.create({
    default: {
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 20
    }
})

export default Card;