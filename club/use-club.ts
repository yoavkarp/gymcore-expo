import { useContext } from "react";
import ClubContext from "./context";

export function useClub() {
    const value = useContext(ClubContext);

    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useClub must be wrapped in a <ClubProvider />');
        }
    }
    return value;
}
