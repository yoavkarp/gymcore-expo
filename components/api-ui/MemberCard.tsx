import { Member } from "@/appsync/API";
import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "../ui/Text";
import { useTheme } from "@/contexts/ThemeContext";
import { View } from "../ui/View";

interface MemberCardProps {
    member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {

    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.primary,
            borderRadius: 8,
            padding: 10,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flex: 1,
            marginVertical: 10
        },
        text: {
            color: theme.colors.background,
        }
    })

    return (
        <View style={styles.container}>
            <Text h2 style={styles.text}>{member.name}</Text>
            <Text subtitle style={styles.text}>{member.phone_number?.substring(4)}</Text>
        </View>
    );
}

export default MemberCard;