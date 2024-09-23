import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useTheme } from "@/contexts/ThemeContext";
import { Member } from "@/graphql";
import { Theme } from "@/theme";
import { StyleSheet } from "react-native";

interface MemberPlanSectionProps {
    member?: DeepPartial<Member>;
}

const MemberPlanSection: React.FC<MemberPlanSectionProps> = () => {
    const { theme } = useTheme();
    const styles = stylesWithTheme(theme);

    return (
        <View style={styles.container}>
            <Text>hi</Text>
        </View>
    );
}

const stylesWithTheme = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        flex: 1,
        borderRadius: 8,
        padding: 10
    }
})

export default MemberPlanSection;