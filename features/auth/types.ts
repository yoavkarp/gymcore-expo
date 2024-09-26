import { CognitoUserSession } from "amazon-cognito-identity-js"
import { Club } from "@/graphql";

export type AuthenticateUserNewPasswordRequiredResult = {
    type: "newPasswordRequired",
    payload: { userAttributes: { [x: string]: any }, requiredAttributes: string[] }
}

export type AuthenticateUserSuccessResult = {
    type: "success",
    payload: { session: CognitoUserSession, userConfirmationNecessary?: boolean }
}

export type AuthenticateUserResult = AuthenticateUserNewPasswordRequiredResult | AuthenticateUserSuccessResult


export type CognitoSessionDecodedPayload = Record<`club:${keyof Omit<Club, "__typename">}`, string> & {
    readonly "cognito:groups": Array<'member' | 'club'>;
    readonly "email_verified": boolean;
    readonly "zoneinfo": string,
    readonly "sub": string,
    readonly "address": {
        readonly "formatted": string
    },
    readonly "iss": string,
    readonly "cognito:username": string,
    readonly "locale": string,
    readonly "picture": string,
    readonly "origin_jti": string,
    readonly "cognito:roles": Array<string>
    readonly "aud": string,
    readonly "event_id": string,
    readonly "token_use": "id" | "refresh" | "access",
    readonly "auth_time": number,
    readonly "name": string,
    readonly "phone_number": string,
    readonly "exp": number,
    readonly "iat": number,
    readonly "jti": string;
}