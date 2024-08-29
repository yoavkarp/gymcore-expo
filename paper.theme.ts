import { MD3LightTheme as DefaultTheme, MD3Theme } from 'react-native-paper';

const theme: MD3Theme = {
    ...DefaultTheme,
    // Specify custom property
    // Specify custom property in nested object
    colors: {
        ...DefaultTheme.colors,
    },
};

export { theme }