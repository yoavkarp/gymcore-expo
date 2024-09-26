import { useContext } from "react";
import AuthContext from "../components/AuthContext";

export function useSession() {
    const value = useContext(AuthContext);
    return value;
}