import { CognitoUserSession } from "amazon-cognito-identity-js"

export type AuthenticateUserNewPasswordRequiredResult = {
    type: "newPasswordRequired",
    payload: { userAttributes: { [x: string]: any }, requiredAttributes: string[] }
}

export type AuthenticateUserSuccessResult = {
    type: "success",
    payload: { session: CognitoUserSession, userConfirmationNecessary?: boolean }
}

export type AuthenticateUserResult = AuthenticateUserNewPasswordRequiredResult | AuthenticateUserSuccessResult
