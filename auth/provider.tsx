import { PropsWithChildren, useState, useEffect } from "react";
import AuthContext from "./context";
import { CognitoUserPool, CognitoUserSession } from "amazon-cognito-identity-js";
import { authenticateUser, completeNewPasswordChallenge, getSession, getUser, getUserPool, initializeUserPool, signOut } from "./actions";
import { Amplify } from "aws-amplify";

export type AuthProviderProps = {

}


export function AuthProvider({ children }: PropsWithChildren<AuthProviderProps>) {

    const [session, setSession] = useState<CognitoUserSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"newPasswordRequired" | "success" | null>(null);

    useEffect(() => {
        async function onEffect() {

            if (!isLoading)
                setIsLoading(true);

            await initializeUserPool()

            const user = getUser();

            if (user) {
                try {
                    const session = await getSession();
                    setSession(session);
                } catch (err: any) {
                    setError(err);
                }
                finally {
                    setIsLoading(false)
                }
            }
            else {
                setSession(null);
                setIsLoading(false);
            }
        }
        onEffect();
    }, [])

    return (
        <AuthContext.Provider value={{
            isLoading,
            error,
            session,
            status,
            authenticateUser: async (authenticationDetails) => {
                setError(null);
                setStatus(null);
                try {
                    const result = await authenticateUser(authenticationDetails);
                    if (!result) return null;
                    if (result.type === "success") {

                        setSession(result.payload.session)
                    }
                    else if (result.type === "newPasswordRequired") {
                        setStatus("newPasswordRequired")
                    }


                    return result;
                } catch (err: any) {
                    setError(err);
                    return null;
                }
            },
            signOut: async (callback?: () => any) => {
                setIsLoading(true)
                setError(null);
                setSession(null);
                setStatus(null);
                const res = await signOut(callback)
                setIsLoading(false);
                return res;
            },
            completeNewPasswordChallenge: async (newPassword, userAttributes) => {
                setError(null);
                try {
                    const res = await completeNewPasswordChallenge(newPassword, userAttributes);
                    if (res) {
                        setSession(res.payload.session)
                        setStatus("success")
                    }
                    return res;
                }
                catch (err: any) {
                    setError(err);
                    return null;
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
};
