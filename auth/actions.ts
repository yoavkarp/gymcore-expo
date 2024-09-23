import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession, CookieStorage, IAuthenticationDetailsData } from "amazon-cognito-identity-js";
import { AuthenticateUserResult, AuthenticateUserSuccessResult } from "./types";
import { Amplify } from "aws-amplify";

let userPool: CognitoUserPool | null = null;
let user: CognitoUser | null;
let requiredAttributes: string[] = [];
let userAttributes: { [x: string]: any } = {};

let initialized = false;

export async function initializeUserPool(pool?: CognitoUserPool) {
    const { userPoolId: UserPoolId, userPoolClientId: ClientId } = Amplify.getConfig().Auth!.Cognito;

    userPool = pool || new CognitoUserPool({
        UserPoolId: UserPoolId!,
        ClientId: ClientId!
    });
    if (!initialized) {
        await sync();
        initialized = true;
    }
    user = userPool.getCurrentUser();
}

export function getUserPool() {
    return userPool;
}

export function getUser() {
    if (userPool)
        return userPool.getCurrentUser();
    else return user;
}

export function getNewPasswordAttributes() {
    return { userAttributes, requiredAttributes };
}

export const authenticateUser = (authenticationDetails: IAuthenticationDetailsData) => {
    return new Promise<AuthenticateUserResult | null>((resolve, reject) => {
        user = new CognitoUser({ Username: authenticationDetails.Username, Pool: userPool! });
        if (user)
            user.authenticateUser(new AuthenticationDetails(authenticationDetails), {
                onSuccess: (session, userConfirmationNecessary) => {
                    user!.setSignInUserSession(session)
                    resolve({
                        type: "success",
                        payload: {
                            session,
                            userConfirmationNecessary
                        }
                    });
                },
                onFailure: reject,
                newPasswordRequired: (_userAttributes, _requiredAttributes) => {

                    userAttributes = _userAttributes;
                    requiredAttributes = _requiredAttributes;

                    resolve({
                        type: "newPasswordRequired",
                        payload: {
                            userAttributes,
                            requiredAttributes
                        }
                    });
                }
            })
        else {
            reject(new Error("No user found"))
        }
    })
}

export const getSession = () => {
    return new Promise<CognitoUserSession | null>((resolve, reject) => {
        if (!user) {
            reject(new Error("No user found"))
        }
        else {
            user.getSession((err: Error | null, session: CognitoUserSession | null) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(session)
                }
            });
        }

    })
}

export const refreshToken = () => {
    return new Promise<CognitoUserSession | null>(async (resolve, reject) => {
        if (!user) {
            reject(new Error("No user found"))
        }
        else {
            const session = await getSession();
            if (!session) {
                reject(new Error("No session found"))
            }
            else {
                user.refreshSession(session.getRefreshToken(), (err: Error | null, session: CognitoUserSession | null) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(session)
                    }
                })
            }
        }
    })
}

export const signOut = (callback?: () => any) => {
    return new Promise<void>((resolve, reject) => {
        if (!user) {
            reject(new Error("No user found"))
        }
        else {
            user.signOut(async () => {
                await callback?.();
                user = null;
                resolve()
            });
        }
    })
}

export const completeNewPasswordChallenge = (newPassword: string, userAttributes: { [x: string]: any }) => {
    return new Promise<AuthenticateUserSuccessResult | null>((resolve, reject) => {
        if (!user) {
            reject(new Error("No user found"))
        }
        else {
            user.completeNewPasswordChallenge(newPassword, userAttributes, {
                onSuccess: (session, userConfirmationNecessary) => {
                    user!.setSignInUserSession(session)
                    requiredAttributes = [];
                    userAttributes = {};
                    resolve({
                        type: "success",
                        payload: {
                            session,
                            userConfirmationNecessary
                        }
                    })
                },
                onFailure: reject
            })
        }
    })
}

export const forgotPassword = (username: string) => {
    return new Promise<void>((resolve, reject) => {
        if (!userPool) {
            reject(new Error("No user pool found"))
        }
        else {
            new CognitoUser({ Username: username, Pool: userPool }).forgotPassword({
                onSuccess: resolve,
                onFailure: reject,
                inputVerificationCode: function (data) {
                    console.log('Code sent to: ' + JSON.stringify(data));
                    resolve(data)
                },

            })

            new CognitoUser({ Username: username, Pool: userPool }).confirmPassword
        }
    })
}

export const sync = () => {
    return new Promise<string>((resolve, reject) => {
        if (!userPool) {
            console.log("Sync completed")
            reject(new Error("No user pool found"))
        }
        else {
            (userPool as any).storage.sync(function (err: Error | null, result: string) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(result)
                }
            });
        }
    })
}