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
  picture?: string | null,
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
  trainer?: Trainer | null,
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
  target_heart_rate?: Parameter | null,
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
  target_heart_rate?: Parameter | null,
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
  plans?: PlanConnection | null,
  tenant?: Tenant | null,
  picture?: string | null,
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

export type PlanConnection = {
  __typename: "PlanConnection",
  items?:  Array<Plan > | null,
  nextToken?: string | null,
};

export type Plan = {
  __typename: "Plan",
  id: string,
  tenantId: string,
  memberId: string,
  trainerId: string,
  notes?: string | null,
  workouts?: WorkoutConnection | null,
  clubId: string,
  weeks: number,
  meetings: number,
  created_at: string,
  updated_at: string,
  member?: Member | null,
  trainer?: Trainer | null,
  events?: EventConnection | null,
  activeWorkouts?: ActiveWorkoutConnection | null,
};

export type EventConnection = {
  __typename: "EventConnection",
  items?:  Array<Event > | null,
  nextToken?: string | null,
};

export type Event = {
  __typename: "Event",
  tenantId: string,
  id: string,
  clubId: string,
  trainerId: string,
  memberId: string,
  start_at: string,
  created_at: string,
  updated_at: string,
};

export type ActiveWorkoutConnection = {
  __typename: "ActiveWorkoutConnection",
  items?:  Array<ActiveWorkout > | null,
  nextToken?: string | null,
};

export type ActiveWorkout = {
  __typename: "ActiveWorkout",
  id: string,
  tenantId: string,
  clubId: string,
  workoutId: string,
  created_at: string,
  updated_at: string,
  started_at: string,
  end_at?: string | null,
  name: string,
  exercises?:  Array<ActiveExercise > | null,
  memberId: string,
  planId?: string | null,
  notes?: string | null,
};

export type ActiveExercise = ActiveStrengthExercise | ActiveCardioExercise


export type ActiveStrengthExercise = {
  __typename: "ActiveStrengthExercise",
  id: string,
  xid: string,
  name: string,
  type: ExerciseType,
  notes?: string | null,
  machine_number?: string | null,
  seat_height?: string | null,
  angle?: ActiveParameter | null,
  resistance?: ActiveParameter | null,
  sets?:  Array<ActiveStrengthExerciseSet | null > | null,
};

export type ActiveParameter = {
  __typename: "ActiveParameter",
  val?: number | null,
  max?: number | null,
  unit?: string | null,
  done?: number | null,
};

export type ActiveStrengthExerciseSet = {
  __typename: "ActiveStrengthExerciseSet",
  id: string,
  reps?: ActiveParameter | null,
  rest?: ActiveParameter | null,
  weight?: ActiveParameter | null,
  dropsets?:  Array<ActiveStrengthExerciseDropSet > | null,
};

export type ActiveStrengthExerciseDropSet = {
  __typename: "ActiveStrengthExerciseDropSet",
  id: string,
  reps?: ActiveParameter | null,
  weight?: ActiveParameter | null,
};

export type ActiveCardioExercise = {
  __typename: "ActiveCardioExercise",
  id: string,
  xid: string,
  name: string,
  type: ExerciseType,
  notes?: string | null,
  machine_number?: string | null,
  seat_height?: string | null,
  angle?: ActiveParameter | null,
  resistance?: ActiveParameter | null,
  target_heart_rate?: ActiveParameter | null,
  intervals?:  Array<ActiveCardioExerciseInterval | null > | null,
};

