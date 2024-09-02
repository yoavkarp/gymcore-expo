/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMemberById = /* GraphQL */ `
  query GetMemberById($memberId: ID!) {
    getMemberById(memberId: $memberId) {
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
export const getAuthenticatedMember = /* GraphQL */ `
  query GetAuthenticatedMember {
    getAuthenticatedMember {
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
export const getClubById = /* GraphQL */ `
  query GetClubById($clubId: ID!) {
    getClubById(clubId: $clubId) {
      id
      tenantId
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
`;
export const getAuthenticatedClub = /* GraphQL */ `
  query GetAuthenticatedClub {
    getAuthenticatedClub {
      id
      tenantId
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
`;
export const getTenant = /* GraphQL */ `
  query GetTenant {
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
`;
