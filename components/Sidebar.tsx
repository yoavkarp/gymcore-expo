import { useSession } from "@/features/auth";
import { FunctionComponent, useMemo } from "react";
import { StyleSheet, Touchable, View } from "react-native";
import Text from "./ui/Text";
import TouchableOpacity from "./ui/TouchableOpacity";
import Icon from '@expo/vector-icons/Ionicons'
import { Theme } from "@/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { Href, Link, usePathname, useRouter } from "expo-router";


type SidebarMenuItemProps = {
    icon: (props: { style: any }) => JSX.Element,
    text: string,
    href: Href
}

const SidebarMenuItem = ({ icon: ItemIcon, text, href }: SidebarMenuItemProps) => {

    const { theme } = useTheme();
    const styles = stylesWithTheme(theme);

    const path = usePathname();
    const selected = useMemo(() => path === href, [path, href]);

    const router = useRouter();

    return (
        <TouchableOpacity style={[styles.menuItem, selected && styles.selectedMenuItem]} onPress={() => router.navigate(href)}>
            <ItemIcon style={[styles.menuItemIcon, selected && styles.selectedMenuItemIcon]} />
            <Text style={[styles.menuItemText, selected && styles.selectedMenuItemText]}>{text}</Text>
        </TouchableOpacity>
    )
}


interface SidebarProps {

}

const Sidebar: FunctionComponent<SidebarProps> = () => {

    const { theme } = useTheme();
    const styles = stylesWithTheme(theme);

    return (
        <View style={styles.container}>
            <Text h2>תפריט ראשי</Text>

            <SidebarMenuItem
                icon={({ style }) => <Icon style={style} name="home-sharp" size={24} />}
                text="בית"
                href="/home"
            />

            <SidebarMenuItem
                icon={({ style }) => <Icon style={style} name="book-sharp" size={24} />}
                text="ספרייה"
                href="/library"
            />

            <SidebarMenuItem
                icon={({ style }) => <Icon style={style} name="train" size={24} />}
                text="יצירת אימון"
                href={"/create-workout" as Href}
            />

            <SidebarMenuItem
                icon={({ style }) => <Icon style={style} name="train" size={24} />}
                text="יצירת אימון"
                href={"/workout/6d7bd4c8-4b4e-40c1-8cd7-6d93e659cf12" as Href}
            />

        </View>
    );
}

const stylesWithTheme = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        backgroundColor: theme.colors.secondary,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        width: '100%',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 6,
        borderTopEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    menuItemText: {
        flexBasis: '50%',
        color: theme.colors.background
    },
    menuItemIcon: {
        alignSelf: 'center',
        color: theme.colors.background
    },
    selectedMenuItem: {
        backgroundColor: theme.colors.success,
        color: theme.colors.background,
        borderColor: theme.colors.success
    },
    selectedMenuItemText: {
        color: theme.colors.text
    },
    selectedMenuItemIcon: {
        color: theme.colors.text
    }
})

export default Sidebar;