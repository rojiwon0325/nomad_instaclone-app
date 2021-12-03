/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: User
// ====================================================

export interface User_profile__count {
  __typename: "Profile_count";
  post: number;
  follower: number;
  following: number;
}

export interface User_profile {
  __typename: "Profile";
  isPublic: boolean;
  bio: string;
  _count: User_profile__count | null;
}

export interface User {
  __typename: "User";
  username: string;
  account: string;
  avatarUrl: string;
  isMe: boolean | null;
  isFollowing: boolean | null;
  isRequesting: boolean | null;
  profile: User_profile | null;
}
