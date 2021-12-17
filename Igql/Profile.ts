/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Profile
// ====================================================

export interface Profile__count {
  __typename: "Profile_count";
  post: number;
  follower: number;
  following: number;
}

export interface Profile {
  __typename: "Profile";
  isPublic: boolean;
  bio: string;
  _count: Profile__count | null;
}
