/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_profile__count {
  __typename: "Profile_count";
  post: number;
  follower: number;
  following: number;
}

export interface seeProfile_seeProfile_profile {
  __typename: "Profile";
  isPublic: boolean;
  bio: string[];
  _count: seeProfile_seeProfile_profile__count | null;
}

export interface seeProfile_seeProfile {
  __typename: "User";
  username: string;
  account: string;
  avatarUrl: string;
  isMe: boolean | null;
  isFollowing: boolean | null;
  isRequesting: boolean | null;
  isRequested: boolean | null;
  profile: seeProfile_seeProfile_profile | null;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile | null;
}

export interface seeProfileVariables {
  account: string;
}
