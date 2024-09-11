import { Club } from "@/appsync/API";
import { createContext } from "react";
import { FetchResult } from "@apollo/client";

type ClubContextType = {
    club?: Club | null;
    isLoading: boolean;
}

const ClubContext = createContext<ClubContextType>({
    club: null,
    isLoading: true,
});

export default ClubContext