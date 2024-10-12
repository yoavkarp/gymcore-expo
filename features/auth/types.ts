import { CognitoUserSession } from "amazon-cognito-identity-js"

export type AuthenticateUserSuccessResult = {
    type: "AUTHENTICATED",
    payload: { session: CognitoUserSession, userConfirmationNecessary?: boolean }
}

export type AuthenticateUserMfaResult = {
    type: "MFA_REQUIRED",
    payload: { CODE_DELIVERY_DELIVERY_MEDIUM: string, CODE_DELIVERY_DESTINATION: string }
}

export type AuthenticateUserResult = AuthenticateUserSuccessResult | AuthenticateUserMfaResult;

export type CognitoSessionDecodedPayload = {
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