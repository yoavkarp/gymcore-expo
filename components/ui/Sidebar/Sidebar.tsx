import { useSession } from "@/features/auth";
import { FunctionComponent, useMemo } from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, View } from "react-native";
import Text from "../Text";
import TouchableOpacity from "../TouchableOpacity";
import Icon from '@expo/vector-icons/Ionicons'
import { theme, Theme } from "@/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { Href, Link, router, usePathname, useRouter } from "expo-router";
import SidebarButton from '../Sidebar/SidebarButton';
import { LogoutSolidIcon } from '../../SvgIcons';
import { useTranslation } from 'react-i18next';
import SCREENS from "@/constants/sidebar-screens";

interface SidebarProps { }

const Sidebar: React.FC<SidebarProps> = () => {

    const navigate = router.push;
    const path = usePathname();

    return (
        <View style={[Styles.container, { height: Dimensions.get('screen').height }]}>
            <View id='logo'>
                <Image style={{ height: 90, width: 90, borderTopRightRadius: 12 }} source={require("../../../assets/images/logo.jpeg")} />
                {/* <LogoIcon width={70} height={70} fill={'white'} /> */}
            </View>
            <View id='buttons' style={Styles.buttonsContainer}>
                {SCREENS.map((screen) => <SidebarButton key={screen.name} href={screen.href} onPress={() => navigate(screen.href)} icon={screen.icon} selected={path === screen.href} title={screen.name} />)}
            </View>
            <View style={Styles.divider} />
            <View />
            {/* <View style={Styles.optionsContainer} id='options'>
                <TouchableOpacity style={Styles.avatarContainer} id='avatar' onPress={() => navigate("My Profile")}>
                    <Image style={[Styles.avatar, state.routeNames[state.index] === 'My Profile' && { borderWidth: 4, borderColor: theme.colors.primary }]} source={{ uri: currentClub?.picture }} width={60} height={60} />
                    <Text style={{ color: state.routeNames[state.index] === 'My Profile' ? theme.colors.primary : theme.colors.secondary, fontSize: theme.fontSize.md }}>{currentClub?.name.split(" ")[0]}</Text>
                    <Text style={{ color: state.routeNames[state.index] === 'My Profile' ? theme.colors.primary : theme.colors.secondary, fontSize: theme.fontSize.base, marginTop: -10 }}>{t("Profile")}</Text>
                </TouchableOpacity>
                <SidebarButton onPress={logout} icon={LogoutSolidIcon} screen={{ name: "Logout", component: () => <View />, showInNav: false }} />
            </View> */}
        </View>
    )

}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        width: 120,
        gap: theme.spacing.md,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%'
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