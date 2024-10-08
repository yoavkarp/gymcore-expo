/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMeasurementInput = {
  memberId?: string | null,
  weight?: number | null,
  height?: number | null,
  fat?: number | null,
  heart_rate?: number | null,
};

export type Measurement = {
  __typename: "Measurement",
  id: string,
  tenantId: string,
  created_at: string,
  updated_at: string,
  memberId: string,
  clubId?: string | null,
  weight?: number | null,
  height?: number | null,
  fat?: number | null,
  heart_rate?: number | null,
};

export type Document = {
  __typename: "Document",
  id: string,
  tenantId: string,
  created_at: string,
  updated_at: string,
};

export type Club = {
  __typename: "Club",
  id: string,
  tenantId: string,
  created_at: string,
  updated_at: string,
  name: string,
  email: string,
  phone_number: string,
  profile_picture: string,
  address: string,
};

export type Trainer = {
  __typename: "Trainer",
  id: string,
  tenantId: string,
  created_at: string,
  updated_at: string,
  phone_number: string,
  name: string,
  email?: string | null,
  birthdate: string,
  gender: Gender,
  address?: string | null,
};

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}


export type Workout = {
  __typename: "Workout",
  id: string,
  tenantId: string,
  clubId: string,
  created_at: string,
  updated_at: string,
  trainerId: string,
  memberId?: string | null,
  name: string,
  notes?: string | null,
  exercises?:  Array<Exercise > | null,
  library?: boolean | null,
};

export type Exercise = StrengthExercise | CardioExercise


export type StrengthExercise = {
  __typename: "StrengthExercise",
  id: string,
  xid: string,
  name: string,
  type: ExerciseType,
  notes?: string | null,
  machine_number?: string | null,
  seat_height?: string | null,
  angle?: Parameter | null,
  resistance?: Parameter | null,
  sets?:  Array<StrengthExerciseSet | null > | null,
};

export enum ExerciseType {
  STRENGTH = "STRENGTH",
  CARDIO = "CARDIO",
}


export type Parameter = {
  __typename: "Parameter",
  val?: number | null,
  max?: number | null,
  unit?: string | null,
};

export type StrengthExerciseSet = {
  __typename: "StrengthExerciseSet",
  id: string,
  reps?: Parameter | null,
  rest?: Parameter | null,
  weight?: Parameter | null,
  dropsets?:  Array<StrengthExerciseDropSet > | null,
};

export type StrengthExerciseDropSet = {
  __typename: "StrengthExerciseDropSet",
  id: string,
  reps?: Parameter | null,
  weight?: Parameter | null,
};

export type CardioExercise = {
  __typename: "CardioExercise",
  id: string,
  xid: string,
  name: string,
  type: ExerciseType,
  notes?: string | null,
  machine_number?: string | null,
  seat_height?: string | null,
  angle?: Parameter | null,
  resistance?: Parameter | null,
  intervals?:  Array<CardioExerciseInterval | null > | null,
};

export type CardioExerciseInterval = {
  __typename: "CardioExerciseInterval",
  id: string,
  duration?: Parameter | null,
  distance?: Parameter | null,
  tempo?: Parameter | null,
  intensity?: Parameter | null,
  angle?: Parameter | null,
  resistance?: Parameter | null,
  rest?: Parameter | null,
};

export type Member = {
  __typename: "Member",
  id: string,
  tenantId: string,
  created_at: string,
  updated_at: string,
  name?: string | null,
  email?: string | null,
  phone_number?: string | null,
  profile_picture?: string | null,
  address?: string | null,
  birthdate?: string | null,
  gender?: string | null,
  registered?: boolean | null,
  status?: string | null,
  measurement?: Measurement | null,
  goal?: Goal | null,
  profile_workouts?: WorkoutConnection | null,
};

export type Goal = {
  __typename: "Goal",
  id: string,
  tenantId: string,
  created_at: string,
  updated_at: string,
  memberId: string,
  clubId?: string | null,
  title: string,
  weight?: number | null,
  height?: number | null,
  fat?: number | null,
  heart_rate?: number | null,
  completed?: boolean | null,
  completed_at?: string | null,
};

export type WorkoutConnection = {
  __typename: "WorkoutConnection",
  items?:  Array<Workout > | null,
  nextToken?: string | null,
};

export type CreateMemberInput = {
  phone_number: string,
  name: string,
  email?: string | null,
  birthdate: string,
  gender: Gender,
  address?: string | null,
  measurement?: CreateMemberMeasurementInput | null,
};

