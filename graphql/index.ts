import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: string; output: string; }
  AWSDateTime: { input: string; output: string; }
  AWSEmail: { input: string; output: string; }
  AWSJSON: { input: { [x: string]: any }; output: { [x: string]: any }; }
  AWSPhone: { input: string; output: string; }
  AWSURL: { input: string; output: string; }
};

export type AddExerciseToWorkoutInput = {
  machine_number?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  seat_height?: InputMaybe<Scalars['String']['input']>;
  type: ExerciseType;
  xid: Scalars['ID']['input'];
};

export type CardioExercise = {
  __typename?: 'CardioExercise';
  angle?: Maybe<Parameter>;
  id: Scalars['ID']['output'];
  intervals?: Maybe<Array<Maybe<CardioExerciseInterval>>>;
  machine_number?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  resistance?: Maybe<Parameter>;
  seat_height?: Maybe<Scalars['String']['output']>;
  type: ExerciseType;
  xid: Scalars['ID']['output'];
};

export type CardioExerciseInterval = {
  __typename?: 'CardioExerciseInterval';
  angle?: Maybe<Parameter>;
  distance?: Maybe<Parameter>;
  duration?: Maybe<Parameter>;
  id: Scalars['ID']['output'];
  intensity?: Maybe<Parameter>;
  resistance?: Maybe<Parameter>;
  rest?: Maybe<Parameter>;
  tempo?: Maybe<Parameter>;
};

