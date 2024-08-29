import * as AWS from 'aws-sdk';
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoRefreshToken,
    CognitoUserSession,
} from 'amazon-cognito-identity-js';

const region = "eu-central-1";
AWS.config.region = region;

let poolData = {
    UserPoolId: "eu-central-1_LfGbvt3BI",
    ClientId: "3oj9rofls0hok7fmrr81rec005"
};

let userPool = new CognitoUserPool(poolData);

let cognitoUser: CognitoUser;

const completePasswordChallenge = (newPassword: string, userAttributes: any, requiredAttributes: any) => {
    return new Promise<{
        session: CognitoUserSession
        userConfirmationNecessary?: boolean
    }>((res, rej) => {

        console.log(requiredAttributes);

        delete userAttributes.email_verified;
        delete userAttributes.phone_number_verified;
        delete userAttributes["custom:organizationId"];
        delete userAttributes.phone_number;
        delete userAttributes.email;
        delete userAttributes.updated_at;

        cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
            onSuccess(session, userConfirmationNecessary) {
                cognitoUser.setSignInUserSession(session);
                res({
                    session,
                    userConfirmationNecessary
                })
            },
            onFailure(err) {
                rej(err)
            }
        })
    })

}

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
        session?: CognitoUserSession; // if success
        type: "success" | "newPasswordRequired";
        requiredAttributes?: any; // for newPasswordRequired
        userAttributes?: any; // for newPasswordRequired
        complete?: (password: string, info: { gender: string, address: string }) => Promise<{
            cognitoUser: CognitoUser;
            session: CognitoUserSession;
            type: "success";
        }>; // for newPasswordRequired
    }>((res, rej) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result: CognitoUserSession) {
                cognitoUser.setSignInUserSession(result)
                res({
                    session: result,
                    cognitoUser,
                    type: "success"
                })
            },
            onFailure: function (err) {
                rej(err)
            },
            newPasswordRequired: function (userAttributes, requiredAttributes) {

                delete userAttributes.email_verified;
                delete userAttributes.phone_number_verified;
                delete userAttributes["custom:organizationId"];
                delete userAttributes.updated_at;

                userAttributes.locale = "he";

                res({
                    cognitoUser,
                    type: "newPasswordRequired",
                    userAttributes,
                    requiredAttributes
                })
            }

        });
    })
}


const refreshToken = (force = false) => {
    return new Promise<{
        jwtToken: string;
        payload: Record<string, any>;
        session: CognitoUserSession
    }>((res, rej) => {
        const currentUser = userPool.getCurrentUser();

        if (currentUser)
            currentUser!.getSession((err: Error | null, session: CognitoUserSession | null) => {

                if (err || force) {
                    const RefreshToken = session?.getRefreshToken().getToken()
                    if (!RefreshToken) {
                        rej("No Session Found")
                    }
                    else {
                        currentUser?.refreshSession(new CognitoRefreshToken({ RefreshToken }), (err, data: CognitoUserSession) => {
                            if (err) {
                                return rej(err)
                            }

                            res({
                                jwtToken: data.getIdToken().getJwtToken(),
                                session: data,
                                payload: data.getIdToken().decodePayload() as any
                            });
                        })

                    }
                }
                else if (session) {
                    res({
                        jwtToken: session.getIdToken().getJwtToken(),
                        session: session,
                        payload: session.getIdToken().decodePayload() as any
                    });
                } else {
                    rej("No data found")
                }
            })
        else {
            login("guest@fip.net", "Abcd1234!@")
                .then((response) => {
                    res({
                        jwtToken: response.session!.getIdToken().getJwtToken(),
                        session: response.session!,
                        payload: response.session!.getIdToken().decodePayload() as any
                    })
                })


        }
    })
}

const signOut = () => new Promise<undefined>((res) => {
    userPool.getCurrentUser()?.signOut(() => {
        res(undefined)
    })
})


export type UpdateProfileInput = {
    name?: string;
    address?: string;
    picture?: string;
}
const updateProfile = (props: UpdateProfileInput) => new Promise<any>((res, rej) => {
    const currentUser = userPool.getCurrentUser();

    if (currentUser) {
        currentUser.getSession(() => {
            currentUser.updateAttributes(Object.keys(props).map((Name) => ({
                Name,
                Value: (props as any)[Name]
            })), (err, _result, d) => {
                if (err) {
                    rej(err)
                }
                else {
                    res(d)
                }
            })
        })
    }
    else {
        rej("NO USER")
    }
})

export const cognito = {
    login,
    refreshToken,
    signOut,
    updateProfile,
    completePasswordChallenge,
}