import { useSession } from "@/features/auth";
import { useRouter } from "expo-router";
import { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "./ui/Text";
import { useClub } from "@/features/club";
import Label from "./ui/Label";
import { useTheme } from "@/contexts/ThemeContext";
import Button from "./ui/Button";
import Icon from '@expo/vector-icons/Ionicons'
import { theme } from "@/theme";
interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
    const { session } = useSession();

    const { currentTrainer, setIsTrainersListVisible } = useClub();
    const { theme } = useTheme();
    const router = useRouter()

    return (
        <View style={styles.container}>
            <Text h1>{session?.getIdToken().decodePayload().name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md }}>
                {router.canGoBack() && <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={{ color: theme.colors.white, fontSize: 24 }}>חזור</Text>
                    <Icon name="arrow-back" color={theme.colors.white} size={24} />
                </TouchableOpacity>}
                <TouchableOpacity onPress={() => setIsTrainersListVisible(true)} style={[styles.trainer, { borderColor: theme.colors.subtitle }]}>
                    <Label center>{currentTrainer?.name}</Label>
                    <Text center>{currentTrainer?.phone_number?.slice(4)}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.sm,
        justifyContent: 'space-between',
    },
    trainer: {
        width: 250, borderWidth: 1, borderRadius: 8, padding: 5,
        borderTopRightRadius: 16, backgroundColor: theme.colors.white
    },
    backButton: {
        flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm,
        backgroundColor: theme.colors.primary, padding: theme.spacing.sm, borderRadius: 8
    }
})

export default Header;