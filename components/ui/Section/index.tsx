import { theme } from '@/theme';
import React, { PropsWithChildren } from 'react'
import { DimensionValue, Keyboard, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, View, ViewProps } from 'react-native';

interface SectionProps extends PropsWithChildren {
    width?: DimensionValue;
    height?: DimensionValue;
    style?: ViewProps['style'];
    disableFlex?: boolean;
    contentStyle?: ViewProps['style']
}

const SectionView: React.FC<SectionProps> = ({ width, height, children, style, disableFlex = false, contentStyle }) => {

    return (
        <View style={[{ width, height }, Styles.container, style]} >
            {children}
        </View>

    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        padding: theme.spacing.md,
    },
    content: {
        gap: theme.spacing.sm,
    }
})

export default SectionView;