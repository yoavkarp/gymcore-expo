import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/theme';
import React from 'react';
import { View, TouchableOpacity, Modal as M, ModalProps as MP, StyleSheet, ViewProps } from 'react-native';

export type ModalProps = ViewProps & {
    onShow?: MP['onShow'];
    visible?: MP['visible'];
    dismissable?: boolean;
    onDismiss?: () => any;
}

const Modal: React.FC<ModalProps> = ({ onShow, visible, dismissable, onDismiss, ...props }) => {

    const { theme } = useTheme();
    const _styles = styles(theme);

    return (
        <M
            onShow={onShow}
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onDismiss}
        >
            <TouchableOpacity style={_styles.modalBackground} onPress={dismissable ? onDismiss : undefined} activeOpacity={0.9}>
                <View {...props} style={[_styles.modalContent, props.style]} />
            </TouchableOpacity>
        </M>
    );
};

const styles = (theme: Theme) => StyleSheet.create({
    modalBackground: {
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center'
    },
    modalContent: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: 500
    },
});

export default Modal;