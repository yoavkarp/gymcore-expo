import * as React from 'react';
import { SvgProps } from 'react-native-svg';
import { CollectionSolidIcon, HomeSolidIcon, LibrarySolidIcon, PSolidIcon, PlanSolidIcon, ScheduleSolidIcon } from '@/components/SvgIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Href } from 'expo-router';

export interface NavigationScreen {
    icon?: (props: SvgProps) => JSX.Element;
    name: string;
    href: Href;
}

const SCREENS: NavigationScreen[] = [
    {
        name: "בית",
        href: "/home",
        icon: HomeSolidIcon,
    },
    {
        name: "ספריה",
        href: "/library",
        icon: LibrarySolidIcon,
    },
] as const;

export default SCREENS;