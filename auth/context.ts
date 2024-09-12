import { CognitoUserSession, IAuthenticationDetailsData } from "amazon-cognito-identity-js";
import { createContext } from "react";
import { AuthenticateUserResult, AuthenticateUserSuccessResult } from "./types";
import { Club } from "@/appsync/API";

type AuthContextType = {
    session: CognitoUserSession | null;
    isLoading: boolean;
    error: Error | null;
    club: Club | null;
    status: "newPasswordRequired" | "success" | null;
    authenticateUser: (authenticationDetails: IAuthenticationDetailsData) => Promise<AuthenticateUserResult | null>;
    signOut: (callback?: () => any) => Promise<void>;
    completeNewPasswordChallenge: (newPassword: string, userAttributes: { [x: string]: any }, callback?: () => any) => Promise<AuthenticateUserSuccessResult | null>;
    refreshToken: () => Promise<CognitoUserSession | null>;
}

const AuthContext = createContext<AuthContextType>({
    club: null,
    session: null,
    isLoading: true,
    error: null,
    status: null,
    authenticateUser: async () => null,
    signOut: async () => { },
    completeNewPasswordChallenge: async () => null,
    refreshToken: async () => null
});

export default AuthContext