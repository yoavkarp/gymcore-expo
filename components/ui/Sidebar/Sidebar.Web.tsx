import { useSession } from "@/features/auth";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { theme } from "@/theme";
import { Href, router, usePathname } from "expo-router";
import SidebarButton from './SidebarButton';
import SCREENS from "@/constants/sidebar-screens";
import Button from "../Button";

interface SidebarProps { }

const Sidebar: React.FC<SidebarProps> = () => {

    const navigate = router.navigate;
    const path = usePathname();

    const { signOut } = useSession()

    return (
        <View style={[Styles.container, { height: Dimensions.get('screen').height }]}>
            <View id='logo'>
                <Image resizeMode="cover" resizeMethod="scale" style={{ height: 150, width: 110, borderTopRightRadius: 12 }} source={require("../../../assets/images/logogymcore.png")} />
                {/* <LogoIcon width={70} height={70} fill={'white'} /> */}
            </View>
            <View id='buttons' style={Styles.buttonsContainer}>
                {SCREENS.map((screen) => <SidebarButton key={screen.name} href={screen.href} onPress={() => navigate(screen.href)} icon={screen.icon} selected={path === screen.href} title={screen.name} />)}
            </View>
            <View>
                <Button onPress={() => signOut()}>Logout</Button>
            </View>
            <View style={Styles.divider} />
            <View />
        </View>
    )

}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        width: 120,
        gap: theme.spacing.md,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: theme.spacing.md
    },
    buttonsContainer: {
        gap: theme.spacing.md
    },
    optionsContainer: {
        gap: theme.spacing.md
    },
    avatarContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: theme.colors.background,
        width: '70%',
        opacity: 0.5
    },
    avatar: {
        borderRadius: 100
    }
})

export default Sidebar;

type SidebarMenuItemProps = {
    icon: (props: { style: any }) => JSX.Element,
    text: string,
    href: Href
}