import { useTheme } from "@/contexts/ThemeContext";
import { ActivityIndicator } from "react-native";

type LoadingIndicatorProps = ActivityIndicator['props'] & {

}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ ...activityIndicatorProps }) => {

    const { theme } = useTheme();

    return (
        <ActivityIndicator color={theme.colors.primary} {...activityIndicatorProps} />
    );
}

export default LoadingIndicator;