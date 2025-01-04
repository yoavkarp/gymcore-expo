import { ViewProps as VP, View as V, StyleSheet, ViewStyle } from "react-native";
import { viewLayout } from "./utils/localeLayout";

type ViewProps = VP & {

}

export const View: React.FC<ViewProps> = ({ style, ...props }) => {

    return (
        <V {...props} style={[viewLayout(style), { direction: 'rtl' }]} />
    )
}