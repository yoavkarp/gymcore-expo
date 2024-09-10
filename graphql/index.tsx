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
  AWSDate: { input: any; output: any; }
  AWSDateTime: { input: any; output: any; }
  AWSEmail: { input: any; output: any; }
  AWSPhone: { input: any; output: any; }
  AWSTimestamp: { input: any; output: any; }
  AWSURL: { input: any; output: any; }
};

/**   club.gql */
export type Club = {
  __typename?: 'Club';
  address: Scalars['String']['output'];
  created_at: Scalars['AWSTimestamp']['output'];
  email: Scalars['AWSEmail']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['AWSPhone']['output'];
  profile_picture: Scalars['AWSURL']['output'];
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSTimestamp']['output'];
};

export type CreateMeasurementInput = {
  fat?: InputMaybe<Scalars['Float']['input']>;
  heart_rate?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  memberId: Scalars['ID']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateMemberInput = {
  phone_number: Scalars['AWSPhone']['input'];
};

/**   measurement.gql */
export type Measurement = {
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

/**   Member.gql */
export type Member = {
  __typename?: 'Member';
  address?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['AWSDate']['output']>;
  clubsIds?: Maybe<Array<Scalars['ID']['output']>>;
  created_at: Scalars['AWSDateTime']['output'];
  email?: Maybe<Scalars['AWSEmail']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  measurement?: Maybe<Measurement>;
  name?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['AWSPhone']['output']>;
  profile_picture?: Maybe<Scalars['AWSURL']['output']>;
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type MemberConnection = {
  __typename?: 'MemberConnection';
  items?: Maybe<Array<Member>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

/**   Mutation.gql */
export type Mutation = {
  __typename?: 'Mutation';
  createMeasurement?: Maybe<Measurement>;
  /**   Member */
  createMember?: Maybe<Member>;
  deleteMember?: Maybe<Member>;
  updateAuthenticatedMember?: Maybe<Member>;
};


/**   Mutation.gql */
export type MutationCreateMeasurementArgs = {
  input: CreateMeasurementInput;
};


/**   Mutation.gql */
export type MutationCreateMemberArgs = {
  input: CreateMemberInput;
};


/**   Mutation.gql */
export type MutationDeleteMemberArgs = {
  memberId: Scalars['ID']['input'];
};


/**   Mutation.gql */
export type MutationUpdateAuthenticatedMemberArgs = {
  input: UpdateMemberInput;
};

/**   Query.gql */
export type Query = {
  __typename?: 'Query';
  getAuthenticatedClub?: Maybe<Club>;
  getAuthenticatedMember?: Maybe<Member>;
  getClubById?: Maybe<Club>;
  getMemberById?: Maybe<Member>;
  getTenant?: Maybe<Tenant>;
};


/**   Query.gql */
export type QueryGetClubByIdArgs = {
  clubId: Scalars['ID']['input'];
};


/**   Query.gql */
export type QueryGetMemberByIdArgs = {
  memberId: Scalars['ID']['input'];
};

/**   tenant.gql */
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

/**   Trainer.gql */
export type Trainer = {
  __typename?: 'Trainer';
  clubId: Scalars['ID']['output'];
  clubsIds: Array<Scalars['ID']['output']>;
  created_at: Scalars['AWSDateTime']['output'];
  email: Scalars['AWSEmail']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['AWSPhone']['output'];
  profile_picture?: Maybe<Scalars['AWSURL']['output']>;
  tenantId: Scalars['ID']['output'];
  updated_at: Scalars['AWSDateTime']['output'];
};

export type TrainerConnection = {
  __typename?: 'TrainerConnection';
  items?: Maybe<Array<Trainer>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export type UpdateMemberInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['AWSDate']['input']>;
  email?: InputMaybe<Scalars['AWSEmail']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  profile_picture?: InputMaybe<Scalars['AWSURL']['input']>;
};

export type CreateMemberMutationVariables = Exact<{
  input: CreateMemberInput;
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', createMember?: { __typename?: 'Member', phone_number?: any | null } | null };


export const CreateMemberDocument = gql`
    mutation CreateMember($input: CreateMemberInput!) {
  createMember(input: $input) {
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
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateMemberMutation, CreateMemberMutationVariables>(CreateMemberDocument, options);
}
export type CreateMemberMutationHookResult = ReturnType<typeof useCreateMemberMutation>;
export type CreateMemberMutationResult = Apollo.MutationResult<CreateMemberMutation>;
export type CreateMemberMutationOptions = Apollo.BaseMutationOptions<CreateMemberMutation, CreateMemberMutationVariables>;