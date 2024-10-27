/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const test = /* GraphQL */ `mutation Test($input: CreateMeasurementInput!) {
  test(input: $input) {
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
` as GeneratedMutation<APITypes.TestMutationVariables, APITypes.TestMutation>;
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
    picture
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTrainerMutationVariables,
  APITypes.CreateTrainerMutation
>;
export const createEvent = /* GraphQL */ `mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    tenantId
    id
    clubId
    trainerId
    memberId
    start_at
    created_at
    updated_at
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateEventMutationVariables,
  APITypes.CreateEventMutation
>;
export const deleteEvent = /* GraphQL */ `mutation DeleteEvent($eventId: ID!) {
  deleteEvent(eventId: $eventId) {
    tenantId
    id
    clubId
    trainerId
    memberId
    start_at
    created_at
    updated_at
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteEventMutationVariables,
  APITypes.DeleteEventMutation
>;
export const createPlan = /* GraphQL */ `mutation CreatePlan($trainerId: ID!, $input: CreatePlanInput!) {
  createPlan(trainerId: $trainerId, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreatePlanMutationVariables,
  APITypes.CreatePlanMutation
>;
export const deletePlan = /* GraphQL */ `mutation DeletePlan($planId: ID!) {
  deletePlan(planId: $planId) {
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
` as GeneratedMutation<
  APITypes.DeletePlanMutationVariables,
  APITypes.DeletePlanMutation
>;
export const createWorkout = /* GraphQL */ `mutation CreateWorkout($trainerId: ID!, $input: CreateWorkoutInput!) {
  createWorkout(trainerId: $trainerId, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateWorkoutMutationVariables,
  APITypes.CreateWorkoutMutation
>;
export const updateWorkout = /* GraphQL */ `mutation UpdateWorkout(
  $trainerId: ID!
  $workoutId: ID!
  $input: UpdateWorkoutInput!
) {
  updateWorkout(trainerId: $trainerId, workoutId: $workoutId, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateWorkoutMutationVariables,
  APITypes.UpdateWorkoutMutation
>;
export const deleteWorkout = /* GraphQL */ `mutation DeleteWorkout($workoutId: ID!) {
  deleteWorkout(workoutId: $workoutId) {
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
` as GeneratedMutation<
  APITypes.DeleteWorkoutMutationVariables,
  APITypes.DeleteWorkoutMutation
>;
export const addExerciseToWorkout = /* GraphQL */ `mutation AddExerciseToWorkout(
  $trainerId: ID!
  $workoutId: ID!
  $input: AddExerciseToWorkoutInput!
) {
  addExerciseToWorkout(
    trainerId: $trainerId
    workoutId: $workoutId
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
` as GeneratedMutation<
  APITypes.AddExerciseToWorkoutMutationVariables,
  APITypes.AddExerciseToWorkoutMutation
>;
export const updateExerciseInWorkout = /* GraphQL */ `mutation UpdateExerciseInWorkout(
  $trainerId: ID!
  $workoutId: ID!
  $exerciseId: ID!
  $input: UpdateExerciseInWorkoutInput!
) {
  updateExerciseInWorkout(
    trainerId: $trainerId
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
` as GeneratedMutation<
  APITypes.UpdateExerciseInWorkoutMutationVariables,
  APITypes.UpdateExerciseInWorkoutMutation
>;
export const deleteExerciseFromWorkout = /* GraphQL */ `mutation DeleteExerciseFromWorkout(
  $trainerId: ID!
  $workoutId: ID!
  $exerciseId: ID!
) {
  deleteExerciseFromWorkout(
    trainerId: $trainerId
    workoutId: $workoutId
    exerciseId: $exerciseId
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
` as GeneratedMutation<
  APITypes.DeleteExerciseFromWorkoutMutationVariables,
  APITypes.DeleteExerciseFromWorkoutMutation
>;
export const addSetToExercise = /* GraphQL */ `mutation AddSetToExercise(
  $trainerId: ID!
  $workoutId: ID!
  $exerciseId: ID!
  $input: SetInput!
) {
  addSetToExercise(
    trainerId: $trainerId
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
` as GeneratedMutation<
  APITypes.AddSetToExerciseMutationVariables,
  APITypes.AddSetToExerciseMutation
>;
export const updateSetInExercise = /* GraphQL */ `mutation UpdateSetInExercise(
  $trainerId: ID!
  $workoutId: ID!
  $exerciseId: ID!
  $setId: ID!
  $input: SetInput!
) {
  updateSetInExercise(
    trainerId: $trainerId
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
` as GeneratedMutation<
  APITypes.UpdateSetInExerciseMutationVariables,
  APITypes.UpdateSetInExerciseMutation
>;
export const deleteSetFromExercise = /* GraphQL */ `mutation DeleteSetFromExercise(
  $trainerId: ID!
  $workoutId: ID!
  $exerciseId: ID!
  $setId: ID!
) {
  deleteSetFromExercise(
    trainerId: $trainerId
    workoutId: $workoutId
    exerciseId: $exerciseId
    setId: $setId
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
` as GeneratedMutation<
  APITypes.DeleteSetFromExerciseMutationVariables,
  APITypes.DeleteSetFromExerciseMutation
>;
export const addIntervalToExercise = /* GraphQL */ `mutation AddIntervalToExercise(
  $trainerId: ID!
  $workoutId: ID!
  $exerciseId: ID!
  $input: IntervalInput!
) {
  addIntervalToExercise(
    trainerId: $trainerId
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
` as GeneratedMutation<
  APITypes.AddIntervalToExerciseMutationVariables,
  APITypes.AddIntervalToExerciseMutation
>;
export const updateIntervalInExercise = /* GraphQL */ `mutation UpdateIntervalInExercise(
  $trainerId: ID!
  $workoutId: ID!
  $exerciseId: ID!
  $intervalId: ID!
  $input: IntervalInput!
) {
  updateIntervalInExercise(
    trainerId: $trainerId
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
` as GeneratedMutation<
  APITypes.UpdateIntervalInExerciseMutationVariables,
  APITypes.UpdateIntervalInExerciseMutation
>;
export const deleteIntervalFromExercise = /* GraphQL */ `mutation DeleteIntervalFromExercise(
  $trainerId: ID!
  $workoutId: ID!
  $exerciseId: ID!
  $intervalId: ID!
) {
  deleteIntervalFromExercise(
    trainerId: $trainerId
    workoutId: $workoutId
    exerciseId: $exerciseId
    intervalId: $intervalId
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
` as GeneratedMutation<
  APITypes.DeleteIntervalFromExerciseMutationVariables,
  APITypes.DeleteIntervalFromExerciseMutation
>;
export const addWorkoutToLibrary = /* GraphQL */ `mutation AddWorkoutToLibrary($trainerId: ID!, $workoutId: ID!) {
  addWorkoutToLibrary(trainerId: $trainerId, workoutId: $workoutId) {
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
` as GeneratedMutation<
  APITypes.AddWorkoutToLibraryMutationVariables,
  APITypes.AddWorkoutToLibraryMutation
>;
export const importWorkoutFromLibrary = /* GraphQL */ `mutation ImportWorkoutFromLibrary(
  $trainerId: ID!
  $workoutId: ID!
  $input: ImportWorkoutFromLibraryInput!
) {
  importWorkoutFromLibrary(
    trainerId: $trainerId
    workoutId: $workoutId
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
` as GeneratedMutation<
  APITypes.ImportWorkoutFromLibraryMutationVariables,
  APITypes.ImportWorkoutFromLibraryMutation
>;
export const moveSetInExercise = /* GraphQL */ `mutation MoveSetInExercise(
  $trainerId: ID!
  $workoutId: ID!
  $exerciseId: ID!
  $from: Int!
  $to: Int!
) {
  moveSetInExercise(
    trainerId: $trainerId
    workoutId: $workoutId
    exerciseId: $exerciseId
    from: $from
    to: $to
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
` as GeneratedMutation<
  APITypes.MoveSetInExerciseMutationVariables,
  APITypes.MoveSetInExerciseMutation
>;
export const moveIntervalInExercise = /* GraphQL */ `mutation MoveIntervalInExercise(
  $trainerId: ID!
  $workoutId: ID!
  $exerciseId: ID!
  $from: Int!
  $to: Int!
) {
  moveIntervalInExercise(
    trainerId: $trainerId
    workoutId: $workoutId
    exerciseId: $exerciseId
    from: $from
    to: $to
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
` as GeneratedMutation<
  APITypes.MoveIntervalInExerciseMutationVariables,
  APITypes.MoveIntervalInExerciseMutation
>;
export const moveExerciseInWorkout = /* GraphQL */ `mutation MoveExerciseInWorkout(
  $trainerId: ID!
  $workoutId: ID!
  $from: Int!
  $to: Int!
) {
  moveExerciseInWorkout(
    trainerId: $trainerId
    workoutId: $workoutId
    from: $from
    to: $to
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
` as GeneratedMutation<
  APITypes.MoveExerciseInWorkoutMutationVariables,
  APITypes.MoveExerciseInWorkoutMutation
>;
export const startActiveWorkout = /* GraphQL */ `mutation StartActiveWorkout($workoutId: ID!) {
  startActiveWorkout(workoutId: $workoutId) {
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
` as GeneratedMutation<
  APITypes.StartActiveWorkoutMutationVariables,
  APITypes.StartActiveWorkoutMutation
>;
export const endActiveWorkout = /* GraphQL */ `mutation EndActiveWorkout {
  endActiveWorkout {
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
` as GeneratedMutation<
  APITypes.EndActiveWorkoutMutationVariables,
  APITypes.EndActiveWorkoutMutation
>;
export const endActiveWorkoutInterval = /* GraphQL */ `mutation EndActiveWorkoutInterval($input: EndIntervalInput!) {
  endActiveWorkoutInterval(input: $input) {
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
` as GeneratedMutation<
  APITypes.EndActiveWorkoutIntervalMutationVariables,
  APITypes.EndActiveWorkoutIntervalMutation
>;
export const endActiveWorkoutSet = /* GraphQL */ `mutation EndActiveWorkoutSet($input: EndSetInput!) {
  endActiveWorkoutSet(input: $input) {
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
` as GeneratedMutation<
  APITypes.EndActiveWorkoutSetMutationVariables,
  APITypes.EndActiveWorkoutSetMutation
>;
export const endActiveWorkoutDropset = /* GraphQL */ `mutation EndActiveWorkoutDropset($input: EndDropsetInput!) {
  endActiveWorkoutDropset(input: $input) {
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
` as GeneratedMutation<
  APITypes.EndActiveWorkoutDropsetMutationVariables,
  APITypes.EndActiveWorkoutDropsetMutation
>;
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
` as GeneratedMutation<
  APITypes.UpdateMemberProfileMutationVariables,
  APITypes.UpdateMemberProfileMutation
>;
