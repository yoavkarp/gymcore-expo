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
export const createMeasurementForMember = /* GraphQL */ `mutation CreateMeasurementForMember(
  $memberId: ID!
  $input: CreateMeasurementInput!
) {
  createMeasurementForMember(memberId: $memberId, input: $input) {
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
  APITypes.CreateMeasurementForMemberMutationVariables,
  APITypes.CreateMeasurementForMemberMutation
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
    profile_workouts {
      nextToken
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
    clubId
    created_at
    updated_at
    trainerId
    memberId
    name
    notes
    exercises {
      ... on StrengthExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
      ... on CardioExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateWorkoutMutationVariables,
  APITypes.CreateWorkoutMutation
>;
export const updateWorkout = /* GraphQL */ `mutation UpdateWorkout($workoutId: ID!, $input: UpdateWorkoutInput!) {
  updateWorkout(workoutId: $workoutId, input: $input) {
    id
    tenantId
    clubId
    created_at
    updated_at
    trainerId
    memberId
    name
    notes
    exercises {
      ... on StrengthExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
      ... on CardioExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateWorkoutMutationVariables,
  APITypes.UpdateWorkoutMutation
>;
export const addExerciseToWorkout = /* GraphQL */ `mutation AddExerciseToWorkout(
  $workoutId: ID!
  $input: AddExerciseToWorkoutInput!
) {
  addExerciseToWorkout(workoutId: $workoutId, input: $input) {
    id
    tenantId
    clubId
    created_at
    updated_at
    trainerId
    memberId
    name
    notes
    exercises {
      ... on StrengthExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
      ... on CardioExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.AddExerciseToWorkoutMutationVariables,
  APITypes.AddExerciseToWorkoutMutation
>;
export const updateExerciseInWorkout = /* GraphQL */ `mutation UpdateExerciseInWorkout(
  $workoutId: ID!
  $exerciseId: ID!
  $input: UpdateExerciseInWorkoutInput!
) {
  updateExerciseInWorkout(
    workoutId: $workoutId
    exerciseId: $exerciseId
    input: $input
  ) {
    id
    tenantId
    clubId
    created_at
    updated_at
    trainerId
    memberId
    name
    notes
    exercises {
      ... on StrengthExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
      ... on CardioExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateExerciseInWorkoutMutationVariables,
  APITypes.UpdateExerciseInWorkoutMutation
>;
export const addSetToExercise = /* GraphQL */ `mutation AddSetToExercise(
  $workoutId: ID!
  $exerciseId: ID!
  $input: SetInput!
) {
  addSetToExercise(
    workoutId: $workoutId
    exerciseId: $exerciseId
    input: $input
  ) {
    id
    tenantId
    clubId
    created_at
    updated_at
    trainerId
    memberId
    name
    notes
    exercises {
      ... on StrengthExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
      ... on CardioExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.AddSetToExerciseMutationVariables,
  APITypes.AddSetToExerciseMutation
>;
export const addIntervalToExercise = /* GraphQL */ `mutation AddIntervalToExercise(
  $workoutId: ID!
  $exerciseId: ID!
  $input: IntervalInput!
) {
  addIntervalToExercise(
    workoutId: $workoutId
    exerciseId: $exerciseId
    input: $input
  ) {
    id
    tenantId
    clubId
    created_at
    updated_at
    trainerId
    memberId
    name
    notes
    exercises {
      ... on StrengthExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
      ... on CardioExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.AddIntervalToExerciseMutationVariables,
  APITypes.AddIntervalToExerciseMutation
>;
export const updateSetInExercise = /* GraphQL */ `mutation UpdateSetInExercise(
  $workoutId: ID!
  $exerciseId: ID!
  $setId: ID!
  $input: SetInput!
) {
  updateSetInExercise(
    workoutId: $workoutId
    exerciseId: $exerciseId
    setId: $setId
    input: $input
  ) {
    id
    tenantId
    clubId
    created_at
    updated_at
    trainerId
    memberId
    name
    notes
    exercises {
      ... on StrengthExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
      ... on CardioExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateSetInExerciseMutationVariables,
  APITypes.UpdateSetInExerciseMutation
>;
export const updateIntervalInExercise = /* GraphQL */ `mutation UpdateIntervalInExercise(
  $workoutId: ID!
  $exerciseId: ID!
  $intervalId: ID!
  $input: IntervalInput!
) {
  updateIntervalInExercise(
    workoutId: $workoutId
    exerciseId: $exerciseId
    intervalId: $intervalId
    input: $input
  ) {
    id
    tenantId
    clubId
    created_at
    updated_at
    trainerId
    memberId
    name
    notes
    exercises {
      ... on StrengthExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
      ... on CardioExercise {
        id
        xid
        name
        notes
        machine_number
        seat_height
      }
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateIntervalInExerciseMutationVariables,
  APITypes.UpdateIntervalInExerciseMutation
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
    profile_workouts {
      nextToken
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
    profile_workouts {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMemberProfileMutationVariables,
  APITypes.UpdateMemberProfileMutation
>;
