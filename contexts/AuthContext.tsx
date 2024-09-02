import { cognito } from '@/services/cognito';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

// Create a context
export const AuthContext = createContext<{
    userSession?: CognitoUserSession;
    login: (username: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
    ready: boolean;
}>({
    login: async () => null,
    logout: async () => null,
    ready: false
});

export function useAuth() {
    const value = useContext(AuthContext);

    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }
    return value;
}



// Create a provider component
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [userSession, setUserSession] = useState<CognitoUserSession>();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await cognito.sync()
                const session = await cognito.getSession()
                setUserSession(session)
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setReady(true)
            }

        })()
    }, [])

    return (
        <AuthContext.Provider value={{
            userSession,
            ready,
            login: async (username, password) => {
                const result = await cognito.login(username, password);
                setUserSession(result.session)
            },
            logout: async () => {
                await cognito.signOut();
                setUserSession(undefined)
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
};
