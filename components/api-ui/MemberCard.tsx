import { Member } from "@/appsync/API";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../ui/Text";
import { useTheme } from "@/contexts/ThemeContext";

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
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Text h2 style={styles.text}>{member.name}</Text>
            <Text subtitle style={styles.text}>{member.phone_number?.substring(4)}</Text>
        </TouchableOpacity>
    );
}

export default MemberCard;