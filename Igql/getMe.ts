/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMe
// ====================================================

export interface getMe_getMe_profile__count {
  __typename: "Profile_count";
  post: number;
  follower: number;
  following: number;
}

export interface getMe_getMe_profile {
  __typename: "Profile";
  isPublic: boolean;
  bio: string[];
  _count: getMe_getMe_profile__count | null;
}

export interface getMe_getMe {
  __typename: "User";
  username: string;
  account: string;
  avatarUrl: string;
  isMe: boolean | null;
  isFollowing: boolean | null;
  isRequesting: boolean | null;
  profile: getMe_getMe_profile | null;
}

export interface getMe {
  getMe: getMe_getMe | null;
}
