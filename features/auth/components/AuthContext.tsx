import { CognitoUserSession } from "amazon-cognito-identity-js";
import { createContext } from "react";
import { AuthenticateUserResult } from "../types";

type AuthContextType = {
    session: CognitoUserSession | null;
    isLoading: boolean;
    error: Error | null;
    status: AuthenticateUserResult["type"] | null;

    signIn: (username: string) => Promise<AuthenticateUserResult>;
    signOut: (callback?: () => any) => Promise<void>;
    verifyOTP: (code: string) => Promise<AuthenticateUserResult>;
    refreshToken: () => Promise<AuthenticateUserResult>;
    resendOTP: () => Promise<AuthenticateUserResult>;

    cancelSignIn: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext