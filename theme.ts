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
    }
}

export const defaultTheme: Theme = {
    colors: {
        primary: "#2563eb",
        secondary: "#3b82f6",
        background: "#fafafa",
        text: "#1f2937",
        border: "#9ca3af",
        buttonText: "#ffffff",
        subtitle: "#9ca3af",
        muted: "#6b7280",
        error: "#dc2626",
        success: "#10b981",
        warning: "#f59e0b"
    }
}

export const theme: Theme = {
    ...defaultTheme
}