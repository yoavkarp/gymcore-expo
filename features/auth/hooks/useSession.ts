import { useContext } from "react";
import AuthContext from "../components/AuthContext";

export function useSession() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("AuthContext is not initialized, please wrap your component with AuthProvider");
    }
    return value;
}