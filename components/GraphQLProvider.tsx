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
import config from "@/constants/aws-exports";

/* The HTTPS endpoint of the AWS AppSync API 
(e.g. *https://aaaaaaaaaaaaaaaaaaaaaaaaaa.appsync-api.us-east-1.amazonaws.com/graphql*). 
[Custom domain names](https://docs.aws.amazon.com/appsync/latest/devguide/custom-domain-name.html) can also be supplied here (e.g. *https://api.yourdomain.com/graphql*). 
Custom domain names can have any format, but must end with `/graphql` 
(see https://graphql.org/learn/serving-over-http/#uris-routes). */
const url = config.API.GraphQL.endpoint;
const region = config.API.GraphQL.region;

const auth: AuthOptions = {
    type: "AMAZON_COGNITO_USER_POOLS",
    jwtToken: async () => {

        let token: string | null = null;
        try {
            const session = await cognito.getSession()
            token = session.getIdToken().getJwtToken()
        }
        catch (e) {
            return "";
        }

        return token || "";

    },
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