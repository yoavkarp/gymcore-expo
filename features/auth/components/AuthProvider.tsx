import { PropsWithChildren, useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import { CognitoUserSession, IAuthenticationDetailsData } from "amazon-cognito-identity-js";
import { authenticateUser, completeNewPasswordChallenge, getSession, getUser, initializeUserPool, refreshToken, signOut } from "../actions";
import { Club } from "@/graphql";
import { extractClubDataFromPayload } from "../utils/extractClubDataFromPayload";

export type AuthProviderProps = {

}


export function AuthProvider({ children }: PropsWithChildren<AuthProviderProps>) {

    const [session, setSession] = useState<CognitoUserSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"newPasswordRequired" | "success" | null>(null);
    const [club, setClub] = useState<Club | null>(null);

    const authenticateUserCallback = useCallback(async (authenticationDetails: IAuthenticationDetailsData) => {
        setError(null);
        setStatus(null);
        try {
            const result = await authenticateUser(authenticationDetails);
            if (!result) return null;
            if (result.type === "success") {
                setSession(result.payload.session)
                setClub(extractClubDataFromPayload(result.payload.session.getIdToken().decodePayload()))
            }
            else if (result.type === "newPasswordRequired") {
                setStatus("newPasswordRequired")
            }

            return result;
        } catch (err: any) {
            setError(err);
            return null;
        }
    }, [])

    const signOutCallback = useCallback(async (callback?: () => any) => {
        setIsLoading(true)
        setError(null);
        setSession(null);
        setStatus(null);
        setClub(null);
        const res = await signOut(callback)
        setIsLoading(false);
        return res;
    }, [])

    const completeNewPasswordChallengeCallback = useCallback(async (newPassword: string, userAttributes: any) => {
        setError(null);
        try {
            const res = await completeNewPasswordChallenge(newPassword, userAttributes);
            if (res) {
                setSession(res.payload.session)
                setClub(extractClubDataFromPayload(res.payload.session.getIdToken().decodePayload()))
                setStatus("success")
            }
            return res;
        }
        catch (err: any) {
            setError(err);
            return null;
        }
    }, [])

    const refreshTokenCallback = useCallback(async () => {
        setIsLoading(true)
        try {
            const res = await refreshToken()
            if (res) {
                setSession(res)
                setClub(extractClubDataFromPayload(res.getIdToken().decodePayload()))
            }
            setIsLoading(false)
            return res;
        }
        catch (err: any) {
            setError(err);
            setIsLoading(false)
            return null;
        }
    }, [])

    useEffect(() => {
        async function onEffect() {

            setIsLoading(true);

            await initializeUserPool()

            const user = getUser();

            if (user) {
                try {
                    const session = await getSession();
                    setClub(extractClubDataFromPayload(session?.getIdToken().decodePayload()))
                    setSession(session);
                } catch (err: any) {
                    setError(err);
                }
            }

            setIsLoading(false);
        }
        onEffect();
    }, [])

    return (
        <AuthContext.Provider value={{
            club,
            isLoading,
            error,
            session,
            status,
            authenticateUser: authenticateUserCallback,
            signOut: signOutCallback,
            completeNewPasswordChallenge: completeNewPasswordChallengeCallback,
            refreshToken: refreshTokenCallback
        }
        }>
            {children}
        </AuthContext.Provider>
    );
};
