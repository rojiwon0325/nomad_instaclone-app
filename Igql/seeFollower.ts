/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFollower
// ====================================================

export interface seeFollower_seeFollower {
  __typename: "User";
  username: string;
  account: string;
  avatarUrl: string;
  isMe: boolean | null;
  isFollowing: boolean | null;
  isRequesting: boolean | null;
  isRequested: boolean | null;
}

export interface seeFollower {
  seeFollower: seeFollower_seeFollower[];
}

export interface seeFollowerVariables {
  account: string;
  offset?: number | null;
}
