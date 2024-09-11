import { PropsWithChildren, useState, useEffect } from "react";
import ClubContext from "./context";
import { getAuthenticatedClub } from "./actions";
import { useSession } from "@/auth";
import { Club } from "@/appsync/API";
import { useApolloClient } from "@apollo/client";

export type ClubProviderProps = {

}


export function ClubProvider({ children }: PropsWithChildren<ClubProviderProps>) {

    const { session } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [club, setClub] = useState<Club | null>(null);
    const client = useApolloClient();

    useEffect(() => {
        async function onEffect() {
            setIsLoading(true)
            if (session) {
                try {
                    const { data } = await client.query({ query: getAuthenticatedClub });
                    setClub(data?.getAuthenticatedClub!)
                }
                catch (e) {
                    console.log("Link", client.link)
                    console.log(JSON.stringify(e, null, 2))
                }
            }
            console.log(club)
            setIsLoading(false);
        }
        if (session) {
            onEffect();
        }
    }, [session])

    return (
        <ClubContext.Provider value={{
            isLoading,
            club
        }}>
            {children}
        </ClubContext.Provider>
    );
};
