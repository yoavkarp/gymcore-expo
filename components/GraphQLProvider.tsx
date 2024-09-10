import { AuthOptions, createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";

import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloLink,
} from "@apollo/client";
import { PropsWithChildren } from "react";
import { getSession, refreshToken } from "@/auth/actions";
import awsExports from "@/constants/aws-exports";

/* The HTTPS endpoint of the AWS AppSync API 
(e.g. *https://aaaaaaaaaaaaaaaaaaaaaaaaaa.appsync-api.us-east-1.amazonaws.com/graphql*). 
[Custom domain names](https://docs.aws.amazon.com/appsync/latest/devguide/custom-domain-name.html) can also be supplied here (e.g. *https://api.yourdomain.com/graphql*). 
Custom domain names can have any format, but must end with `/graphql` 
(see https://graphql.org/learn/serving-over-http/#uris-routes). */

const url = awsExports.API.GraphQL.endpoint;
const region = awsExports.API.GraphQL.region;

const auth: AuthOptions = {
    type: "AMAZON_COGNITO_USER_POOLS",
    jwtToken: async () => {
        let session = await getSession();
        if (!session) {
            throw new Error("No session");
        }
        if (!session.isValid()) {
            session = await refreshToken();
        }
        if (!session)
            throw new Error("Failed to refresh session");

        return session.getIdToken().getJwtToken()
    },
};
const httpLink = new HttpLink({ uri: url });

const link = ApolloLink.from([
    createAuthLink({ url: require("@/constants/aws-exports").API.GraphQL.endpoint, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};