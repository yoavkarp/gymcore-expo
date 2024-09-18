import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useContext } from "react";
import { randomUUID } from "expo-crypto";
import { View } from "react-native";
import Snackbar from "@/components/ui/Snackbar";
export type SnackbarMessage = {
    message: string;
    type?: "error" | "success" | "warning";
}

type SnackbarContextType = {
    show: (message: string, type?: "error" | "success" | "warning", delay?: number) => void;
}
const SnackbarContext = createContext<SnackbarContextType>({
    show: () => null
});

SnackbarContext.displayName = "SnackbarContext";

type SnackbarProviderProps = {

}

export function SnackbarProvider({ children }: PropsWithChildren<SnackbarProviderProps>) {

    const [displayed, setDisplayed] = useState<(SnackbarMessage & { id: string })[]>([]);
    const [timeoutHandlers, setTimeoutHandlers] = useState<Record<string, NodeJS.Timeout>>({});

    useEffect(() => {
        return () => {
            for (const key in timeoutHandlers) {
                clearTimeout(timeoutHandlers[key]);
            }
            setDisplayed([]);
        }
    }, [])

    return (
        <SnackbarContext.Provider value={{
            show: (message, type = "success", delay = 3000) => {
                console.log("Here")
                const id = randomUUID();
                setDisplayed(prev => [{ message, type, id }, ...prev])

                const timeoutHandle = setTimeout(() => {
                    console.log(id);
                    setDisplayed(prev => prev.filter(m => m.id !== id))
                    clearTimeout(timeoutHandlers[id]);
                }, delay)

                setTimeoutHandlers(prev => ({
                    ...prev, [id]: timeoutHandle
                }))
            }
        }}
        >
            {children}
            <View style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1000, width: "100%", padding: 20 }}>
                {displayed.map((message) => (
                    <Snackbar key={message.id} {...message} />
                ))}
            </View>
        </SnackbarContext.Provider>
    )
};

export function useSnackbar() {
    const value = useContext(SnackbarContext);

    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSnackbar must be wrapped in a <SnackbarProvider />');
        }
    }
    return [value.show];
}


export default SnackbarProvider