export type CreateMemberMeasurementInput = {
  weight?: number | null,
  height?: number | null,
  fat?: number | null,
  heart_rate?: number | null,
};

export type CreateTrainerInput = {
  phone_number: string,
  name: string,
  email?: string | null,
  birthdate: string,
  gender: Gender,
  address?: string | null,
};

export type CreateWorkoutInput = {
  name: string,
  trainerId: string,
  memberId?: string | null,
  planId?: string | null,
  library?: boolean | null,
};

export type UpdateWorkoutInput = {
  name?: string | null,
  notes?: string | null,
};

export type AddExerciseToWorkoutInput = {
  xid: string,
  name: string,
  type: ExerciseType,
  machine_number?: string | null,
  seat_height?: string | null,
  notes?: string | null,
};

export type UpdateExerciseInWorkoutInput = {
  xid?: string | null,
  name?: string | null,
  type?: ExerciseType | null,
  notes?: string | null,
  machine_number?: string | null,
  seat_height?: string | null,
};

export type SetInput = {
  reps?: ParameterInput | null,
  rest?: ParameterInput | null,
  weight?: ParameterInput | null,
  times?: number | null,
  dropsets?: Array< StrengthExerciseDropSetInput > | null,
};

export type ParameterInput = {
  val?: number | null,
  max?: number | null,
  unit?: string | null,
};

export type StrengthExerciseDropSetInput = {
  reps?: ParameterInput | null,
  weight?: ParameterInput | null,
  times?: number | null,
};

export type IntervalInput = {
  duration?: ParameterInput | null,
  distance?: ParameterInput | null,
  tempo?: ParameterInput | null,
  intensity?: ParameterInput | null,
  angle?: ParameterInput | null,
  resistance?: ParameterInput | null,
  rest?: ParameterInput | null,
};

export type RegisterInput = {
  name: string,
  email?: string | null,
  profile_picture?: string | null,
  address?: string | null,
  birthdate: string,
  gender: Gender,
};

export type UpdateMemberProfileInput = {
  name?: string | null,
  email?: string | null,
  profile_picture?: string | null,
  address?: string | null,
  birthdate?: string | null,
  gender?: Gender | null,
};

export type Tenant = {
  __typename: "Tenant",
  id: string,
  name: string,
  email: string,
  phone_number: string,
  profile_picture: string,
  address: string,
  created_at: string,
  updated_at: string,
};

export type CreateMeasurementMutationVariables = {
  input: CreateMeasurementInput,
};

export type CreateMeasurementMutation = {
  createMeasurement?:  {
    __typename: "Measurement",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    memberId: string,
    clubId?: string | null,
    weight?: number | null,
    height?: number | null,
    fat?: number | null,
    heart_rate?: number | null,
  } | null,
};

export type CreateMeasurementForMemberMutationVariables = {
  memberId: string,
  input: CreateMeasurementInput,
};

export type CreateMeasurementForMemberMutation = {
  createMeasurementForMember?:  {
    __typename: "Measurement",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    memberId: string,
    clubId?: string | null,
    weight?: number | null,
    height?: number | null,
    fat?: number | null,
    heart_rate?: number | null,
  } | null,
};

export type CreateMemberMutationVariables = {
  input: CreateMemberInput,
};

