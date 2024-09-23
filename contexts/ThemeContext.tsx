import { createContext, PropsWithChildren } from "react";
import { defaultTheme, Theme } from "@/theme";
import { useContext } from "react";


type ThemeContextType = {
    theme: Theme;
}
const ThemeContext = createContext<ThemeContextType>({ theme: defaultTheme });

ThemeContext.displayName = "ThemeContext";

type ThemeProviderProps = {
    theme?: Theme
}

export function ThemeProvider({ children, theme = defaultTheme }: PropsWithChildren<ThemeProviderProps>) {
    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    )
};

export function useTheme() {
    const value = useContext(ThemeContext);

    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useTheme must be wrapped in a <ThemeProvider />');
        }
    }
    return value;
}


export default ThemeProvider