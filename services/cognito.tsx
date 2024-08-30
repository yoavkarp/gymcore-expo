import * as AWS from 'aws-sdk';
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoRefreshToken,
    CognitoUserSession,
} from 'amazon-cognito-identity-js';
import config from '../constants/aws-exports';

const region = "eu-central-1";
AWS.config.region = region;

let userPool = new CognitoUserPool({
    UserPoolId: config.Auth.Cognito.userPoolId,
    ClientId: config.Auth.Cognito.userPoolClientId,
});
let cognitoUser: CognitoUser;

const login = (username: string, password: string) => {

    let authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password
    });

    cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
    });

    return new Promise<{
        cognitoUser: CognitoUser;
        session: CognitoUserSession; // if success
    }>((res, rej) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (session) {
                cognitoUser.setSignInUserSession(session)
                res({
                    session,
                    cognitoUser,
                })
            },
            onFailure: rej,
            newPasswordRequired: function () {
                rej(new Error("newPasswordRequired"))
            }
        });
    })
}

const getCurrentUser = () => {
    return userPool.getCurrentUser();
}

const getSession = () => {
    const currentUser = getCurrentUser();

    if (!currentUser)
        return Promise.reject(new Error("No Session Found, Please login"))

    return new Promise<CognitoUserSession>((res, rej) => {
        currentUser.getSession((err: Error | null, session?: CognitoUserSession | null) => {
            if (err)
                return rej(err)

            if (!session)
                return rej(new Error("No Session Found, Please login"))

            res(session)
        })
    })
}


const refreshToken = (force = false) => {
    return new Promise<CognitoUserSession>((res, rej) => {
        const currentUser = getCurrentUser();

        if (!currentUser)
            return rej(new Error("No Session Found, Please login"))

        if (currentUser)
            currentUser.getSession((err: Error | null, session?: CognitoUserSession | null) => {

                if (err)
                    return rej(err)

                if (!session)
                    return rej(new Error("No Session Found, Please login"))

                currentUser.refreshSession(new CognitoRefreshToken({ RefreshToken: session.getRefreshToken().getToken() }), (err, refreshedSession) => {
                    if (err) {
                        return rej(err)
                    }

                    res(refreshedSession);
                })
            })

        rej(new Error("No Session Found, Please login"))
    })
}

const signOut = () => new Promise((res) => {
    userPool.getCurrentUser()?.signOut(() => {
        res(undefined)
    })
})

export const cognito = {
    login,
    refreshToken,
    signOut,
    getSession,
    getCurrentUser
}