export type CreateMemberMutation = {
  createMember?:  {
    __typename: "Member",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    name?: string | null,
    email?: string | null,
    phone_number?: string | null,
    profile_picture?: string | null,
    address?: string | null,
    birthdate?: string | null,
    gender?: string | null,
    registered?: boolean | null,
    status?: string | null,
    measurement?:  {
      __typename: "Measurement",
      id: string,
      tenantId: string,
      created_at: string,
      updated_at: string,
      memberId: string,
      clubId?: string | null,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
    } | null,
    goal?:  {
      __typename: "Goal",
      id: string,
      tenantId: string,
      created_at: string,
      updated_at: string,
      memberId: string,
      clubId?: string | null,
      title: string,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      completed?: boolean | null,
      completed_at?: string | null,
    } | null,
    profile_workouts?:  {
      __typename: "WorkoutConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateTrainerMutationVariables = {
  input: CreateTrainerInput,
};

export type CreateTrainerMutation = {
  createTrainer?:  {
    __typename: "Trainer",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    phone_number: string,
    name: string,
    email?: string | null,
    birthdate: string,
    gender: Gender,
    address?: string | null,
  } | null,
};

export type CreateWorkoutMutationVariables = {
  input: CreateWorkoutInput,
};

export type CreateWorkoutMutation = {
  createWorkout?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type UpdateWorkoutMutationVariables = {
  workoutId: string,
  input: UpdateWorkoutInput,
};

export type UpdateWorkoutMutation = {
  updateWorkout?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type DeleteWorkoutMutationVariables = {
  workoutId: string,
};

export type DeleteWorkoutMutation = {
  deleteWorkout?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type AddExerciseToWorkoutMutationVariables = {
  workoutId: string,
  input: AddExerciseToWorkoutInput,
};

export type AddExerciseToWorkoutMutation = {
  addExerciseToWorkout?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type UpdateExerciseInWorkoutMutationVariables = {
  workoutId: string,
  exerciseId: string,
  input: UpdateExerciseInWorkoutInput,
};

export type UpdateExerciseInWorkoutMutation = {
  updateExerciseInWorkout?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type DeleteExerciseFromWorkoutMutationVariables = {
  workoutId: string,
  exerciseId: string,
};

export type DeleteExerciseFromWorkoutMutation = {
  deleteExerciseFromWorkout?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type AddSetToExerciseMutationVariables = {
  workoutId: string,
  exerciseId: string,
  input: SetInput,
};

export type AddSetToExerciseMutation = {
  addSetToExercise?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type UpdateSetInExerciseMutationVariables = {
  workoutId: string,
  exerciseId: string,
  setId: string,
  input: SetInput,
};

export type UpdateSetInExerciseMutation = {
  updateSetInExercise?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type DeleteSetFromExerciseMutationVariables = {
  workoutId: string,
  exerciseId: string,
  setId: string,
};

export type DeleteSetFromExerciseMutation = {
  deleteSetFromExercise?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type AddIntervalToExerciseMutationVariables = {
  workoutId: string,
  exerciseId: string,
  input: IntervalInput,
};

export type AddIntervalToExerciseMutation = {
  addIntervalToExercise?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type UpdateIntervalInExerciseMutationVariables = {
  workoutId: string,
  exerciseId: string,
  intervalId: string,
  input: IntervalInput,
};

export type UpdateIntervalInExerciseMutation = {
  updateIntervalInExercise?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type DeleteIntervalFromExerciseMutationVariables = {
  workoutId: string,
  exerciseId: string,
  intervalId: string,
};

export type DeleteIntervalFromExerciseMutation = {
  deleteIntervalFromExercise?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type AddWorkoutToLibraryMutationVariables = {
  workoutId: string,
};

export type AddWorkoutToLibraryMutation = {
  addWorkoutToLibrary?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type MoveSetInExerciseMutationVariables = {
  workoutId: string,
  exerciseId: string,
  from: number,
  to: number,
};

export type MoveSetInExerciseMutation = {
  moveSetInExercise?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type MoveIntervalInExerciseMutationVariables = {
  workoutId: string,
  exerciseId: string,
  from: number,
  to: number,
};

export type MoveIntervalInExerciseMutation = {
  moveIntervalInExercise?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type MoveExerciseInWorkoutMutationVariables = {
  workoutId: string,
  from: number,
  to: number,
};

export type MoveExerciseInWorkoutMutation = {
  moveExerciseInWorkout?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type RegisterMutationVariables = {
  input: RegisterInput,
};

export type RegisterMutation = {
  register?:  {
    __typename: "Member",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    name?: string | null,
    email?: string | null,
    phone_number?: string | null,
    profile_picture?: string | null,
    address?: string | null,
    birthdate?: string | null,
    gender?: string | null,
    registered?: boolean | null,
    status?: string | null,
    measurement?:  {
      __typename: "Measurement",
      id: string,
      tenantId: string,
      created_at: string,
      updated_at: string,
      memberId: string,
      clubId?: string | null,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
    } | null,
    goal?:  {
      __typename: "Goal",
      id: string,
      tenantId: string,
      created_at: string,
      updated_at: string,
      memberId: string,
      clubId?: string | null,
      title: string,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      completed?: boolean | null,
      completed_at?: string | null,
    } | null,
    profile_workouts?:  {
      __typename: "WorkoutConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateMemberProfileMutationVariables = {
  input: UpdateMemberProfileInput,
};

export type UpdateMemberProfileMutation = {
  updateMemberProfile?:  {
    __typename: "Member",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    name?: string | null,
    email?: string | null,
    phone_number?: string | null,
    profile_picture?: string | null,
    address?: string | null,
    birthdate?: string | null,
    gender?: string | null,
    registered?: boolean | null,
    status?: string | null,
    measurement?:  {
      __typename: "Measurement",
      id: string,
      tenantId: string,
      created_at: string,
      updated_at: string,
      memberId: string,
      clubId?: string | null,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
    } | null,
    goal?:  {
      __typename: "Goal",
      id: string,
      tenantId: string,
      created_at: string,
      updated_at: string,
      memberId: string,
      clubId?: string | null,
      title: string,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      completed?: boolean | null,
      completed_at?: string | null,
    } | null,
    profile_workouts?:  {
      __typename: "WorkoutConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type GetClubByIdQueryVariables = {
  clubId: string,
};

export type GetClubByIdQuery = {
  getClubById?:  {
    __typename: "Club",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    name: string,
    email: string,
    phone_number: string,
    profile_picture: string,
    address: string,
  } | null,
};

export type GetTrainerByIdQueryVariables = {
  trainerId: string,
};

export type GetTrainerByIdQuery = {
  getTrainerById?:  {
    __typename: "Trainer",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    phone_number: string,
    name: string,
    email?: string | null,
    birthdate: string,
    gender: Gender,
    address?: string | null,
  } | null,
};

export type GetTenantQueryVariables = {
};

export type GetTenantQuery = {
  getTenant?:  {
    __typename: "Tenant",
    id: string,
    name: string,
    email: string,
    phone_number: string,
    profile_picture: string,
    address: string,
    created_at: string,
    updated_at: string,
  } | null,
};

export type GetWorkoutByIdQueryVariables = {
  workoutId: string,
};

export type GetWorkoutByIdQuery = {
  getWorkoutById?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    clubId: string,
    created_at: string,
    updated_at: string,
    trainerId: string,
    memberId?: string | null,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    library?: boolean | null,
  } | null,
};

export type GetClubTrainersQueryVariables = {
};

export type GetClubTrainersQuery = {
  getClubTrainers?:  Array< {
    __typename: "Trainer",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    phone_number: string,
    name: string,
    email?: string | null,
    birthdate: string,
    gender: Gender,
    address?: string | null,
  } > | null,
};

export type GetMemberByIdQueryVariables = {
  memberId: string,
};

export type GetMemberByIdQuery = {
  getMemberById?:  {
    __typename: "Member",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    name?: string | null,
    email?: string | null,
    phone_number?: string | null,
    profile_picture?: string | null,
    address?: string | null,
    birthdate?: string | null,
    gender?: string | null,
    registered?: boolean | null,
    status?: string | null,
    measurement?:  {
      __typename: "Measurement",
      id: string,
      tenantId: string,
      created_at: string,
      updated_at: string,
      memberId: string,
      clubId?: string | null,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
    } | null,
    goal?:  {
      __typename: "Goal",
      id: string,
      tenantId: string,
      created_at: string,
      updated_at: string,
      memberId: string,
      clubId?: string | null,
      title: string,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      completed?: boolean | null,
      completed_at?: string | null,
    } | null,
    profile_workouts?:  {
      __typename: "WorkoutConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListLibraryWorkoutsQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLibraryWorkoutsQuery = {
  listLibraryWorkouts?:  {
    __typename: "WorkoutConnection",
    items?:  Array< {
      __typename: "Workout",
      id: string,
      tenantId: string,
      clubId: string,
      created_at: string,
      updated_at: string,
      trainerId: string,
      memberId?: string | null,
      name: string,
      notes?: string | null,
      library?: boolean | null,
    } > | null,
    nextToken?: string | null,
  } | null,
};

export type SearchMembersQueryVariables = {
  text: string,
};

export type SearchMembersQuery = {
  searchMembers?:  Array< {
    __typename: "Member",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    name?: string | null,
    email?: string | null,
    phone_number?: string | null,
    profile_picture?: string | null,
    address?: string | null,
    birthdate?: string | null,
    gender?: string | null,
    registered?: boolean | null,
    status?: string | null,
    measurement?:  {
      __typename: "Measurement",
      id: string,
      tenantId: string,
      created_at: string,
      updated_at: string,
      memberId: string,
      clubId?: string | null,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
    } | null,
    goal?:  {
      __typename: "Goal",
      id: string,
      tenantId: string,
      created_at: string,
      updated_at: string,
      memberId: string,
      clubId?: string | null,
      title: string,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      completed?: boolean | null,
      completed_at?: string | null,
    } | null,
    profile_workouts?:  {
      __typename: "WorkoutConnection",
      nextToken?: string | null,
    } | null,
  } | null > | null,
};
