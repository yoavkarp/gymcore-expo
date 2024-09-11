import { gql } from "@apollo/client";

export const getAuthenticatedClub = gql`
query GetAuthenticatedClub {
    getAuthenticatedClub {
        id
    }
}`