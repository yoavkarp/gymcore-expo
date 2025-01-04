import "@/initialize";
import { AuthenticationDetails, ClientMetadata, CognitoUser, CognitoUserPool, CognitoUserSession, ICognitoUserPoolData } from "amazon-cognito-identity-js";
import { AuthenticateUserMfaResult, AuthenticateUserResult, AuthenticateUserSuccessResult } from "./types";
import { AuthNotInitializedError, MfaNotSupportedError, NoSessionError } from "./errors";
import { Platform } from "react-native";

let userPool: CognitoUserPool | null = null;
let initialized: boolean = false;
let currentUser: CognitoUser | null = null;

function withInitialized<T extends (...args: any[]) => any = () => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> {
    return (...args) => {
        if (!initialized) {
            console.error("GYMCORE", "features/auth/actions.ts", "Auth not initialized")
            throw new AuthNotInitializedError(fn.name)
        }
        return fn(...args);
    }
}

function handleMfaRequired(challengeName: string, challengeParameters: any): AuthenticateUserMfaResult {

    if (challengeName === "SMS_MFA") {
        return {
            type: "MFA_REQUIRED",
            payload: challengeParameters
        };
    }

    throw new MfaNotSupportedError()
}

function handleOnSuccess(session: CognitoUserSession, userConfirmationNecessary?: boolean): AuthenticateUserSuccessResult {
    const user = userPool?.getCurrentUser();
    user?.setSignInUserSession(session)
    return {
        type: "AUTHENTICATED",
        payload: {
            session,
            userConfirmationNecessary
        }
    }
}

export function getCurrentSession() {
    return new Promise<CognitoUserSession | null>((resolve, reject) => {
        const user = userPool?.getCurrentUser();
        if (!user) {
            resolve(null)
        }

        user?.getSession((err: Error | null, session: CognitoUserSession | null) => {
            if (err) {
                reject(err)
            } else {
                resolve(session!)
            }
        });
    })
}

export async function initialize(pool: ICognitoUserPoolData) {
    userPool = new CognitoUserPool(pool);
    console.log("GYMCORE", "features/auth/actions.ts", "Initializing...")
    await sync();
    console.log("GYMCORE", "features/auth/actions.ts", "Initialized")
    initialized = true;
    return userPool;
}

export const refreshToken = withInitialized(() => {
    return new Promise<AuthenticateUserResult>(async (resolve, reject) => {
        const session = await getCurrentSession();

        if (!session) {
            return reject(new NoSessionError())
        }

        const user = userPool?.getCurrentUser();

        user?.refreshSession(session.getRefreshToken(), (err: Error | null, session: CognitoUserSession | null) => {
            if (err)
                reject(err)

            if (session) {
                user?.setSignInUserSession(session);
                resolve({
                    type: "AUTHENTICATED",
                    payload: {
                        session,
                    }
                })
            }

        })

    })
})

export const signOut = withInitialized((callback?: () => any) => {
    return new Promise<void>((resolve) => {
        const user = userPool?.getCurrentUser();
        user?.signOut(async () => {
            await callback?.();
            resolve()
        });
    })
})

export const signIn = withInitialized((username: string, clientMetadata?: ClientMetadata) => {
    return new Promise<AuthenticateUserResult>((resolve, reject) => {
        console.log("GYMCORE USERNAME", username)
        const user = new CognitoUser({ Username: username, Pool: userPool! });
        currentUser = user;
        user.authenticateUser(new AuthenticationDetails({ Username: username, Password: "Abcd1234!@", ClientMetadata: clientMetadata }), {
            onSuccess: (session, userConfirmationNecessary) => {
                console.log("GYMCORE", "handleOnSuccess starting")
                const result = handleOnSuccess(session, userConfirmationNecessary)
                console.log("GYMCORE", "handleOnSuccess finished", result)
                resolve(result);
            },
            onFailure: (err: Error) => {
                console.error("GYMCORE", "features/auth/actions.ts", err, err.stack)
                reject(err)
            },
            mfaRequired: (challengeName, challengeParameters) => {
                const result = handleMfaRequired(challengeName, challengeParameters);
                resolve(result);
            },
        })
    })
})

export const verifyPhoneNumber = withInitialized((code: string) => {
    return new Promise<AuthenticateUserSuccessResult>((resolve, reject) => {
        console.log(userPool?.getCurrentUser() || currentUser)
        const user = userPool?.getCurrentUser() || currentUser;
        if (!user) {
            return reject(new AuthNotInitializedError())
        }

        user.sendMFACode(code, {
            onSuccess: (session, userConfirmationNecessary) => {
                const result = handleOnSuccess(session, userConfirmationNecessary)
                resolve(result);
            },
            onFailure: reject
        })
    })
})

export const resendOTP = withInitialized(() => {
    if (!currentUser) {
        throw new AuthNotInitializedError()
    }

    return signIn(currentUser.getUsername(), { "resend": "true" })
})

export const sync = () => {
    return new Promise<string>((resolve, reject) => {

        if (Platform.OS === 'web') {
            return resolve("Web platform does not support sync")
        }

        if (!userPool) {
            console.error("GYMCORE SYNC", "No user pool found")
            reject(new Error("No user pool found"))
        }
        else {
            (userPool as any).storage.sync(function (err: Error | null, result: string) {
                if (err) {
                    console.error("GYMCORE SYNC", err)
                    reject(err)
                }
                else {
                    console.log("GYMCORE SYNC", result)
                    resolve(result)
                }
            });
        }
    })
}