/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMemberInput = {
  phone_number: string,
};

export type Member = {
  __typename: "Member",
  id: string,
  tenantId: string,
  name?: string | null,
  email?: string | null,
  phone_number?: string | null,
  profile_picture?: string | null,
  address?: string | null,
  birthdate?: string | null,
  gender?: string | null,
  registered?: boolean | null,
  measurement?: Measurement | null,
  goal?: Goal | null,
  created_at: string,
  updated_at: string,
};

export type Measurement = {
  __typename: "Measurement",
  id: string,
  tenantId: string,
  memberId: string,
  clubId?: string | null,
  weight?: number | null,
  height?: number | null,
  fat?: number | null,
  heart_rate?: number | null,
  created_at: string,
  updated_at: string,
};

export type Goal = {
  __typename: "Goal",
  id: string,
  tenantId: string,
  memberId: string,
  clubId?: string | null,
  title: string,
  weight?: number | null,
  height?: number | null,
  fat?: number | null,
  heart_rate?: number | null,
  completed?: boolean | null,
  completed_at?: string | null,
  created_at: string,
  updated_at: string,
};

export type CreateTrainerInput = {
  phone_number: string,
  name: string,
  email: string,
  profile_picture?: string | null,
  birthdate: string,
};

export type Trainer = {
  __typename: "Trainer",
  id: string,
  tenantId: string,
  name: string,
  email: string,
  phone_number: string,
  profile_picture?: string | null,
  created_at: string,
  updated_at: string,
};

export type UpdateAuthenticatedMemberInput = {
  name?: string | null,
  email?: string | null,
  profile_picture?: string | null,
  address?: string | null,
  birthdate?: string | null,
  gender?: string | null,
};

export type FirstTimeMemberRegisterInput = {
  name: string,
  email?: string | null,
  profile_picture?: string | null,
  address?: string | null,
  birthdate: string,
  gender: string,
};

export type CreateMeasurementInput = {
  memberId?: string | null,
  weight?: number | null,
  height?: number | null,
  fat?: number | null,
  heart_rate?: number | null,
};

export type CreateGoalInput = {
  memberId?: string | null,
  title: string,
  weight?: number | null,
  height?: number | null,
  fat?: number | null,
  heart_rate?: number | null,
};

export type UpdateGoalInput = {
  memberId?: string | null,
  title?: string | null,
  weight?: number | null,
  height?: number | null,
  fat?: number | null,
  heart_rate?: number | null,
};

