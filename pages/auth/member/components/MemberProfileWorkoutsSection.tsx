import CreateWorkoutModal from "@/components/CreateWorkoutModal/CreateWorkoutModal";
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import { View } from "@/components/ui/View";
import { useTheme } from "@/contexts/ThemeContext";
import { Member } from "@/graphql";
import { Theme } from "@/theme";
import { useRef } from "react";
import { StyleSheet } from "react-native";

interface MemberProfileWorkoutsSectionProps {
    memberId: string;
}

const MemberProfileWorkoutsSection: React.FC<MemberProfileWorkoutsSectionProps> = (props) => {
    const { theme } = useTheme();
    const styles = stylesWithTheme(theme);
    const createWorkoutModalRef = useRef<CreateWorkoutModal>(null);

    return (
        <View style={styles.container}>
            <Text h1>
                אימוני פרופיל
            </Text>
            <Button onPress={() => createWorkoutModalRef.current?.open()}>חדש</Button>

            <CreateWorkoutModal ref={createWorkoutModalRef} memberId={props.memberId} />
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