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
    picture
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
export const getWorkoutById = /* GraphQL */ `query GetWorkoutById($workoutId: ID!) {
  getWorkoutById(workoutId: $workoutId) {
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
        type
        notes
        machine_number
        seat_height
      }
      ... on CardioExercise {
        id
        xid
        name
        type
        notes
        machine_number
        seat_height
      }
    }
    library
    trainer {
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
      picture
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetWorkoutByIdQueryVariables,
  APITypes.GetWorkoutByIdQuery
>;
export const getClubTrainers = /* GraphQL */ `query GetClubTrainers {
  getClubTrainers {
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
    picture
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetClubTrainersQueryVariables,
  APITypes.GetClubTrainersQuery
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
    profile_workouts {
      nextToken
      __typename
    }
    plans {
      nextToken
      __typename
    }
    tenant {
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
    picture
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMemberByIdQueryVariables,
  APITypes.GetMemberByIdQuery
>;
export const getPlanById = /* GraphQL */ `query GetPlanById($planId: ID!) {
  getPlanById(planId: $planId) {
    id
    tenantId
    memberId
    trainerId
    notes
    workouts {
      nextToken
      __typename
    }
    clubId
    weeks
    meetings
    created_at
    updated_at
    member {
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
      picture
      __typename
    }
    trainer {
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
      picture
      __typename
    }
    events {
      nextToken
      __typename
    }
    activeWorkouts {
      nextToken
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPlanByIdQueryVariables,
  APITypes.GetPlanByIdQuery
>;
export const listLibraryWorkouts = /* GraphQL */ `query ListLibraryWorkouts($limit: Int, $nextToken: String) {
  listLibraryWorkouts(limit: $limit, nextToken: $nextToken) {
    items {
      id
      tenantId
      clubId
      created_at
      updated_at
      trainerId
      memberId
      name
      notes
      library
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLibraryWorkoutsQueryVariables,
  APITypes.ListLibraryWorkoutsQuery
>;
export const listPlansByMemberId = /* GraphQL */ `query ListPlansByMemberId($memberId: ID!, $limit: Int, $nextToken: String) {
  listPlansByMemberId(
    memberId: $memberId
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      tenantId
      memberId
      trainerId
      notes
      clubId
      weeks
      meetings
      created_at
      updated_at
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlansByMemberIdQueryVariables,
  APITypes.ListPlansByMemberIdQuery
>;
export const listPlansByTrainerId = /* GraphQL */ `query ListPlansByTrainerId($trainerId: ID!, $limit: Int, $nextToken: String) {
  listPlansByTrainerId(
    trainerId: $trainerId
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      tenantId
      memberId
      trainerId
      notes
      clubId
      weeks
      meetings
      created_at
      updated_at
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlansByTrainerIdQueryVariables,
  APITypes.ListPlansByTrainerIdQuery
>;
export const listPlansByClub = /* GraphQL */ `query ListPlansByClub($limit: Int, $nextToken: String) {
  listPlansByClub(limit: $limit, nextToken: $nextToken) {
    items {
      id
      tenantId
      memberId
      trainerId
      notes
      clubId
      weeks
      meetings
      created_at
      updated_at
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlansByClubQueryVariables,
  APITypes.ListPlansByClubQuery
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
    profile_workouts {
      nextToken
      __typename
    }
    plans {
      nextToken
      __typename
    }
    tenant {
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
    picture
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchMembersQueryVariables,
  APITypes.SearchMembersQuery
>;
export const searchExercises = /* GraphQL */ `query SearchExercises($query: String!) {
  searchExercises(query: $query) {
    items {
      id
      exercise
      hebrew
      equipment
      equipment_hebrew
      search
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchExercisesQueryVariables,
  APITypes.SearchExercisesQuery
>;
export const getActiveWorkout = /* GraphQL */ `query GetActiveWorkout {
  getActiveWorkout {
    id
    tenantId
    clubId
    workoutId
    created_at
    updated_at
    started_at
    end_at
    name
    exercises {
      ... on ActiveStrengthExercise {
        id
        xid
        name
        type
        notes
        machine_number
        seat_height
      }
      ... on ActiveCardioExercise {
        id
        xid
        name
        type
        notes
        machine_number
        seat_height
      }
    }
    memberId
    planId
    notes
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetActiveWorkoutQueryVariables,
  APITypes.GetActiveWorkoutQuery
>;
export const getCurrentMember = /* GraphQL */ `query GetCurrentMember {
  getCurrentMember {
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
    plans {
      nextToken
      __typename
    }
    tenant {
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
    picture
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCurrentMemberQueryVariables,
  APITypes.GetCurrentMemberQuery
>;
export const listActiveWorkoutsHistory = /* GraphQL */ `query ListActiveWorkoutsHistory {
  listActiveWorkoutsHistory {
    items {
      id
      tenantId
      clubId
      workoutId
      created_at
      updated_at
      started_at
      end_at
      name
      memberId
      planId
      notes
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListActiveWorkoutsHistoryQueryVariables,
  APITypes.ListActiveWorkoutsHistoryQuery
>;
