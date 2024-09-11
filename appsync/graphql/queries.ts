/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getMemberById = /* GraphQL */ `query GetMemberById($memberId: ID!) {
  getMemberById(memberId: $memberId) {
    id
    tenantId
    name
    email
    phone_number
    profile_picture
    address
    birthdate
    gender
    registered
    measurement {
      id
      tenantId
      memberId
      clubId
      weight
      height
      fat
      heart_rate
      created_at
      updated_at
      __typename
    }
    goal {
      id
      tenantId
      memberId
      clubId
      title
      weight
      height
      fat
      heart_rate
      completed
      completed_at
      created_at
      updated_at
      __typename
    }
    created_at
    updated_at
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMemberByIdQueryVariables,
  APITypes.GetMemberByIdQuery
>;
export const getAuthenticatedMember = /* GraphQL */ `query GetAuthenticatedMember {
  getAuthenticatedMember {
    id
    tenantId
    name
    email
    phone_number
    profile_picture
    address
    birthdate
    gender
    registered
    measurement {
      id
      tenantId
      memberId
      clubId
      weight
      height
      fat
      heart_rate
      created_at
      updated_at
      __typename
    }
    goal {
      id
      tenantId
      memberId
      clubId
      title
      weight
      height
      fat
      heart_rate
      completed
      completed_at
      created_at
      updated_at
      __typename
    }
    created_at
    updated_at
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAuthenticatedMemberQueryVariables,
  APITypes.GetAuthenticatedMemberQuery
>;
export const getClubById = /* GraphQL */ `query GetClubById($clubId: ID!) {
  getClubById(clubId: $clubId) {
    id
    tenantId
    name
    email
    phone_number
    profile_picture
    address
    created_at
    updated_at
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetClubByIdQueryVariables,
  APITypes.GetClubByIdQuery
>;
export const getAuthenticatedClub = /* GraphQL */ `query GetAuthenticatedClub {
  getAuthenticatedClub {
    id
    tenantId
    name
    email
    phone_number
    profile_picture
    address
    created_at
    updated_at
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAuthenticatedClubQueryVariables,
  APITypes.GetAuthenticatedClubQuery
>;
export const getTrainersByClubId = /* GraphQL */ `query GetTrainersByClubId($clubId: ID!) {
  getTrainersByClubId(clubId: $clubId) {
    id
    tenantId
    name
    email
    phone_number
    profile_picture
    created_at
    updated_at
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTrainersByClubIdQueryVariables,
  APITypes.GetTrainersByClubIdQuery
>;
export const getTrainerById = /* GraphQL */ `query GetTrainerById($trainerId: ID!) {
  getTrainerById(trainerId: $trainerId) {
    id
    tenantId
    name
    email
    phone_number
    profile_picture
    created_at
    updated_at
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTrainerByIdQueryVariables,
  APITypes.GetTrainerByIdQuery
>;
export const getTenant = /* GraphQL */ `query GetTenant {
  getTenant {
    id
    name
    email
    phone_number
    profile_picture
    address
    created_at
    updated_at
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTenantQueryVariables, APITypes.GetTenantQuery>;
