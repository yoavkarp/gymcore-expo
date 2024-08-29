import { AuthOptions, createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";

import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
} from "@apollo/client";
import { cognito } from "../services/cognito";
import { PropsWithChildren } from "react";

/* The HTTPS endpoint of the AWS AppSync API 
(e.g. *https://aaaaaaaaaaaaaaaaaaaaaaaaaa.appsync-api.us-east-1.amazonaws.com/graphql*). 
[Custom domain names](https://docs.aws.amazon.com/appsync/latest/devguide/custom-domain-name.html) can also be supplied here (e.g. *https://api.yourdomain.com/graphql*). 
Custom domain names can have any format, but must end with `/graphql` 
(see https://graphql.org/learn/serving-over-http/#uris-routes). */
const url = process.env.REACT_APP_APPSYNC_GRAPHQL_URL!;

const region = process.env.REACT_APP_AWS_REGION!;

const auth: AuthOptions = {
    type: "AMAZON_COGNITO_USER_POOLS",
    jwtToken: async () => {
        let token: string | null = (await cognito.refreshToken()).session!.getIdToken().getJwtToken();

        const regenerateIdToken = async () => {
            try {
                const id_token = (await cognito.refreshToken()).session!.getIdToken()
                return id_token.getJwtToken();
            }
            catch (e) {
                return null;
            }
        }

        if (token) {
            const exp = localStorage.getItem('id_exp');
            if (Number(exp) < Date.now()) {
                token = await regenerateIdToken()
            }
        }
        else {
            token = await regenerateIdToken();
        }

        return token || "";
    }, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
};

const httpLink = new HttpLink({ uri: url });

const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};