import { useTranslation } from "react-i18next";
import { Headline, TextProps, Text } from "react-native-paper";

export const LocaleText: React.FC<Omit<TextProps<any>, "children"> & { children?: string, headline?: boolean }> = ({ children, headline = false, ...props }) => {
    const { t, i18n: { dir } } = useTranslation();

    const Component = headline ? Headline : Text;

    return (
        <Component {...props} style={[props.style, { writingDirection: dir() }]}>
            {children ? t(children) : ""}
        </Component>
    )
}

