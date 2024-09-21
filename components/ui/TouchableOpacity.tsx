import { forwardRef, LegacyRef } from "react";
import { TouchableOpacityProps as TOP, TouchableOpacity as TO } from "react-native";
import { viewLayout } from "./utils/localeLayout";

export type TouchableOpacityProps = TOP & {
    ref?: LegacyRef<TO>;
}

const TouchableOpacity: React.FC<TouchableOpacityProps> = ({ style, ...props }) => {
    return (
        <TO {...props} style={viewLayout(style)} />
    )
}

export default TouchableOpacity