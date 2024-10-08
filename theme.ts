import { ColorValue } from "react-native";

export type Theme = {
    colors: {
        primary: ColorValue;
        secondary: ColorValue;
        background: ColorValue;
        text: ColorValue;
        border: ColorValue;
        buttonText: ColorValue;
        subtitle: ColorValue;
        muted: ColorValue;
        error: ColorValue;
        success: ColorValue;
        warning: ColorValue;
    },
    spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
    },
    fontSize: {
        base: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
    }
}

export const defaultTheme: Theme = {
    colors: {
        primary: "#0ea5e9",
        secondary: "#3b82f6",
        background: "#fafafa",
        text: "#1f2937",
        border: "#9ca3af",
        buttonText: "#ffffff",
        subtitle: "#9ca3af",
        muted: "#6b7280",
        error: "#dc2626",
        success: "#4ade80",
        warning: "#fcd34d"
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32
    },
    fontSize: {
        base: 16,
        sm: 14,
        md: 18,
        lg: 20,
        xl: 24
    }
}

export const theme: Theme = {
    ...defaultTheme
}