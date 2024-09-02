/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMember = /* GraphQL */ `
  mutation CreateMember($input: CreateMemberInput!) {
    createMember(input: $input) {
      id
      tenantId
      name
      email
      phone_number
      profile_picture
      address
      birthdate
      gender
      clubsIds
      measurement {
        id
        tenantId
        memberId
        clubId
        weight
        height
        fat
        heart_rate
        created_at
        updated_at
        __typename
      }
      created_at
      updated_at
      __typename
    }
  }
`;
export const deleteMember = /* GraphQL */ `
  mutation DeleteMember($memberId: ID!) {
    deleteMember(memberId: $memberId) {
      id
      tenantId
      name
      email
      phone_number
      profile_picture
      address
      birthdate
      gender
      clubsIds
      measurement {
        id
        tenantId
        memberId
        clubId
        weight
        height
        fat
        heart_rate
        created_at
        updated_at
        __typename
      }
      created_at
      updated_at
      __typename
    }
  }
`;
export const updateAuthenticatedMember = /* GraphQL */ `
  mutation UpdateAuthenticatedMember($input: UpdateMemberInput!) {
    updateAuthenticatedMember(input: $input) {
      id
      tenantId
      name
      email
      phone_number
      profile_picture
      address
      birthdate
      gender
      clubsIds
      measurement {
        id
        tenantId
        memberId
        clubId
        weight
        height
        fat
        heart_rate
        created_at
        updated_at
        __typename
      }
      created_at
      updated_at
      __typename
    }
  }
`;
export const createMeasurement = /* GraphQL */ `
  mutation CreateMeasurement($input: CreateMeasurementInput!) {
    createMeasurement(input: $input) {
      id
      tenantId
      memberId
      clubId
      weight
      height
      fat
      heart_rate
      created_at
      updated_at
      __typename
    }
  }
`;
