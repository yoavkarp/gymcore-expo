/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createMeasurement = /* GraphQL */ `mutation CreateMeasurement($input: CreateMeasurementInput!) {
  createMeasurement(input: $input) {
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
}
` as GeneratedMutation<
  APITypes.CreateMeasurementMutationVariables,
  APITypes.CreateMeasurementMutation
>;
export const createMember = /* GraphQL */ `mutation CreateMember($input: CreateMemberInput!) {
  createMember(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateMemberMutationVariables,
  APITypes.CreateMemberMutation
>;
export const createTrainer = /* GraphQL */ `mutation CreateTrainer($input: CreateTrainerInput!) {
  createTrainer(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateTrainerMutationVariables,
  APITypes.CreateTrainerMutation
>;
export const createWorkout = /* GraphQL */ `mutation CreateWorkout($input: CreateWorkoutInput!) {
  createWorkout(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateWorkoutMutationVariables,
  APITypes.CreateWorkoutMutation
>;
export const register = /* GraphQL */ `mutation Register($input: RegisterInput!) {
  register(input: $input) {
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
` as GeneratedMutation<
  APITypes.RegisterMutationVariables,
  APITypes.RegisterMutation
>;
export const updateMemberProfile = /* GraphQL */ `mutation UpdateMemberProfile($input: UpdateMemberProfileInput!) {
  updateMemberProfile(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateMemberProfileMutationVariables,
  APITypes.UpdateMemberProfileMutation
>;