export type ActiveCardioExerciseInterval = {
  __typename: "ActiveCardioExerciseInterval",
  id: string,
  duration?: ActiveParameter | null,
  distance?: ActiveParameter | null,
  tempo?: ActiveParameter | null,
  intensity?: ActiveParameter | null,
  angle?: ActiveParameter | null,
  resistance?: ActiveParameter | null,
  rest?: ActiveParameter | null,
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

export type CreateEventInput = {
  start_at: string,
  planId: string,
};

export type CreatePlanInput = {
  memberId: string,
  weeks: number,
  meetings: number,
};

export type CreateWorkoutInput = {
  name: string,
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
  id?: string | null,
};

export type IntervalInput = {
  duration?: ParameterInput | null,
  distance?: ParameterInput | null,
  tempo?: ParameterInput | null,
  intensity?: ParameterInput | null,
  angle?: ParameterInput | null,
  resistance?: ParameterInput | null,
  rest?: ParameterInput | null,
  target_heart_rate?: ParameterInput | null,
};

export type ImportWorkoutFromLibraryInput = {
  memberId?: string | null,
  planId?: string | null,
};

export type EndIntervalInput = {
  exerciseId: string,
  intervalId: string,
  duration?: number | null,
  distance?: number | null,
  tempo?: number | null,
  intensity?: number | null,
  angle?: number | null,
  resistance?: number | null,
  rest?: number | null,
  target_heart_rate?: number | null,
};

export type EndSetInput = {
  exerciseId: string,
  setId: string,
  weight?: number | null,
  rest?: number | null,
  reps?: number | null,
};

export type EndDropsetInput = {
  exerciseId: string,
  setId: string,
  dropsetId: string,
  weight?: number | null,
  reps?: number | null,
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
  picture?: string | null,
};

export type TestMutationVariables = {
  input: CreateMeasurementInput,
};

export type TestMutation = {
  test?:  {
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
    plans?:  {
      __typename: "PlanConnection",
      nextToken?: string | null,
    } | null,
    tenant?:  {
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
    picture?: string | null,
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
    picture?: string | null,
  } | null,
};

export type CreateEventMutationVariables = {
  input: CreateEventInput,
};

export type CreateEventMutation = {
  createEvent?:  {
    __typename: "Event",
    tenantId: string,
    id: string,
    clubId: string,
    trainerId: string,
    memberId: string,
    start_at: string,
    created_at: string,
    updated_at: string,
  } | null,
};

export type DeleteEventMutationVariables = {
  eventId: string,
};

export type DeleteEventMutation = {
  deleteEvent?:  {
    __typename: "Event",
    tenantId: string,
    id: string,
    clubId: string,
    trainerId: string,
    memberId: string,
    start_at: string,
    created_at: string,
    updated_at: string,
  } | null,
};

export type CreatePlanMutationVariables = {
  trainerId: string,
  input: CreatePlanInput,
};

export type CreatePlanMutation = {
  createPlan?:  {
    __typename: "Plan",
    id: string,
    tenantId: string,
    memberId: string,
    trainerId: string,
    notes?: string | null,
    workouts?:  {
      __typename: "WorkoutConnection",
      nextToken?: string | null,
    } | null,
    clubId: string,
    weeks: number,
    meetings: number,
    created_at: string,
    updated_at: string,
    member?:  {
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
      picture?: string | null,
    } | null,
    trainer?:  {
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
      picture?: string | null,
    } | null,
    events?:  {
      __typename: "EventConnection",
      nextToken?: string | null,
    } | null,
    activeWorkouts?:  {
      __typename: "ActiveWorkoutConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeletePlanMutationVariables = {
  planId: string,
};

export type DeletePlanMutation = {
  deletePlan?:  {
    __typename: "Plan",
    id: string,
    tenantId: string,
    memberId: string,
    trainerId: string,
    notes?: string | null,
    workouts?:  {
      __typename: "WorkoutConnection",
      nextToken?: string | null,
    } | null,
    clubId: string,
    weeks: number,
    meetings: number,
    created_at: string,
    updated_at: string,
    member?:  {
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
      picture?: string | null,
    } | null,
    trainer?:  {
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
      picture?: string | null,
    } | null,
    events?:  {
      __typename: "EventConnection",
      nextToken?: string | null,
    } | null,
    activeWorkouts?:  {
      __typename: "ActiveWorkoutConnection",
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateWorkoutMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type UpdateWorkoutMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type AddExerciseToWorkoutMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type UpdateExerciseInWorkoutMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type DeleteExerciseFromWorkoutMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type AddSetToExerciseMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type UpdateSetInExerciseMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type DeleteSetFromExerciseMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type AddIntervalToExerciseMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type UpdateIntervalInExerciseMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type DeleteIntervalFromExerciseMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type AddWorkoutToLibraryMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type ImportWorkoutFromLibraryMutationVariables = {
  trainerId: string,
  workoutId: string,
  input: ImportWorkoutFromLibraryInput,
};

export type ImportWorkoutFromLibraryMutation = {
  importWorkoutFromLibrary?:  {
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type MoveSetInExerciseMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type MoveIntervalInExerciseMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type MoveExerciseInWorkoutMutationVariables = {
  trainerId: string,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
  } | null,
};

export type StartActiveWorkoutMutationVariables = {
  workoutId: string,
};

export type StartActiveWorkoutMutation = {
  startActiveWorkout?:  {
    __typename: "ActiveWorkout",
    id: string,
    tenantId: string,
    clubId: string,
    workoutId: string,
    created_at: string,
    updated_at: string,
    started_at: string,
    end_at?: string | null,
    name: string,
    exercises:  Array<( {
        __typename: "ActiveStrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "ActiveCardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    memberId: string,
    planId?: string | null,
    notes?: string | null,
  } | null,
};

export type EndActiveWorkoutMutationVariables = {
};

export type EndActiveWorkoutMutation = {
  endActiveWorkout?:  {
    __typename: "ActiveWorkout",
    id: string,
    tenantId: string,
    clubId: string,
    workoutId: string,
    created_at: string,
    updated_at: string,
    started_at: string,
    end_at?: string | null,
    name: string,
    exercises:  Array<( {
        __typename: "ActiveStrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "ActiveCardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    memberId: string,
    planId?: string | null,
    notes?: string | null,
  } | null,
};

export type EndActiveWorkoutIntervalMutationVariables = {
  input: EndIntervalInput,
};

export type EndActiveWorkoutIntervalMutation = {
  endActiveWorkoutInterval?:  {
    __typename: "ActiveWorkout",
    id: string,
    tenantId: string,
    clubId: string,
    workoutId: string,
    created_at: string,
    updated_at: string,
    started_at: string,
    end_at?: string | null,
    name: string,
    exercises:  Array<( {
        __typename: "ActiveStrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "ActiveCardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    memberId: string,
    planId?: string | null,
    notes?: string | null,
  } | null,
};

export type EndActiveWorkoutSetMutationVariables = {
  input: EndSetInput,
};

export type EndActiveWorkoutSetMutation = {
  endActiveWorkoutSet?:  {
    __typename: "ActiveWorkout",
    id: string,
    tenantId: string,
    clubId: string,
    workoutId: string,
    created_at: string,
    updated_at: string,
    started_at: string,
    end_at?: string | null,
    name: string,
    exercises:  Array<( {
        __typename: "ActiveStrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "ActiveCardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    memberId: string,
    planId?: string | null,
    notes?: string | null,
  } | null,
};

export type EndActiveWorkoutDropsetMutationVariables = {
  input: EndDropsetInput,
};

export type EndActiveWorkoutDropsetMutation = {
  endActiveWorkoutDropset?:  {
    __typename: "ActiveWorkout",
    id: string,
    tenantId: string,
    clubId: string,
    workoutId: string,
    created_at: string,
    updated_at: string,
    started_at: string,
    end_at?: string | null,
    name: string,
    exercises:  Array<( {
        __typename: "ActiveStrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "ActiveCardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    memberId: string,
    planId?: string | null,
    notes?: string | null,
  } | null,
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
    plans?:  {
      __typename: "PlanConnection",
      nextToken?: string | null,
    } | null,
    tenant?:  {
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
    picture?: string | null,
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
    plans?:  {
      __typename: "PlanConnection",
      nextToken?: string | null,
    } | null,
    tenant?:  {
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
    picture?: string | null,
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
    picture?: string | null,
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
    trainer?:  {
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
      picture?: string | null,
    } | null,
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
    picture?: string | null,
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
    plans?:  {
      __typename: "PlanConnection",
      nextToken?: string | null,
    } | null,
    tenant?:  {
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
    picture?: string | null,
  } | null,
};

export type GetPlanByIdQueryVariables = {
  planId: string,
};

export type GetPlanByIdQuery = {
  getPlanById?:  {
    __typename: "Plan",
    id: string,
    tenantId: string,
    memberId: string,
    trainerId: string,
    notes?: string | null,
    workouts?:  {
      __typename: "WorkoutConnection",
      nextToken?: string | null,
    } | null,
    clubId: string,
    weeks: number,
    meetings: number,
    created_at: string,
    updated_at: string,
    member?:  {
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
      picture?: string | null,
    } | null,
    trainer?:  {
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
      picture?: string | null,
    } | null,
    events?:  {
      __typename: "EventConnection",
      nextToken?: string | null,
    } | null,
    activeWorkouts?:  {
      __typename: "ActiveWorkoutConnection",
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

export type ListPlansByMemberIdQueryVariables = {
  memberId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlansByMemberIdQuery = {
  listPlansByMemberId?:  {
    __typename: "PlanConnection",
    items?:  Array< {
      __typename: "Plan",
      id: string,
      tenantId: string,
      memberId: string,
      trainerId: string,
      notes?: string | null,
      clubId: string,
      weeks: number,
      meetings: number,
      created_at: string,
      updated_at: string,
    } > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPlansByTrainerIdQueryVariables = {
  trainerId: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlansByTrainerIdQuery = {
  listPlansByTrainerId?:  {
    __typename: "PlanConnection",
    items?:  Array< {
      __typename: "Plan",
      id: string,
      tenantId: string,
      memberId: string,
      trainerId: string,
      notes?: string | null,
      clubId: string,
      weeks: number,
      meetings: number,
      created_at: string,
      updated_at: string,
    } > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPlansByClubQueryVariables = {
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlansByClubQuery = {
  listPlansByClub?:  {
    __typename: "PlanConnection",
    items?:  Array< {
      __typename: "Plan",
      id: string,
      tenantId: string,
      memberId: string,
      trainerId: string,
      notes?: string | null,
      clubId: string,
      weeks: number,
      meetings: number,
      created_at: string,
      updated_at: string,
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
    plans?:  {
      __typename: "PlanConnection",
      nextToken?: string | null,
    } | null,
    tenant?:  {
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
    picture?: string | null,
  } | null > | null,
};

export type GetActiveWorkoutQueryVariables = {
};

export type GetActiveWorkoutQuery = {
  getActiveWorkout?:  {
    __typename: "ActiveWorkout",
    id: string,
    tenantId: string,
    clubId: string,
    workoutId: string,
    created_at: string,
    updated_at: string,
    started_at: string,
    end_at?: string | null,
    name: string,
    exercises:  Array<( {
        __typename: "ActiveStrengthExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "ActiveCardioExercise",
        id: string,
        xid: string,
        name: string,
        type: ExerciseType,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) > | null,
    memberId: string,
    planId?: string | null,
    notes?: string | null,
  } | null,
};

export type GetCurrentMemberQueryVariables = {
};

export type GetCurrentMemberQuery = {
  getCurrentMember?:  {
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
    plans?:  {
      __typename: "PlanConnection",
      nextToken?: string | null,
    } | null,
    tenant?:  {
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
    picture?: string | null,
  } | null,
};

export type ListActiveWorkoutsHistoryQueryVariables = {
};

export type ListActiveWorkoutsHistoryQuery = {
  listActiveWorkoutsHistory?:  {
    __typename: "ActiveWorkoutConnection",
    items?:  Array< {
      __typename: "ActiveWorkout",
      id: string,
      tenantId: string,
      clubId: string,
      workoutId: string,
      created_at: string,
      updated_at: string,
      started_at: string,
      end_at?: string | null,
      name: string,
      memberId: string,
      planId?: string | null,
      notes?: string | null,
    } > | null,
    nextToken?: string | null,
  } | null,
};