export type Club = {
  __typename: "Club",
  id: string,
  tenantId: string,
  name: string,
  email: string,
  phone_number: string,
  profile_picture: string,
  address: string,
  created_at: number,
  updated_at: number,
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

export type CreateMemberMutationVariables = {
  input: CreateMemberInput,
};

export type CreateMemberMutation = {
  // Member
  createMember?:  {
    __typename: "Member",
    id: string,
    tenantId: string,
    name?: string | null,
    email?: string | null,
    phone_number?: string | null,
    profile_picture?: string | null,
    address?: string | null,
    birthdate?: string | null,
    gender?: string | null,
    registered?: boolean | null,
    measurement?:  {
      __typename: "Measurement",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      created_at: string,
      updated_at: string,
    } | null,
    goal?:  {
      __typename: "Goal",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      title: string,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      completed?: boolean | null,
      completed_at?: string | null,
      created_at: string,
      updated_at: string,
    } | null,
    created_at: string,
    updated_at: string,
  } | null,
};

export type DeleteMemberMutationVariables = {
  memberId: string,
};

export type DeleteMemberMutation = {
  deleteMember?:  {
    __typename: "Member",
    id: string,
    tenantId: string,
    name?: string | null,
    email?: string | null,
    phone_number?: string | null,
    profile_picture?: string | null,
    address?: string | null,
    birthdate?: string | null,
    gender?: string | null,
    registered?: boolean | null,
    measurement?:  {
      __typename: "Measurement",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      created_at: string,
      updated_at: string,
    } | null,
    goal?:  {
      __typename: "Goal",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      title: string,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      completed?: boolean | null,
      completed_at?: string | null,
      created_at: string,
      updated_at: string,
    } | null,
    created_at: string,
    updated_at: string,
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
    name: string,
    email: string,
    phone_number: string,
    profile_picture?: string | null,
    created_at: string,
    updated_at: string,
  } | null,
};

export type UpdateAuthenticatedMemberMutationVariables = {
  input: UpdateAuthenticatedMemberInput,
};

export type UpdateAuthenticatedMemberMutation = {
  updateAuthenticatedMember?:  {
    __typename: "Member",
    id: string,
    tenantId: string,
    name?: string | null,
    email?: string | null,
    phone_number?: string | null,
    profile_picture?: string | null,
    address?: string | null,
    birthdate?: string | null,
    gender?: string | null,
    registered?: boolean | null,
    measurement?:  {
      __typename: "Measurement",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      created_at: string,
      updated_at: string,
    } | null,
    goal?:  {
      __typename: "Goal",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      title: string,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      completed?: boolean | null,
      completed_at?: string | null,
      created_at: string,
      updated_at: string,
    } | null,
    created_at: string,
    updated_at: string,
  } | null,
};

export type FirstTimeMemberRegisterMutationVariables = {
  input: FirstTimeMemberRegisterInput,
};

export type FirstTimeMemberRegisterMutation = {
  firstTimeMemberRegister?:  {
    __typename: "Member",
    id: string,
    tenantId: string,
    name?: string | null,
    email?: string | null,
    phone_number?: string | null,
    profile_picture?: string | null,
    address?: string | null,
    birthdate?: string | null,
    gender?: string | null,
    registered?: boolean | null,
    measurement?:  {
      __typename: "Measurement",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      created_at: string,
      updated_at: string,
    } | null,
    goal?:  {
      __typename: "Goal",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      title: string,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      completed?: boolean | null,
      completed_at?: string | null,
      created_at: string,
      updated_at: string,
    } | null,
    created_at: string,
    updated_at: string,
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
    memberId: string,
    clubId?: string | null,
    weight?: number | null,
    height?: number | null,
    fat?: number | null,
    heart_rate?: number | null,
    created_at: string,
    updated_at: string,
  } | null,
};

export type CreateGoalMutationVariables = {
  input: CreateGoalInput,
};

export type CreateGoalMutation = {
  createGoal?:  {
    __typename: "Goal",
    id: string,
    tenantId: string,
    memberId: string,
    clubId?: string | null,
    title: string,
    weight?: number | null,
    height?: number | null,
    fat?: number | null,
    heart_rate?: number | null,
    completed?: boolean | null,
    completed_at?: string | null,
    created_at: string,
    updated_at: string,
  } | null,
};

export type UpdateGoalMutationVariables = {
  goalId: string,
  input: UpdateGoalInput,
};

export type UpdateGoalMutation = {
  updateGoal?:  {
    __typename: "Goal",
    id: string,
    tenantId: string,
    memberId: string,
    clubId?: string | null,
    title: string,
    weight?: number | null,
    height?: number | null,
    fat?: number | null,
    heart_rate?: number | null,
    completed?: boolean | null,
    completed_at?: string | null,
    created_at: string,
    updated_at: string,
  } | null,
};

export type GetMemberByIdQueryVariables = {
  memberId: string,
};

export type GetMemberByIdQuery = {
  getMemberById?:  {
    __typename: "Member",
    id: string,
    tenantId: string,
    name?: string | null,
    email?: string | null,
    phone_number?: string | null,
    profile_picture?: string | null,
    address?: string | null,
    birthdate?: string | null,
    gender?: string | null,
    registered?: boolean | null,
    measurement?:  {
      __typename: "Measurement",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      created_at: string,
      updated_at: string,
    } | null,
    goal?:  {
      __typename: "Goal",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      title: string,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      completed?: boolean | null,
      completed_at?: string | null,
      created_at: string,
      updated_at: string,
    } | null,
    created_at: string,
    updated_at: string,
  } | null,
};

export type GetAuthenticatedMemberQueryVariables = {
};

export type GetAuthenticatedMemberQuery = {
  getAuthenticatedMember?:  {
    __typename: "Member",
    id: string,
    tenantId: string,
    name?: string | null,
    email?: string | null,
    phone_number?: string | null,
    profile_picture?: string | null,
    address?: string | null,
    birthdate?: string | null,
    gender?: string | null,
    registered?: boolean | null,
    measurement?:  {
      __typename: "Measurement",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      created_at: string,
      updated_at: string,
    } | null,
    goal?:  {
      __typename: "Goal",
      id: string,
      tenantId: string,
      memberId: string,
      clubId?: string | null,
      title: string,
      weight?: number | null,
      height?: number | null,
      fat?: number | null,
      heart_rate?: number | null,
      completed?: boolean | null,
      completed_at?: string | null,
      created_at: string,
      updated_at: string,
    } | null,
    created_at: string,
    updated_at: string,
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
    name: string,
    email: string,
    phone_number: string,
    profile_picture: string,
    address: string,
    created_at: number,
    updated_at: number,
  } | null,
};

export type GetAuthenticatedClubQueryVariables = {
};

export type GetAuthenticatedClubQuery = {
  getAuthenticatedClub?:  {
    __typename: "Club",
    id: string,
    tenantId: string,
    name: string,
    email: string,
    phone_number: string,
    profile_picture: string,
    address: string,
    created_at: number,
    updated_at: number,
  } | null,
};

export type GetTrainersByClubIdQueryVariables = {
  clubId: string,
};

export type GetTrainersByClubIdQuery = {
  getTrainersByClubId?:  Array< {
    __typename: "Trainer",
    id: string,
    tenantId: string,
    name: string,
    email: string,
    phone_number: string,
    profile_picture?: string | null,
    created_at: string,
    updated_at: string,
  } > | null,
};

export type GetTrainerByIdQueryVariables = {
  trainerId: string,
};

export type GetTrainerByIdQuery = {
  getTrainerById?:  {
    __typename: "Trainer",
    id: string,
    tenantId: string,
    name: string,
    email: string,
    phone_number: string,
    profile_picture?: string | null,
    created_at: string,
    updated_at: string,
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
