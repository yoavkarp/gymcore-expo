import { PropsWithChildren, useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { CognitoUserSession, ICognitoUserPoolData } from "amazon-cognito-identity-js";
import * as AuthActions from "../actions";
import { AuthenticateUserResult } from "../types";

export type AuthProviderProps = {
    config: ICognitoUserPoolData;
}

export function AuthProvider({ children, config }: PropsWithChildren<AuthProviderProps>) {

    const [session, setSession] = useState<CognitoUserSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<AuthenticateUserResult["type"] | null>(null);

    const reset = () => {
        setError(null);
        setStatus(null);
        setSession(null);
    }

    const handlePayloadReceived = (result: AuthenticateUserResult) => {
        if (!result) {
            setStatus(null);
            setSession(null);
            return;
        }

        if (result.type === "AUTHENTICATED") {
            setSession(result.payload.session)
        }

        setStatus(result.type)
    }

    const signIn = async (username: string) => {
        const result = await AuthActions.signIn(username);
        handlePayloadReceived(result)
        return result;

    }

    const signOut = async () => {
        await AuthActions.signOut();
        reset();

    }

    const refreshToken = async () => {
        const result = await AuthActions.refreshToken();
        handlePayloadReceived(result);
        return result;

    }

    const verifyOTP = async (code: string) => {
        const result = await AuthActions.verifyPhoneNumber(code);
        handlePayloadReceived(result);
        return result;
    }

    useEffect(() => {
        async function onEffect() {
            await AuthActions.initialize(config);

            try {
                const session = await AuthActions.getCurrentSession();
                setSession(session);
            } catch (err: any) {
                setError(err);
            }

            setIsLoading(false);
        }
        onEffect();
    }, [])

    const cancelSignIn = () => {
        reset();
    }

    return (
        <AuthContext.Provider value={{
            isLoading,
            error,
            session,
            status,
            signOut,
            signIn,
            resendOTP: AuthActions.resendOTP,
            refreshToken,
            verifyOTP,
            cancelSignIn
        }
        }>
            {children}
        </AuthContext.Provider>
    );
};
