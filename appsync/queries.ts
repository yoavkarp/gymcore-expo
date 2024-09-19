/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getClubById = /* GraphQL */ `query GetClubById($clubId: ID!) {
  getClubById(clubId: $clubId) {
    id
    tenantId
    created_at
    updated_at
    name
    email
    phone_number
    profile_picture
    address
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetClubByIdQueryVariables,
  APITypes.GetClubByIdQuery
>;
export const getTrainerById = /* GraphQL */ `query GetTrainerById($trainerId: ID!) {
  getTrainerById(trainerId: $trainerId) {
    id
    tenantId
    created_at
    updated_at
    phone_number
    name
    email
    birthdate
    gender
    address
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
export const getWorkoutById = /* GraphQL */ `query GetWorkoutById($id: ID!) {
  getWorkoutById(id: $id) {
    id
    tenantId
    created_at
    updated_at
    name
    notes
    exercises {
      id
      xid
      name
      section
      notes
      machine_number
      seat_height
      sets
      __typename
    }
    trainerId
    memberId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetWorkoutByIdQueryVariables,
  APITypes.GetWorkoutByIdQuery
>;
export const getMemberById = /* GraphQL */ `query GetMemberById($memberId: ID!) {
  getMemberById(memberId: $memberId) {
    id
    tenantId
    created_at
    updated_at
    name
    email
    phone_number
    profile_picture
    address
    birthdate
    gender
    registered
    status
    measurement {
      id
      tenantId
      created_at
      updated_at
      memberId
      clubId
      weight
      height
      fat
      heart_rate
      __typename
    }
    goal {
      id
      tenantId
      created_at
      updated_at
      memberId
      clubId
      title
      weight
      height
      fat
      heart_rate
      completed
      completed_at
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMemberByIdQueryVariables,
  APITypes.GetMemberByIdQuery
>;
export const getTrainers = /* GraphQL */ `query GetTrainers {
  getTrainers {
    id
    tenantId
    created_at
    updated_at
    phone_number
    name
    email
    birthdate
    gender
    address
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTrainersQueryVariables,
  APITypes.GetTrainersQuery
>;
export const searchMembers = /* GraphQL */ `query SearchMembers($text: String!) {
  searchMembers(text: $text) {
    id
    tenantId
    created_at
    updated_at
    name
    email
    phone_number
    profile_picture
    address
    birthdate
    gender
    registered
    status
    measurement {
      id
      tenantId
      created_at
      updated_at
      memberId
      clubId
      weight
      height
      fat
      heart_rate
      __typename
    }
    goal {
      id
      tenantId
      created_at
      updated_at
      memberId
      clubId
      title
      weight
      height
      fat
      heart_rate
      completed
      completed_at
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchMembersQueryVariables,
  APITypes.SearchMembersQuery
>;
