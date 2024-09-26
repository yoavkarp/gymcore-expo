import { View } from "@/components/ui/View";
import { useTheme } from "@/contexts/ThemeContext";
import { Member } from "@/graphql";
import { Theme } from "@/theme";
import { StyleSheet } from "react-native";

interface MemberProfileWorkoutsSectionProps {
    member?: DeepPartial<Member>;
}

const MemberProfileWorkoutsSection: React.FC<MemberProfileWorkoutsSectionProps> = () => {
    const { theme } = useTheme();
    const styles = stylesWithTheme(theme);

    return (
        <View style={styles.container}>
        </View>
    );
}

const stylesWithTheme = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.success,
        flex: 1,
        borderRadius: 8,
        padding: 10
    }
})

export default MemberProfileWorkoutsSection;