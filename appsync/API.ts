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
  created_at: string,
  updated_at: string,
  name: string,
  notes?: string | null,
  exercises:  Array<Exercise >,
  trainerId: string,
  memberId?: string | null,
};

export type Exercise = StrengthExercise | CardioExercise


export type StrengthExercise = {
  __typename: "StrengthExercise",
  id: string,
  xid: string,
  name: string,
  notes?: string | null,
  machine_number?: string | null,
  seat_height?: string | null,
  angle?: Parameter | null,
  resistance?: Parameter | null,
  sets?:  Array<StrengthExerciseSet | null > | null,
};

export type Parameter = {
  __typename: "Parameter",
  min?: number | null,
  max?: number | null,
  val?: number | null,
  unit?: string | null,
};

export type StrengthExerciseSet = {
  __typename: "StrengthExerciseSet",
  reps?: Parameter | null,
  rest?: Parameter | null,
  weight?: Parameter | null,
  times?: Parameter | null,
};

export type CardioExercise = {
  __typename: "CardioExercise",
  id: string,
  xid: string,
  name: string,
  notes?: string | null,
  machine_number?: string | null,
  seat_height?: string | null,
  angle?: Parameter | null,
  resistance?: Parameter | null,
  intervals?:  Array<CardioExerciseInterval | null > | null,
};

export type CardioExerciseInterval = {
  __typename: "CardioExerciseInterval",
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
  notes?: string | null,
  exercises: Array< CreateExerciseInput >,
  trainerId: string,
  memberId?: string | null,
  clubId: string,
};

export type CreateExerciseInput = {
  name: string,
  section: ExerciseSection,
  notes?: string | null,
  machine_number?: string | null,
  seat_height?: string | null,
  angle?: ParameterInput | null,
  resistance?: ParameterInput | null,
  sets?: Array< StrengthExerciseSetInput | null > | null,
  intervals?: Array< CardioExerciseIntervalInput | null > | null,
};

export enum ExerciseSection {
  WARMUP = "WARMUP",
  STRENGTH = "STRENGTH",
  CARDIO = "CARDIO",
  COOLDOWN = "COOLDOWN",
}


export type ParameterInput = {
  min?: number | null,
  max?: number | null,
  val?: number | null,
  unit?: string | null,
};

export type StrengthExerciseSetInput = {
  reps?: ParameterInput | null,
  rest?: ParameterInput | null,
  weight?: ParameterInput | null,
  times?: ParameterInput | null,
};

export type CardioExerciseIntervalInput = {
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
    created_at: string,
    updated_at: string,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) >,
    trainerId: string,
    memberId?: string | null,
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
  id: string,
};

export type GetWorkoutByIdQuery = {
  getWorkoutById?:  {
    __typename: "Workout",
    id: string,
    tenantId: string,
    created_at: string,
    updated_at: string,
    name: string,
    notes?: string | null,
    exercises:  Array<( {
        __typename: "StrengthExercise",
        id: string,
        xid: string,
        name: string,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      } | {
        __typename: "CardioExercise",
        id: string,
        xid: string,
        name: string,
        notes?: string | null,
        machine_number?: string | null,
        seat_height?: string | null,
      }
    ) >,
    trainerId: string,
    memberId?: string | null,
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
  } | null > | null,
};
