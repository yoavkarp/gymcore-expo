import { CognitoUserSession, IAuthenticationDetailsData } from "amazon-cognito-identity-js";
import { createContext } from "react";
import { AuthenticateUserResult, AuthenticateUserSuccessResult } from "./types";

type AuthContextType = {
    session: CognitoUserSession | null;
    isLoading: boolean;
    error: Error | null;
    status: "newPasswordRequired" | "success" | null;
    authenticateUser: (authenticationDetails: IAuthenticationDetailsData) => Promise<AuthenticateUserResult | null>;
    signOut: () => Promise<void>;
    completeNewPasswordChallenge: (newPassword: string, userAttributes: { [x: string]: any }, callback?: () => any) => Promise<AuthenticateUserSuccessResult | null>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    isLoading: true,
    error: null,
    status: null,
    authenticateUser: async () => null,
    signOut: async () => { },
    completeNewPasswordChallenge: async () => null,
});

export default AuthContext