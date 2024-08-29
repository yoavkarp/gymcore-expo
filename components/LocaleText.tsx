import { useTranslation } from "react-i18next";
import { TextInputProps } from "react-native-paper";
import { Text } from "react-native";
import { useCallback } from "react";

export const LocaleText: React.FC<TextInputProps> = ({ children, ...props }) => {
    const { t } = useTranslation();

    const translateChildren = (ch: typeof children): React.ReactNode => {

        if (!ch) return null;

        return Array.isArray(ch) ? ch.map<React.ReactNode>((child, index) => {
            if (!child) return null;
            if (typeof child === "string") {
                return t(child)
            } else {
                return translateChildren(child)
            }
        }) : typeof (ch) === 'string' ? t(ch) : ch

    }

    const TranslatedChildren = useCallback(() => translateChildren(children), [children])

    return <Text {...props}>
        <TranslatedChildren />
    </Text>
}