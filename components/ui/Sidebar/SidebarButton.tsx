import React from 'react'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Href } from 'expo-router';
import Text from '../Text';
import { theme } from '@/theme';

interface SidebarButtonProps {
    icon?: (props: SvgProps) => JSX.Element;
    onPress?: TouchableOpacityProps['onPress'];
    href: Href;
    selected?: boolean;
    title: string
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ onPress, href, icon, selected, title }) => {
    const Icon = icon;

    return (
        <TouchableOpacity style={Styles.container} onPress={onPress}>
            {Icon && <Icon width={36} height={36} fill={selected ? theme.colors.primary : theme.colors.muted} />}
            <Text style={[Styles.text, { color: selected ? theme.colors.primary : theme.colors.muted }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )

}

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    text: {
        color: theme.colors.muted
    }
})

export default SidebarButton;