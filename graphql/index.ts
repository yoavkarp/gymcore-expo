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

export type CardioExercise = {
  __typename?: 'CardioExercise';
  angle?: Maybe<Parameter>;
  id: Scalars['ID']['output'];
  intervals: Array<Maybe<CardioExerciseInterval>>;
  machine_number?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  resistance?: Maybe<Parameter>;
  seat_height?: Maybe<Scalars['String']['output']>;
  xid: Scalars['ID']['output'];
};

export type CardioExerciseInterval = {
  __typename?: 'CardioExerciseInterval';
  angle?: Maybe<Parameter>;
  distance?: Maybe<Parameter>;
  duration?: Maybe<Parameter>;
  intensity?: Maybe<Parameter>;
  resistance?: Maybe<Parameter>;
  rest?: Maybe<Parameter>;
  tempo?: Maybe<Parameter>;
};

export type CardioExerciseIntervalInput = {
  angle?: InputMaybe<ParameterInput>;
  distance?: InputMaybe<ParameterInput>;
  duration?: InputMaybe<ParameterInput>;
  id: Scalars['ID']['input'];
  intensity?: InputMaybe<ParameterInput>;
  resistance?: InputMaybe<ParameterInput>;
  rest?: InputMaybe<ParameterInput>;
  tempo?: InputMaybe<ParameterInput>;
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

export type CreateExerciseInput = {
  angle?: InputMaybe<ParameterInput>;
  id: Scalars['ID']['input'];
  intervals?: InputMaybe<Array<InputMaybe<CardioExerciseIntervalInput>>>;
  machine_number?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  resistance?: InputMaybe<ParameterInput>;
  seat_height?: InputMaybe<Scalars['String']['input']>;
  sets?: InputMaybe<Array<InputMaybe<StrengthExerciseSetInput>>>;
  type: ExerciseType;
  xid: Scalars['ID']['input'];
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
  exercises: Array<CreateExerciseInput>;
  memberId?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
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
  createMeasurement?: Maybe<Measurement>;
  createMeasurementForMember?: Maybe<Measurement>;
  createMember?: Maybe<Member>;
  createTrainer?: Maybe<Trainer>;
  createWorkout?: Maybe<Workout>;
  register?: Maybe<Member>;
  updateMemberProfile?: Maybe<Member>;
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


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateMemberProfileArgs = {
  input: UpdateMemberProfileInput;
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

export type StrengthExercise = {
  __typename?: 'StrengthExercise';
  angle?: Maybe<Parameter>;
  id: Scalars['ID']['output'];
  machine_number?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  resistance?: Maybe<Parameter>;
  seat_height?: Maybe<Scalars['String']['output']>;
  sets: Array<Maybe<StrengthExerciseSet>>;
  xid: Scalars['ID']['output'];
};

export type StrengthExerciseSet = {
  __typename?: 'StrengthExerciseSet';
  reps?: Maybe<Parameter>;
  rest?: Maybe<Parameter>;
  times?: Maybe<Parameter>;
  weight?: Maybe<Parameter>;
};

export type StrengthExerciseSetInput = {
  id: Scalars['ID']['input'];
  reps?: InputMaybe<ParameterInput>;
  rest?: InputMaybe<ParameterInput>;
  times?: InputMaybe<ParameterInput>;
  weight?: InputMaybe<ParameterInput>;
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

export type UpdateMemberProfileInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['AWSDate']['input']>;
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender?: InputMaybe<Gender>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_picture?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type Workout = Document & {
  __typename?: 'Workout';
  clubId: Scalars['ID']['output'];
  created_at: Scalars['AWSDateTime']['output'];
  exercises: Array<Exercise>;
  id: Scalars['ID']['output'];
  memberId?: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['ID']['output'];
  trainerId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
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


export type GetMemberByIdQuery = { __typename?: 'Query', getMemberById?: { __typename?: 'Member', id: string, name?: string | null, phone_number?: string | null, email?: string | null, created_at: string, gender?: string | null, birthdate?: string | null, address?: string | null, measurement?: { __typename?: 'Measurement', height?: number | null, weight?: number | null, fat?: number | null, heart_rate?: number | null } | null } | null };

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

export type CreateWorkoutMutationVariables = Exact<{
  input: CreateWorkoutInput;
}>;


export type CreateWorkoutMutation = { __typename?: 'Mutation', createWorkout?: { __typename?: 'Workout', id: string } | null };

export type GetWorkoutByIdQueryVariables = Exact<{
  workoutId: Scalars['ID']['input'];
}>;


export type GetWorkoutByIdQuery = { __typename?: 'Query', getWorkoutById?: { __typename?: 'Workout', name: string } | null };


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
    id
    name
    phone_number
    email
    created_at
    gender
    birthdate
    address
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
export const CreateWorkoutDocument = gql`
    mutation CreateWorkout($input: CreateWorkoutInput!) {
  createWorkout(input: $input) {
    id
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
export const GetWorkoutByIdDocument = gql`
    query GetWorkoutById($workoutId: ID!) {
  getWorkoutById(workoutId: $workoutId) {
    name
  }
}
    `;

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