export type Club = Document & {
  __typename?: 'Club';
  address: Scalars['String']['output'];
  created_at: Scalars['AWSDateTime']['output'];
  email: Scalars['AWSEmail']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['AWSPhone']['output'];
  profile_picture: Scalars['AWSURL']['output'];
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type ClubConnection = {
  __typename?: 'ClubConnection';
  items?: Maybe<Array<Club>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type CreateMeasurementInput = {
  fat?: InputMaybe<Scalars['Float']['input']>;
  heart_rate?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  memberId?: InputMaybe<Scalars['ID']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateMemberInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['AWSDate']['input'];
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender: Gender;
  measurement?: InputMaybe<CreateMemberMeasurementInput>;
  name: Scalars['String']['input'];
  phone_number: Scalars['AWSPhone']['input'];
};

export type CreateMemberMeasurementInput = {
  fat?: InputMaybe<Scalars['Float']['input']>;
  heart_rate?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateTrainerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['AWSDate']['input'];
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender: Gender;
  name: Scalars['String']['input'];
  phone_number: Scalars['AWSPhone']['input'];
};

export type CreateWorkoutInput = {
  memberId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  planId?: InputMaybe<Scalars['ID']['input']>;
  trainerId: Scalars['ID']['input'];
};

export type Document = {
  created_at: Scalars['AWSDateTime']['output'];
  id: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type Exercise = CardioExercise | StrengthExercise;

export enum ExerciseType {
  Cardio = 'CARDIO',
  Strength = 'STRENGTH'
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type Goal = Document & {
  __typename?: 'Goal';
  clubId?: Maybe<Scalars['ID']['output']>;
  completed?: Maybe<Scalars['Boolean']['output']>;
  completed_at?: Maybe<Scalars['AWSDateTime']['output']>;
  created_at: Scalars['AWSDateTime']['output'];
  fat?: Maybe<Scalars['Float']['output']>;
  heart_rate?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  memberId: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
};

export type GoalConnection = {
  __typename?: 'GoalConnection';
  items?: Maybe<Array<Goal>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type IntervalInput = {
  angle?: InputMaybe<ParameterInput>;
  distance?: InputMaybe<ParameterInput>;
  duration?: InputMaybe<ParameterInput>;
  intensity?: InputMaybe<ParameterInput>;
  resistance?: InputMaybe<ParameterInput>;
  rest?: InputMaybe<ParameterInput>;
  tempo?: InputMaybe<ParameterInput>;
};

export type Measurement = Document & {
  __typename?: 'Measurement';
  clubId?: Maybe<Scalars['ID']['output']>;
  created_at: Scalars['AWSDateTime']['output'];
  fat?: Maybe<Scalars['Float']['output']>;
  heart_rate?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  memberId: Scalars['ID']['output'];
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
};

export type MeasurementConnection = {
  __typename?: 'MeasurementConnection';
  items?: Maybe<Array<Measurement>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type Member = Document & {
  __typename?: 'Member';
  address?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['AWSDate']['output']>;
  created_at: Scalars['AWSDateTime']['output'];
  email?: Maybe<Scalars['AWSEmail']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  goal?: Maybe<Goal>;
  id: Scalars['ID']['output'];
  measurement?: Maybe<Measurement>;
  name?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['AWSPhone']['output']>;
  profile_picture?: Maybe<Scalars['AWSURL']['output']>;
  profile_workouts?: Maybe<WorkoutConnection>;
  registered?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<Scalars['AWSJSON']['output']>;
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type MemberConnection = {
  __typename?: 'MemberConnection';
  items?: Maybe<Array<Member>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addExerciseToWorkout?: Maybe<Workout>;
  addIntervalToExercise?: Maybe<Workout>;
  addSetToExercise?: Maybe<Workout>;
  addWorkoutToLibrary?: Maybe<Workout>;
  createMeasurement?: Maybe<Measurement>;
  createMeasurementForMember?: Maybe<Measurement>;
  createMember?: Maybe<Member>;
  createTrainer?: Maybe<Trainer>;
  createWorkout?: Maybe<Workout>;
  deleteExerciseFromWorkout?: Maybe<Workout>;
  deleteIntervalFromExercise?: Maybe<Workout>;
  deleteSetFromExercise?: Maybe<Workout>;
  deleteWorkout?: Maybe<Workout>;
  register?: Maybe<Member>;
  updateExerciseInWorkout?: Maybe<Workout>;
  updateIntervalInExercise?: Maybe<Workout>;
  updateMemberProfile?: Maybe<Member>;
  updateSetInExercise?: Maybe<Workout>;
  updateWorkout?: Maybe<Workout>;
};


export type MutationAddExerciseToWorkoutArgs = {
  input: AddExerciseToWorkoutInput;
  workoutId: Scalars['ID']['input'];
};


export type MutationAddIntervalToExerciseArgs = {
  exerciseId: Scalars['ID']['input'];
  input: IntervalInput;
  workoutId: Scalars['ID']['input'];
};


export type MutationAddSetToExerciseArgs = {
  exerciseId: Scalars['ID']['input'];
  input: SetInput;
  workoutId: Scalars['ID']['input'];
};


export type MutationAddWorkoutToLibraryArgs = {
  workoutId: Scalars['ID']['input'];
};


export type MutationCreateMeasurementArgs = {
  input: CreateMeasurementInput;
};


export type MutationCreateMeasurementForMemberArgs = {
  input: CreateMeasurementInput;
  memberId: Scalars['ID']['input'];
};


export type MutationCreateMemberArgs = {
  input: CreateMemberInput;
};


export type MutationCreateTrainerArgs = {
  input: CreateTrainerInput;
};


export type MutationCreateWorkoutArgs = {
  input: CreateWorkoutInput;
};


export type MutationDeleteExerciseFromWorkoutArgs = {
  exerciseId: Scalars['ID']['input'];
  workoutId: Scalars['ID']['input'];
};


export type MutationDeleteIntervalFromExerciseArgs = {
  exerciseId: Scalars['ID']['input'];
  intervalId: Scalars['ID']['input'];
  workoutId: Scalars['ID']['input'];
};


export type MutationDeleteSetFromExerciseArgs = {
  exerciseId: Scalars['ID']['input'];
  setId: Scalars['ID']['input'];
  workoutId: Scalars['ID']['input'];
};


export type MutationDeleteWorkoutArgs = {
  workoutId: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateExerciseInWorkoutArgs = {
  exerciseId: Scalars['ID']['input'];
  input: UpdateExerciseInWorkoutInput;
  workoutId: Scalars['ID']['input'];
};


export type MutationUpdateIntervalInExerciseArgs = {
  exerciseId: Scalars['ID']['input'];
  input: IntervalInput;
  intervalId: Scalars['ID']['input'];
  workoutId: Scalars['ID']['input'];
};


export type MutationUpdateMemberProfileArgs = {
  input: UpdateMemberProfileInput;
};


export type MutationUpdateSetInExerciseArgs = {
  exerciseId: Scalars['ID']['input'];
  input: SetInput;
  setId: Scalars['ID']['input'];
  workoutId: Scalars['ID']['input'];
};


export type MutationUpdateWorkoutArgs = {
  input: UpdateWorkoutInput;
  workoutId: Scalars['ID']['input'];
};

export type Parameter = {
  __typename?: 'Parameter';
  max?: Maybe<Scalars['Float']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  val?: Maybe<Scalars['Float']['output']>;
};

export type ParameterInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  val?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getClubById?: Maybe<Club>;
  getClubTrainers?: Maybe<Array<Trainer>>;
  getMemberById?: Maybe<Member>;
  getTenant?: Maybe<Tenant>;
  getTrainerById?: Maybe<Trainer>;
  getWorkoutById?: Maybe<Workout>;
  listLibraryWorkouts?: Maybe<WorkoutConnection>;
  searchMembers?: Maybe<Array<Maybe<Member>>>;
};


export type QueryGetClubByIdArgs = {
  clubId: Scalars['ID']['input'];
};


export type QueryGetMemberByIdArgs = {
  memberId: Scalars['ID']['input'];
};


export type QueryGetTrainerByIdArgs = {
  trainerId: Scalars['ID']['input'];
};


export type QueryGetWorkoutByIdArgs = {
  workoutId: Scalars['ID']['input'];
};


export type QueryListLibraryWorkoutsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchMembersArgs = {
  text: Scalars['String']['input'];
};

export type RegisterInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate: Scalars['AWSDate']['input'];
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender: Gender;
  name: Scalars['String']['input'];
  profile_picture?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type SetInput = {
  dropsets?: InputMaybe<Array<StrengthExerciseDropSetInput>>;
  reps?: InputMaybe<ParameterInput>;
  rest?: InputMaybe<ParameterInput>;
  times?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<ParameterInput>;
};

export type StrengthExercise = {
  __typename?: 'StrengthExercise';
  angle?: Maybe<Parameter>;
  id: Scalars['ID']['output'];
  machine_number?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  resistance?: Maybe<Parameter>;
  seat_height?: Maybe<Scalars['String']['output']>;
  sets?: Maybe<Array<Maybe<StrengthExerciseSet>>>;
  type: ExerciseType;
  xid: Scalars['ID']['output'];
};

export type StrengthExerciseDropSet = {
  __typename?: 'StrengthExerciseDropSet';
  id: Scalars['ID']['output'];
  reps?: Maybe<Parameter>;
  times?: Maybe<Scalars['Int']['output']>;
  weight?: Maybe<Parameter>;
};

export type StrengthExerciseDropSetInput = {
  reps?: InputMaybe<ParameterInput>;
  times?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<ParameterInput>;
};

export type StrengthExerciseSet = {
  __typename?: 'StrengthExerciseSet';
  dropsets?: Maybe<Array<StrengthExerciseDropSet>>;
  id: Scalars['ID']['output'];
  reps?: Maybe<Parameter>;
  rest?: Maybe<Parameter>;
  times?: Maybe<Scalars['Int']['output']>;
  weight?: Maybe<Parameter>;
};

export type Tenant = {
  __typename?: 'Tenant';
  address: Scalars['String']['output'];
  created_at: Scalars['AWSDateTime']['output'];
  email: Scalars['AWSEmail']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['AWSPhone']['output'];
  profile_picture: Scalars['AWSURL']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type Trainer = Document & {
  __typename?: 'Trainer';
  address?: Maybe<Scalars['String']['output']>;
  birthdate: Scalars['AWSDate']['output'];
  created_at: Scalars['AWSDateTime']['output'];
  email?: Maybe<Scalars['AWSEmail']['output']>;
  gender: Gender;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['AWSPhone']['output'];
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type TrainerConnection = {
  __typename?: 'TrainerConnection';
  items?: Maybe<Array<Trainer>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type UpdateExerciseInWorkoutInput = {
  machine_number?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  seat_height?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ExerciseType>;
  xid?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateMemberProfileInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['AWSDate']['input']>;
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender?: InputMaybe<Gender>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_picture?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type UpdateWorkoutInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type Workout = Document & {
  __typename?: 'Workout';
  clubId: Scalars['ID']['output'];
  created_at: Scalars['AWSDateTime']['output'];
  exercises?: Maybe<Array<Exercise>>;
  id: Scalars['ID']['output'];
  memberId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['ID']['output'];
  trainerId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type WorkoutConnection = {
  __typename?: 'WorkoutConnection';
  items?: Maybe<Array<Workout>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type CreateMeasurementForMemberMutationVariables = Exact<{
  memberId: Scalars['ID']['input'];
  input: CreateMeasurementInput;
}>;


export type CreateMeasurementForMemberMutation = { __typename?: 'Mutation', createMeasurementForMember?: { __typename?: 'Measurement', height?: number | null, weight?: number | null, fat?: number | null, heart_rate?: number | null } | null };

export type CreateMemberMutationVariables = Exact<{
  input: CreateMemberInput;
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', createMember?: { __typename?: 'Member', id: string, name?: string | null, phone_number?: string | null } | null };

export type GetMemberByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMemberByIdQuery = { __typename?: 'Query', getMemberById?: { __typename?: 'Member', tenantId: string, id: string, name?: string | null, phone_number?: string | null, email?: string | null, created_at: string, gender?: string | null, birthdate?: string | null, address?: string | null, profile_workouts?: { __typename?: 'WorkoutConnection', nextToken?: string | null, items?: Array<{ __typename?: 'Workout', id: string, name: string, created_at: string, updated_at: string }> | null } | null, measurement?: { __typename?: 'Measurement', height?: number | null, weight?: number | null, fat?: number | null, heart_rate?: number | null } | null } | null };

export type SearchMembersQueryVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type SearchMembersQuery = { __typename?: 'Query', searchMembers?: Array<{ __typename?: 'Member', id: string, name?: string | null, phone_number?: string | null, email?: string | null } | null> | null };

export type CreateTrainerMutationVariables = Exact<{
  input: CreateTrainerInput;
}>;


export type CreateTrainerMutation = { __typename?: 'Mutation', createTrainer?: { __typename?: 'Trainer', id: string, name: string, email?: string | null, phone_number: string } | null };

export type GetClubTrainersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClubTrainersQuery = { __typename?: 'Query', getClubTrainers?: Array<{ __typename?: 'Trainer', id: string, name: string, email?: string | null, phone_number: string }> | null };

export type AddExerciseToWorkoutMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: AddExerciseToWorkoutInput;
}>;


export type AddExerciseToWorkoutMutation = { __typename?: 'Mutation', addExerciseToWorkout?: { __typename?: 'Workout', updated_at: string, exercises?: Array<{ __typename: 'CardioExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, intervals?: Array<{ __typename?: 'CardioExerciseInterval', id: string, duration?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, distance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, tempo?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, intensity?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, angle?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, resistance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null } | { __typename: 'StrengthExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, sets?: Array<{ __typename?: 'StrengthExerciseSet', id: string, times?: number | null, reps?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, weight?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null }> | null } | null };

export type AddIntervalToExerciseMutationVariables = Exact<{
  workoutId: Scalars['ID']['input'];
  exerciseId: Scalars['ID']['input'];
  input: IntervalInput;
}>;


export type AddIntervalToExerciseMutation = { __typename?: 'Mutation', addIntervalToExercise?: { __typename?: 'Workout', updated_at: string, exercises?: Array<{ __typename: 'CardioExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, intervals?: Array<{ __typename?: 'CardioExerciseInterval', id: string, duration?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, distance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, tempo?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, intensity?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, angle?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, resistance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null } | { __typename: 'StrengthExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, sets?: Array<{ __typename?: 'StrengthExerciseSet', id: string, times?: number | null, reps?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, weight?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null }> | null } | null };

export type AddSetToExerciseMutationVariables = Exact<{
  workoutId: Scalars['ID']['input'];
  exerciseId: Scalars['ID']['input'];
  input: SetInput;
}>;


export type AddSetToExerciseMutation = { __typename?: 'Mutation', addSetToExercise?: { __typename?: 'Workout', updated_at: string, exercises?: Array<{ __typename: 'CardioExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, intervals?: Array<{ __typename?: 'CardioExerciseInterval', id: string, duration?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, distance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, tempo?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, intensity?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, angle?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, resistance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null } | { __typename: 'StrengthExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, sets?: Array<{ __typename?: 'StrengthExerciseSet', id: string, times?: number | null, reps?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, weight?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null }> | null } | null };

export type AddWorkoutToLibraryMutationVariables = Exact<{
  workoutId: Scalars['ID']['input'];
}>;


export type AddWorkoutToLibraryMutation = { __typename?: 'Mutation', addWorkoutToLibrary?: { __typename?: 'Workout', id: string } | null };

export type CreateWorkoutMutationVariables = Exact<{
  input: CreateWorkoutInput;
}>;


export type CreateWorkoutMutation = { __typename?: 'Mutation', createWorkout?: { __typename?: 'Workout', id: string, tenantId: string, clubId: string, memberId?: string | null, created_at: string, updated_at: string, trainerId: string, name: string, notes?: string | null } | null };

export type DeleteExerciseFromWorkoutMutationVariables = Exact<{
  workoutId: Scalars['ID']['input'];
  exerciseId: Scalars['ID']['input'];
}>;


export type DeleteExerciseFromWorkoutMutation = { __typename?: 'Mutation', deleteExerciseFromWorkout?: { __typename?: 'Workout', id: string, updated_at: string, exercises?: Array<{ __typename: 'CardioExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, intervals?: Array<{ __typename?: 'CardioExerciseInterval', id: string, duration?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, distance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, tempo?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, intensity?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, angle?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, resistance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null } | { __typename: 'StrengthExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, sets?: Array<{ __typename?: 'StrengthExerciseSet', id: string, times?: number | null, reps?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, weight?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null }> | null } | null };

export type DeleteIntervalFromExerciseMutationVariables = Exact<{
  workoutId: Scalars['ID']['input'];
  exerciseId: Scalars['ID']['input'];
  intervalId: Scalars['ID']['input'];
}>;


export type DeleteIntervalFromExerciseMutation = { __typename?: 'Mutation', deleteIntervalFromExercise?: { __typename?: 'Workout', id: string, updated_at: string, exercises?: Array<{ __typename: 'CardioExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, intervals?: Array<{ __typename?: 'CardioExerciseInterval', id: string, duration?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, distance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, tempo?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, intensity?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, angle?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, resistance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null } | { __typename: 'StrengthExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, sets?: Array<{ __typename?: 'StrengthExerciseSet', id: string, times?: number | null, reps?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, weight?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null }> | null } | null };

export type DeleteSetFromExerciseMutationVariables = Exact<{
  workoutId: Scalars['ID']['input'];
  exerciseId: Scalars['ID']['input'];
  setId: Scalars['ID']['input'];
}>;


export type DeleteSetFromExerciseMutation = { __typename?: 'Mutation', deleteSetFromExercise?: { __typename?: 'Workout', id: string, updated_at: string, exercises?: Array<{ __typename: 'CardioExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, intervals?: Array<{ __typename?: 'CardioExerciseInterval', id: string, duration?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, distance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, tempo?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, intensity?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, angle?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, resistance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null } | { __typename: 'StrengthExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, sets?: Array<{ __typename?: 'StrengthExerciseSet', id: string, times?: number | null, reps?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, weight?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null }> | null } | null };

export type DeleteWorkoutMutationVariables = Exact<{
  workoutId: Scalars['ID']['input'];
}>;


export type DeleteWorkoutMutation = { __typename?: 'Mutation', deleteWorkout?: { __typename?: 'Workout', id: string } | null };

export type StrengthExerciseFragmentFragment = { __typename?: 'StrengthExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, sets?: Array<{ __typename?: 'StrengthExerciseSet', id: string, times?: number | null, reps?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, weight?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null };

export type CardioExerciseFragmentFragment = { __typename?: 'CardioExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, intervals?: Array<{ __typename?: 'CardioExerciseInterval', id: string, duration?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, distance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, tempo?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, intensity?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, angle?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, resistance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null };

export type GetWorkoutByIdQueryVariables = Exact<{
  workoutId: Scalars['ID']['input'];
}>;


export type GetWorkoutByIdQuery = { __typename?: 'Query', getWorkoutById?: { __typename?: 'Workout', id: string, tenantId: string, clubId: string, created_at: string, updated_at: string, trainerId: string, memberId?: string | null, name: string, notes?: string | null, exercises?: Array<{ __typename: 'CardioExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, intervals?: Array<{ __typename?: 'CardioExerciseInterval', id: string, duration?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, distance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, tempo?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, intensity?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, angle?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, resistance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null } | { __typename: 'StrengthExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, sets?: Array<{ __typename?: 'StrengthExerciseSet', id: string, times?: number | null, reps?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, weight?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null }> | null } | null };

export type ParameterFragmentFragment = { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null };

export type UpdateExerciseInWorkoutMutationVariables = Exact<{
  workoutId: Scalars['ID']['input'];
  exerciseId: Scalars['ID']['input'];
  input: UpdateExerciseInWorkoutInput;
}>;


export type UpdateExerciseInWorkoutMutation = { __typename?: 'Mutation', updateExerciseInWorkout?: { __typename?: 'Workout', updated_at: string, exercises?: Array<{ __typename: 'CardioExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, intervals?: Array<{ __typename?: 'CardioExerciseInterval', id: string, duration?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, distance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, tempo?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, intensity?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, angle?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, resistance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null } | { __typename: 'StrengthExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, sets?: Array<{ __typename?: 'StrengthExerciseSet', id: string, times?: number | null, reps?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, weight?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null }> | null } | null };

export type UpdateIntervalInExerciseMutationVariables = Exact<{
  workoutId: Scalars['ID']['input'];
  exerciseId: Scalars['ID']['input'];
  intervalId: Scalars['ID']['input'];
  input: IntervalInput;
}>;


export type UpdateIntervalInExerciseMutation = { __typename?: 'Mutation', updateIntervalInExercise?: { __typename?: 'Workout', updated_at: string, exercises?: Array<{ __typename: 'CardioExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, intervals?: Array<{ __typename?: 'CardioExerciseInterval', id: string, duration?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, distance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, tempo?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, intensity?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, angle?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, resistance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null } | { __typename: 'StrengthExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, sets?: Array<{ __typename?: 'StrengthExerciseSet', id: string, times?: number | null, reps?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, weight?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null }> | null } | null };

export type UpdateSetInExerciseMutationVariables = Exact<{
  workoutId: Scalars['ID']['input'];
  exerciseId: Scalars['ID']['input'];
  setId: Scalars['ID']['input'];
  input: SetInput;
}>;


export type UpdateSetInExerciseMutation = { __typename?: 'Mutation', updateSetInExercise?: { __typename?: 'Workout', updated_at: string, exercises?: Array<{ __typename: 'CardioExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, intervals?: Array<{ __typename?: 'CardioExerciseInterval', id: string, duration?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, distance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, tempo?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, intensity?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, angle?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, resistance?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null } | { __typename: 'StrengthExercise', type: ExerciseType, id: string, xid: string, name: string, notes?: string | null, machine_number?: string | null, seat_height?: string | null, sets?: Array<{ __typename?: 'StrengthExerciseSet', id: string, times?: number | null, reps?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, weight?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null, rest?: { __typename?: 'Parameter', max?: number | null, val?: number | null, unit?: string | null } | null } | null> | null }> | null } | null };

export type UpdateWorkoutMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateWorkoutInput;
}>;


export type UpdateWorkoutMutation = { __typename?: 'Mutation', updateWorkout?: { __typename?: 'Workout', updated_at: string, name: string, notes?: string | null } | null };

export const ParameterFragmentFragmentDoc = gql`
    fragment ParameterFragment on Parameter {
  max
  val
  unit
}
    `;
export const StrengthExerciseFragmentFragmentDoc = gql`
    fragment StrengthExerciseFragment on StrengthExercise {
  type
  id
  xid
  name
  notes
  machine_number
  seat_height
  sets {
    id
    reps {
      ...ParameterFragment
    }
    weight {
      ...ParameterFragment
    }
    rest {
      ...ParameterFragment
    }
    times
  }
}
    ${ParameterFragmentFragmentDoc}`;
export const CardioExerciseFragmentFragmentDoc = gql`
    fragment CardioExerciseFragment on CardioExercise {
  type
  id
  xid
  name
  notes
  machine_number
  seat_height
  intervals {
    id
    duration {
      ...ParameterFragment
    }
    distance {
      ...ParameterFragment
    }
    tempo {
      ...ParameterFragment
    }
    intensity {
      ...ParameterFragment
    }
    angle {
      ...ParameterFragment
    }
    resistance {
      ...ParameterFragment
    }
    rest {
      ...ParameterFragment
    }
  }
}
    ${ParameterFragmentFragmentDoc}`;
export const CreateMeasurementForMemberDocument = gql`
    mutation CreateMeasurementForMember($memberId: ID!, $input: CreateMeasurementInput!) {
  createMeasurementForMember(memberId: $memberId, input: $input) {
    height
    weight
    fat
    heart_rate
  }
}
    `;
export type CreateMeasurementForMemberMutationFn = Apollo.MutationFunction<CreateMeasurementForMemberMutation, CreateMeasurementForMemberMutationVariables>;

/**
 * __useCreateMeasurementForMemberMutation__
 *
 * To run a mutation, you first call `useCreateMeasurementForMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMeasurementForMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMeasurementForMemberMutation, { data, loading, error }] = useCreateMeasurementForMemberMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMeasurementForMemberMutation(baseOptions?: Apollo.MutationHookOptions<CreateMeasurementForMemberMutation, CreateMeasurementForMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMeasurementForMemberMutation, CreateMeasurementForMemberMutationVariables>(CreateMeasurementForMemberDocument, options);
      }
export type CreateMeasurementForMemberMutationHookResult = ReturnType<typeof useCreateMeasurementForMemberMutation>;
export type CreateMeasurementForMemberMutationResult = Apollo.MutationResult<CreateMeasurementForMemberMutation>;
export type CreateMeasurementForMemberMutationOptions = Apollo.BaseMutationOptions<CreateMeasurementForMemberMutation, CreateMeasurementForMemberMutationVariables>;
export const CreateMemberDocument = gql`
    mutation CreateMember($input: CreateMemberInput!) {
  createMember(input: $input) {
    id
    name
    phone_number
  }
}
    `;
export type CreateMemberMutationFn = Apollo.MutationFunction<CreateMemberMutation, CreateMemberMutationVariables>;

/**
 * __useCreateMemberMutation__
 *
 * To run a mutation, you first call `useCreateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemberMutation, { data, loading, error }] = useCreateMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMemberMutation(baseOptions?: Apollo.MutationHookOptions<CreateMemberMutation, CreateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMemberMutation, CreateMemberMutationVariables>(CreateMemberDocument, options);
      }
export type CreateMemberMutationHookResult = ReturnType<typeof useCreateMemberMutation>;
export type CreateMemberMutationResult = Apollo.MutationResult<CreateMemberMutation>;
export type CreateMemberMutationOptions = Apollo.BaseMutationOptions<CreateMemberMutation, CreateMemberMutationVariables>;
export const GetMemberByIdDocument = gql`
    query GetMemberById($id: ID!) {
  getMemberById(memberId: $id) {
    tenantId
    id
    name
    phone_number
    email
    created_at
    gender
    birthdate
    address
    profile_workouts {
      items {
        id
        name
        created_at
        updated_at
      }
      nextToken
    }
    measurement {
      height
      weight
      fat
      heart_rate
    }
  }
}
    `;

/**
 * __useGetMemberByIdQuery__
 *
 * To run a query within a React component, call `useGetMemberByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMemberByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMemberByIdQuery, GetMemberByIdQueryVariables> & ({ variables: GetMemberByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMemberByIdQuery, GetMemberByIdQueryVariables>(GetMemberByIdDocument, options);
      }
export function useGetMemberByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemberByIdQuery, GetMemberByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMemberByIdQuery, GetMemberByIdQueryVariables>(GetMemberByIdDocument, options);
        }
export function useGetMemberByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMemberByIdQuery, GetMemberByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMemberByIdQuery, GetMemberByIdQueryVariables>(GetMemberByIdDocument, options);
        }
export type GetMemberByIdQueryHookResult = ReturnType<typeof useGetMemberByIdQuery>;
export type GetMemberByIdLazyQueryHookResult = ReturnType<typeof useGetMemberByIdLazyQuery>;
export type GetMemberByIdSuspenseQueryHookResult = ReturnType<typeof useGetMemberByIdSuspenseQuery>;
export type GetMemberByIdQueryResult = Apollo.QueryResult<GetMemberByIdQuery, GetMemberByIdQueryVariables>;
export const SearchMembersDocument = gql`
    query SearchMembers($text: String!) {
  searchMembers(text: $text) {
    id
    name
    phone_number
    email
  }
}
    `;

/**
 * __useSearchMembersQuery__
 *
 * To run a query within a React component, call `useSearchMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMembersQuery({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSearchMembersQuery(baseOptions: Apollo.QueryHookOptions<SearchMembersQuery, SearchMembersQueryVariables> & ({ variables: SearchMembersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchMembersQuery, SearchMembersQueryVariables>(SearchMembersDocument, options);
      }
export function useSearchMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchMembersQuery, SearchMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchMembersQuery, SearchMembersQueryVariables>(SearchMembersDocument, options);
        }
export function useSearchMembersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchMembersQuery, SearchMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchMembersQuery, SearchMembersQueryVariables>(SearchMembersDocument, options);
        }
export type SearchMembersQueryHookResult = ReturnType<typeof useSearchMembersQuery>;
export type SearchMembersLazyQueryHookResult = ReturnType<typeof useSearchMembersLazyQuery>;
export type SearchMembersSuspenseQueryHookResult = ReturnType<typeof useSearchMembersSuspenseQuery>;
export type SearchMembersQueryResult = Apollo.QueryResult<SearchMembersQuery, SearchMembersQueryVariables>;
export const CreateTrainerDocument = gql`
    mutation CreateTrainer($input: CreateTrainerInput!) {
  createTrainer(input: $input) {
    id
    name
    email
    phone_number
  }
}
    `;
export type CreateTrainerMutationFn = Apollo.MutationFunction<CreateTrainerMutation, CreateTrainerMutationVariables>;

/**
 * __useCreateTrainerMutation__
 *
 * To run a mutation, you first call `useCreateTrainerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrainerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrainerMutation, { data, loading, error }] = useCreateTrainerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTrainerMutation(baseOptions?: Apollo.MutationHookOptions<CreateTrainerMutation, CreateTrainerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTrainerMutation, CreateTrainerMutationVariables>(CreateTrainerDocument, options);
      }
export type CreateTrainerMutationHookResult = ReturnType<typeof useCreateTrainerMutation>;
export type CreateTrainerMutationResult = Apollo.MutationResult<CreateTrainerMutation>;
export type CreateTrainerMutationOptions = Apollo.BaseMutationOptions<CreateTrainerMutation, CreateTrainerMutationVariables>;
export const GetClubTrainersDocument = gql`
    query GetClubTrainers {
  getClubTrainers {
    id
    name
    email
    phone_number
  }
}
    `;

/**
 * __useGetClubTrainersQuery__
 *
 * To run a query within a React component, call `useGetClubTrainersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClubTrainersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClubTrainersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClubTrainersQuery(baseOptions?: Apollo.QueryHookOptions<GetClubTrainersQuery, GetClubTrainersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClubTrainersQuery, GetClubTrainersQueryVariables>(GetClubTrainersDocument, options);
      }
export function useGetClubTrainersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClubTrainersQuery, GetClubTrainersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClubTrainersQuery, GetClubTrainersQueryVariables>(GetClubTrainersDocument, options);
        }
export function useGetClubTrainersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetClubTrainersQuery, GetClubTrainersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClubTrainersQuery, GetClubTrainersQueryVariables>(GetClubTrainersDocument, options);
        }
export type GetClubTrainersQueryHookResult = ReturnType<typeof useGetClubTrainersQuery>;
export type GetClubTrainersLazyQueryHookResult = ReturnType<typeof useGetClubTrainersLazyQuery>;
export type GetClubTrainersSuspenseQueryHookResult = ReturnType<typeof useGetClubTrainersSuspenseQuery>;
export type GetClubTrainersQueryResult = Apollo.QueryResult<GetClubTrainersQuery, GetClubTrainersQueryVariables>;
export const AddExerciseToWorkoutDocument = gql`
    mutation AddExerciseToWorkout($id: ID!, $input: AddExerciseToWorkoutInput!) {
  addExerciseToWorkout(workoutId: $id, input: $input) {
    exercises {
      __typename
      ... on StrengthExercise {
        ...StrengthExerciseFragment
      }
      ... on CardioExercise {
        ...CardioExerciseFragment
      }
    }
    updated_at
  }
}
    ${StrengthExerciseFragmentFragmentDoc}
${CardioExerciseFragmentFragmentDoc}`;
export type AddExerciseToWorkoutMutationFn = Apollo.MutationFunction<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>;

/**
 * __useAddExerciseToWorkoutMutation__
 *
 * To run a mutation, you first call `useAddExerciseToWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciseToWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciseToWorkoutMutation, { data, loading, error }] = useAddExerciseToWorkoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddExerciseToWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>(AddExerciseToWorkoutDocument, options);
      }
export type AddExerciseToWorkoutMutationHookResult = ReturnType<typeof useAddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationResult = Apollo.MutationResult<AddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationOptions = Apollo.BaseMutationOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>;
export const AddIntervalToExerciseDocument = gql`
    mutation AddIntervalToExercise($workoutId: ID!, $exerciseId: ID!, $input: IntervalInput!) {
  addIntervalToExercise(
    workoutId: $workoutId
    exerciseId: $exerciseId
    input: $input
  ) {
    exercises {
      __typename
      ... on StrengthExercise {
        ...StrengthExerciseFragment
      }
      ... on CardioExercise {
        ...CardioExerciseFragment
      }
    }
    updated_at
  }
}
    ${StrengthExerciseFragmentFragmentDoc}
${CardioExerciseFragmentFragmentDoc}`;
export type AddIntervalToExerciseMutationFn = Apollo.MutationFunction<AddIntervalToExerciseMutation, AddIntervalToExerciseMutationVariables>;

/**
 * __useAddIntervalToExerciseMutation__
 *
 * To run a mutation, you first call `useAddIntervalToExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddIntervalToExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addIntervalToExerciseMutation, { data, loading, error }] = useAddIntervalToExerciseMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      exerciseId: // value for 'exerciseId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddIntervalToExerciseMutation(baseOptions?: Apollo.MutationHookOptions<AddIntervalToExerciseMutation, AddIntervalToExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddIntervalToExerciseMutation, AddIntervalToExerciseMutationVariables>(AddIntervalToExerciseDocument, options);
      }
export type AddIntervalToExerciseMutationHookResult = ReturnType<typeof useAddIntervalToExerciseMutation>;
export type AddIntervalToExerciseMutationResult = Apollo.MutationResult<AddIntervalToExerciseMutation>;
export type AddIntervalToExerciseMutationOptions = Apollo.BaseMutationOptions<AddIntervalToExerciseMutation, AddIntervalToExerciseMutationVariables>;
export const AddSetToExerciseDocument = gql`
    mutation AddSetToExercise($workoutId: ID!, $exerciseId: ID!, $input: SetInput!) {
  addSetToExercise(workoutId: $workoutId, exerciseId: $exerciseId, input: $input) {
    exercises {
      __typename
      ... on StrengthExercise {
        ...StrengthExerciseFragment
      }
      ... on CardioExercise {
        ...CardioExerciseFragment
      }
    }
    updated_at
  }
}
    ${StrengthExerciseFragmentFragmentDoc}
${CardioExerciseFragmentFragmentDoc}`;
export type AddSetToExerciseMutationFn = Apollo.MutationFunction<AddSetToExerciseMutation, AddSetToExerciseMutationVariables>;

/**
 * __useAddSetToExerciseMutation__
 *
 * To run a mutation, you first call `useAddSetToExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSetToExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSetToExerciseMutation, { data, loading, error }] = useAddSetToExerciseMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      exerciseId: // value for 'exerciseId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSetToExerciseMutation(baseOptions?: Apollo.MutationHookOptions<AddSetToExerciseMutation, AddSetToExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSetToExerciseMutation, AddSetToExerciseMutationVariables>(AddSetToExerciseDocument, options);
      }
export type AddSetToExerciseMutationHookResult = ReturnType<typeof useAddSetToExerciseMutation>;
export type AddSetToExerciseMutationResult = Apollo.MutationResult<AddSetToExerciseMutation>;
export type AddSetToExerciseMutationOptions = Apollo.BaseMutationOptions<AddSetToExerciseMutation, AddSetToExerciseMutationVariables>;
export const AddWorkoutToLibraryDocument = gql`
    mutation AddWorkoutToLibrary($workoutId: ID!) {
  addWorkoutToLibrary(workoutId: $workoutId) {
    id
  }
}
    `;
export type AddWorkoutToLibraryMutationFn = Apollo.MutationFunction<AddWorkoutToLibraryMutation, AddWorkoutToLibraryMutationVariables>;

/**
 * __useAddWorkoutToLibraryMutation__
 *
 * To run a mutation, you first call `useAddWorkoutToLibraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWorkoutToLibraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWorkoutToLibraryMutation, { data, loading, error }] = useAddWorkoutToLibraryMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *   },
 * });
 */
export function useAddWorkoutToLibraryMutation(baseOptions?: Apollo.MutationHookOptions<AddWorkoutToLibraryMutation, AddWorkoutToLibraryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddWorkoutToLibraryMutation, AddWorkoutToLibraryMutationVariables>(AddWorkoutToLibraryDocument, options);
      }
export type AddWorkoutToLibraryMutationHookResult = ReturnType<typeof useAddWorkoutToLibraryMutation>;
export type AddWorkoutToLibraryMutationResult = Apollo.MutationResult<AddWorkoutToLibraryMutation>;
export type AddWorkoutToLibraryMutationOptions = Apollo.BaseMutationOptions<AddWorkoutToLibraryMutation, AddWorkoutToLibraryMutationVariables>;
export const CreateWorkoutDocument = gql`
    mutation CreateWorkout($input: CreateWorkoutInput!) {
  createWorkout(input: $input) {
    id
    tenantId
    clubId
    memberId
    created_at
    updated_at
    trainerId
    memberId
    name
    notes
  }
}
    `;
export type CreateWorkoutMutationFn = Apollo.MutationFunction<CreateWorkoutMutation, CreateWorkoutMutationVariables>;

/**
 * __useCreateWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutMutation, { data, loading, error }] = useCreateWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkoutMutation, CreateWorkoutMutationVariables>(CreateWorkoutDocument, options);
      }
export type CreateWorkoutMutationHookResult = ReturnType<typeof useCreateWorkoutMutation>;
export type CreateWorkoutMutationResult = Apollo.MutationResult<CreateWorkoutMutation>;
export type CreateWorkoutMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>;
export const DeleteExerciseFromWorkoutDocument = gql`
    mutation DeleteExerciseFromWorkout($workoutId: ID!, $exerciseId: ID!) {
  deleteExerciseFromWorkout(workoutId: $workoutId, exerciseId: $exerciseId) {
    id
    updated_at
    exercises {
      __typename
      ... on StrengthExercise {
        ...StrengthExerciseFragment
      }
      ... on CardioExercise {
        ...CardioExerciseFragment
      }
    }
  }
}
    ${StrengthExerciseFragmentFragmentDoc}
${CardioExerciseFragmentFragmentDoc}`;
export type DeleteExerciseFromWorkoutMutationFn = Apollo.MutationFunction<DeleteExerciseFromWorkoutMutation, DeleteExerciseFromWorkoutMutationVariables>;

/**
 * __useDeleteExerciseFromWorkoutMutation__
 *
 * To run a mutation, you first call `useDeleteExerciseFromWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciseFromWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciseFromWorkoutMutation, { data, loading, error }] = useDeleteExerciseFromWorkoutMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      exerciseId: // value for 'exerciseId'
 *   },
 * });
 */
export function useDeleteExerciseFromWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciseFromWorkoutMutation, DeleteExerciseFromWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciseFromWorkoutMutation, DeleteExerciseFromWorkoutMutationVariables>(DeleteExerciseFromWorkoutDocument, options);
      }
export type DeleteExerciseFromWorkoutMutationHookResult = ReturnType<typeof useDeleteExerciseFromWorkoutMutation>;
export type DeleteExerciseFromWorkoutMutationResult = Apollo.MutationResult<DeleteExerciseFromWorkoutMutation>;
export type DeleteExerciseFromWorkoutMutationOptions = Apollo.BaseMutationOptions<DeleteExerciseFromWorkoutMutation, DeleteExerciseFromWorkoutMutationVariables>;
export const DeleteIntervalFromExerciseDocument = gql`
    mutation DeleteIntervalFromExercise($workoutId: ID!, $exerciseId: ID!, $intervalId: ID!) {
  deleteIntervalFromExercise(
    workoutId: $workoutId
    exerciseId: $exerciseId
    intervalId: $intervalId
  ) {
    id
    updated_at
    exercises {
      __typename
      ... on StrengthExercise {
        ...StrengthExerciseFragment
      }
      ... on CardioExercise {
        ...CardioExerciseFragment
      }
    }
  }
}
    ${StrengthExerciseFragmentFragmentDoc}
${CardioExerciseFragmentFragmentDoc}`;
export type DeleteIntervalFromExerciseMutationFn = Apollo.MutationFunction<DeleteIntervalFromExerciseMutation, DeleteIntervalFromExerciseMutationVariables>;

/**
 * __useDeleteIntervalFromExerciseMutation__
 *
 * To run a mutation, you first call `useDeleteIntervalFromExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIntervalFromExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIntervalFromExerciseMutation, { data, loading, error }] = useDeleteIntervalFromExerciseMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      exerciseId: // value for 'exerciseId'
 *      intervalId: // value for 'intervalId'
 *   },
 * });
 */
export function useDeleteIntervalFromExerciseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIntervalFromExerciseMutation, DeleteIntervalFromExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteIntervalFromExerciseMutation, DeleteIntervalFromExerciseMutationVariables>(DeleteIntervalFromExerciseDocument, options);
      }
export type DeleteIntervalFromExerciseMutationHookResult = ReturnType<typeof useDeleteIntervalFromExerciseMutation>;
export type DeleteIntervalFromExerciseMutationResult = Apollo.MutationResult<DeleteIntervalFromExerciseMutation>;
export type DeleteIntervalFromExerciseMutationOptions = Apollo.BaseMutationOptions<DeleteIntervalFromExerciseMutation, DeleteIntervalFromExerciseMutationVariables>;
export const DeleteSetFromExerciseDocument = gql`
    mutation DeleteSetFromExercise($workoutId: ID!, $exerciseId: ID!, $setId: ID!) {
  deleteSetFromExercise(
    workoutId: $workoutId
    exerciseId: $exerciseId
    setId: $setId
  ) {
    id
    updated_at
    exercises {
      __typename
      ... on StrengthExercise {
        ...StrengthExerciseFragment
      }
      ... on CardioExercise {
        ...CardioExerciseFragment
      }
    }
  }
}
    ${StrengthExerciseFragmentFragmentDoc}
${CardioExerciseFragmentFragmentDoc}`;
export type DeleteSetFromExerciseMutationFn = Apollo.MutationFunction<DeleteSetFromExerciseMutation, DeleteSetFromExerciseMutationVariables>;

/**
 * __useDeleteSetFromExerciseMutation__
 *
 * To run a mutation, you first call `useDeleteSetFromExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSetFromExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSetFromExerciseMutation, { data, loading, error }] = useDeleteSetFromExerciseMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      exerciseId: // value for 'exerciseId'
 *      setId: // value for 'setId'
 *   },
 * });
 */
export function useDeleteSetFromExerciseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSetFromExerciseMutation, DeleteSetFromExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSetFromExerciseMutation, DeleteSetFromExerciseMutationVariables>(DeleteSetFromExerciseDocument, options);
      }
export type DeleteSetFromExerciseMutationHookResult = ReturnType<typeof useDeleteSetFromExerciseMutation>;
export type DeleteSetFromExerciseMutationResult = Apollo.MutationResult<DeleteSetFromExerciseMutation>;
export type DeleteSetFromExerciseMutationOptions = Apollo.BaseMutationOptions<DeleteSetFromExerciseMutation, DeleteSetFromExerciseMutationVariables>;
export const DeleteWorkoutDocument = gql`
    mutation DeleteWorkout($workoutId: ID!) {
  deleteWorkout(workoutId: $workoutId) {
    id
  }
}
    `;
export type DeleteWorkoutMutationFn = Apollo.MutationFunction<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>;

/**
 * __useDeleteWorkoutMutation__
 *
 * To run a mutation, you first call `useDeleteWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkoutMutation, { data, loading, error }] = useDeleteWorkoutMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *   },
 * });
 */
export function useDeleteWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>(DeleteWorkoutDocument, options);
      }
export type DeleteWorkoutMutationHookResult = ReturnType<typeof useDeleteWorkoutMutation>;
export type DeleteWorkoutMutationResult = Apollo.MutationResult<DeleteWorkoutMutation>;
export type DeleteWorkoutMutationOptions = Apollo.BaseMutationOptions<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>;
export const GetWorkoutByIdDocument = gql`
    query GetWorkoutById($workoutId: ID!) {
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
      __typename
      ... on StrengthExercise {
        ...StrengthExerciseFragment
      }
      ... on CardioExercise {
        ...CardioExerciseFragment
      }
    }
  }
}
    ${StrengthExerciseFragmentFragmentDoc}
${CardioExerciseFragmentFragmentDoc}`;

/**
 * __useGetWorkoutByIdQuery__
 *
 * To run a query within a React component, call `useGetWorkoutByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkoutByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkoutByIdQuery({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *   },
 * });
 */
export function useGetWorkoutByIdQuery(baseOptions: Apollo.QueryHookOptions<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables> & ({ variables: GetWorkoutByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>(GetWorkoutByIdDocument, options);
      }
export function useGetWorkoutByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>(GetWorkoutByIdDocument, options);
        }
export function useGetWorkoutByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>(GetWorkoutByIdDocument, options);
        }
export type GetWorkoutByIdQueryHookResult = ReturnType<typeof useGetWorkoutByIdQuery>;
export type GetWorkoutByIdLazyQueryHookResult = ReturnType<typeof useGetWorkoutByIdLazyQuery>;
export type GetWorkoutByIdSuspenseQueryHookResult = ReturnType<typeof useGetWorkoutByIdSuspenseQuery>;
export type GetWorkoutByIdQueryResult = Apollo.QueryResult<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>;
export const UpdateExerciseInWorkoutDocument = gql`
    mutation UpdateExerciseInWorkout($workoutId: ID!, $exerciseId: ID!, $input: UpdateExerciseInWorkoutInput!) {
  updateExerciseInWorkout(
    workoutId: $workoutId
    exerciseId: $exerciseId
    input: $input
  ) {
    exercises {
      __typename
      ... on StrengthExercise {
        ...StrengthExerciseFragment
      }
      ... on CardioExercise {
        ...CardioExerciseFragment
      }
    }
    updated_at
  }
}
    ${StrengthExerciseFragmentFragmentDoc}
${CardioExerciseFragmentFragmentDoc}`;
export type UpdateExerciseInWorkoutMutationFn = Apollo.MutationFunction<UpdateExerciseInWorkoutMutation, UpdateExerciseInWorkoutMutationVariables>;

/**
 * __useUpdateExerciseInWorkoutMutation__
 *
 * To run a mutation, you first call `useUpdateExerciseInWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciseInWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciseInWorkoutMutation, { data, loading, error }] = useUpdateExerciseInWorkoutMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      exerciseId: // value for 'exerciseId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExerciseInWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciseInWorkoutMutation, UpdateExerciseInWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExerciseInWorkoutMutation, UpdateExerciseInWorkoutMutationVariables>(UpdateExerciseInWorkoutDocument, options);
      }
export type UpdateExerciseInWorkoutMutationHookResult = ReturnType<typeof useUpdateExerciseInWorkoutMutation>;
export type UpdateExerciseInWorkoutMutationResult = Apollo.MutationResult<UpdateExerciseInWorkoutMutation>;
export type UpdateExerciseInWorkoutMutationOptions = Apollo.BaseMutationOptions<UpdateExerciseInWorkoutMutation, UpdateExerciseInWorkoutMutationVariables>;
export const UpdateIntervalInExerciseDocument = gql`
    mutation UpdateIntervalInExercise($workoutId: ID!, $exerciseId: ID!, $intervalId: ID!, $input: IntervalInput!) {
  updateIntervalInExercise(
    workoutId: $workoutId
    exerciseId: $exerciseId
    intervalId: $intervalId
    input: $input
  ) {
    exercises {
      __typename
      ... on StrengthExercise {
        ...StrengthExerciseFragment
      }
      ... on CardioExercise {
        ...CardioExerciseFragment
      }
    }
    updated_at
  }
}
    ${StrengthExerciseFragmentFragmentDoc}
${CardioExerciseFragmentFragmentDoc}`;
export type UpdateIntervalInExerciseMutationFn = Apollo.MutationFunction<UpdateIntervalInExerciseMutation, UpdateIntervalInExerciseMutationVariables>;

/**
 * __useUpdateIntervalInExerciseMutation__
 *
 * To run a mutation, you first call `useUpdateIntervalInExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIntervalInExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIntervalInExerciseMutation, { data, loading, error }] = useUpdateIntervalInExerciseMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      exerciseId: // value for 'exerciseId'
 *      intervalId: // value for 'intervalId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIntervalInExerciseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIntervalInExerciseMutation, UpdateIntervalInExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIntervalInExerciseMutation, UpdateIntervalInExerciseMutationVariables>(UpdateIntervalInExerciseDocument, options);
      }
export type UpdateIntervalInExerciseMutationHookResult = ReturnType<typeof useUpdateIntervalInExerciseMutation>;
export type UpdateIntervalInExerciseMutationResult = Apollo.MutationResult<UpdateIntervalInExerciseMutation>;
export type UpdateIntervalInExerciseMutationOptions = Apollo.BaseMutationOptions<UpdateIntervalInExerciseMutation, UpdateIntervalInExerciseMutationVariables>;
export const UpdateSetInExerciseDocument = gql`
    mutation UpdateSetInExercise($workoutId: ID!, $exerciseId: ID!, $setId: ID!, $input: SetInput!) {
  updateSetInExercise(
    workoutId: $workoutId
    exerciseId: $exerciseId
    setId: $setId
    input: $input
  ) {
    exercises {
      __typename
      ... on StrengthExercise {
        ...StrengthExerciseFragment
      }
      ... on CardioExercise {
        ...CardioExerciseFragment
      }
    }
    updated_at
  }
}
    ${StrengthExerciseFragmentFragmentDoc}
${CardioExerciseFragmentFragmentDoc}`;
export type UpdateSetInExerciseMutationFn = Apollo.MutationFunction<UpdateSetInExerciseMutation, UpdateSetInExerciseMutationVariables>;

/**
 * __useUpdateSetInExerciseMutation__
 *
 * To run a mutation, you first call `useUpdateSetInExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSetInExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSetInExerciseMutation, { data, loading, error }] = useUpdateSetInExerciseMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *      exerciseId: // value for 'exerciseId'
 *      setId: // value for 'setId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSetInExerciseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSetInExerciseMutation, UpdateSetInExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSetInExerciseMutation, UpdateSetInExerciseMutationVariables>(UpdateSetInExerciseDocument, options);
      }
export type UpdateSetInExerciseMutationHookResult = ReturnType<typeof useUpdateSetInExerciseMutation>;
export type UpdateSetInExerciseMutationResult = Apollo.MutationResult<UpdateSetInExerciseMutation>;
export type UpdateSetInExerciseMutationOptions = Apollo.BaseMutationOptions<UpdateSetInExerciseMutation, UpdateSetInExerciseMutationVariables>;
export const UpdateWorkoutDocument = gql`
    mutation UpdateWorkout($id: ID!, $input: UpdateWorkoutInput!) {
  updateWorkout(workoutId: $id, input: $input) {
    updated_at
    name
    notes
  }
}
    `;
export type UpdateWorkoutMutationFn = Apollo.MutationFunction<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>;

/**
 * __useUpdateWorkoutMutation__
 *
 * To run a mutation, you first call `useUpdateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkoutMutation, { data, loading, error }] = useUpdateWorkoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>(UpdateWorkoutDocument, options);
      }
export type UpdateWorkoutMutationHookResult = ReturnType<typeof useUpdateWorkoutMutation>;
export type UpdateWorkoutMutationResult = Apollo.MutationResult<UpdateWorkoutMutation>;
export type UpdateWorkoutMutationOptions = Apollo.BaseMutationOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>;