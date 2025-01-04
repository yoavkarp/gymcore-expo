import * as React from 'react';
import { SvgProps } from 'react-native-svg';
import { CollectionSolidIcon, HomeSolidIcon, LibrarySolidIcon, PSolidIcon, PlanSolidIcon, ScheduleSolidIcon } from '@/components/SvgIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Href } from 'expo-router';
import { Platform } from 'react-native';
import { Placeholder } from './icon-placeholder';

export interface NavigationScreen {
    icon?: (props: SvgProps) => JSX.Element;
    name: string;
    href: Href;
}

const SCREENS: NavigationScreen[] = [
    {
        name: "בית",
        href: "/home",
        icon: Platform.OS === 'web' ? Placeholder : HomeSolidIcon,
    },
    {
        name: "ספריה",
        href: "/library",
        icon: Platform.OS === 'web' ? Placeholder : LibrarySolidIcon,
    },
    {
        name: "תכניות",
        href: "/plans",
        icon: Platform.OS === 'web' ? Placeholder : LibrarySolidIcon,
    },
] as const;

export default SCREENS;