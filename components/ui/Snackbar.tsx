import { StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import Text from "./Text";
import { SnackbarMessage } from "@/contexts/SnackbarContext";
import { Theme } from "@/theme";
import { useTheme } from "@/contexts/ThemeContext";

type SnackbarProps = SnackbarMessage & {
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type = "error" }) => {

    const { theme } = useTheme()
    const _containerStyles = styles(theme);
    const _textStyles = textStyles(theme);

    return (
        <View style={[{
            padding: 10,
            borderRadius: 8,
            margin: 10,
        }, _containerStyles[type]]}>
            <Text style={[{ fontSize: 20 }, _textStyles[type]]}>{message}</Text>
        </View>
    );
}

const styles = (theme: Theme) => StyleSheet.create<Record<"error" | "success" | "warning", ViewStyle>>({
    success: {
        backgroundColor: theme.colors.success
    },
    error: {
        backgroundColor: theme.colors.error
    },
    warning: {
        backgroundColor: theme.colors.warning
    }
})

const textStyles = (theme: Theme) => StyleSheet.create<Record<"error" | "success" | "warning", TextStyle>>({
    success: {
        color: "white"
    },
    error: {
        color: "white"
    },
    warning: {
        color: "white"
    }
})

export default Snackbar;