/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createMember = /* GraphQL */ `mutation CreateMember($input: CreateMemberInput!) {
  createMember(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMemberMutationVariables,
  APITypes.CreateMemberMutation
>;
export const deleteMember = /* GraphQL */ `mutation DeleteMember($memberId: ID!) {
  deleteMember(memberId: $memberId) {
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
` as GeneratedMutation<
  APITypes.DeleteMemberMutationVariables,
  APITypes.DeleteMemberMutation
>;
export const createTrainer = /* GraphQL */ `mutation CreateTrainer($input: CreateTrainerInput!) {
  createTrainer(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateTrainerMutationVariables,
  APITypes.CreateTrainerMutation
>;
export const updateAuthenticatedMember = /* GraphQL */ `mutation UpdateAuthenticatedMember($input: UpdateAuthenticatedMemberInput!) {
  updateAuthenticatedMember(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateAuthenticatedMemberMutationVariables,
  APITypes.UpdateAuthenticatedMemberMutation
>;
export const firstTimeMemberRegister = /* GraphQL */ `mutation FirstTimeMemberRegister($input: FirstTimeMemberRegisterInput!) {
  firstTimeMemberRegister(input: $input) {
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
` as GeneratedMutation<
  APITypes.FirstTimeMemberRegisterMutationVariables,
  APITypes.FirstTimeMemberRegisterMutation
>;
export const createMeasurement = /* GraphQL */ `mutation CreateMeasurement($input: CreateMeasurementInput!) {
  createMeasurement(input: $input) {
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
}
` as GeneratedMutation<
  APITypes.CreateMeasurementMutationVariables,
  APITypes.CreateMeasurementMutation
>;
export const createGoal = /* GraphQL */ `mutation CreateGoal($input: CreateGoalInput!) {
  createGoal(input: $input) {
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
}
` as GeneratedMutation<
  APITypes.CreateGoalMutationVariables,
  APITypes.CreateGoalMutation
>;
export const updateGoal = /* GraphQL */ `mutation UpdateGoal($goalId: ID!, $input: UpdateGoalInput!) {
  updateGoal(goalId: $goalId, input: $input) {
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
}
` as GeneratedMutation<
  APITypes.UpdateGoalMutationVariables,
  APITypes.UpdateGoalMutation
>;
