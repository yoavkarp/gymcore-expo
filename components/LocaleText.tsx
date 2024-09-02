import { Headline, TextProps, Text } from "react-native-paper";

export const LocaleText: React.FC<Omit<TextProps<any>, "children"> & { children?: string, headline?: boolean }> = ({ children, headline = false, ...props }) => {

    const Component = headline ? Headline : Text;

    return (
        <Component {...props} style={[props.style]}>
            {children}
        </Component>
    )
}

