/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFollowing
// ====================================================

export interface seeFollowing_seeFollowing {
  __typename: "User";
  username: string;
  account: string;
  avatarUrl: string;
  isMe: boolean | null;
  isFollowing: boolean | null;
  isRequesting: boolean | null;
}

export interface seeFollowing {
  seeFollowing: seeFollowing_seeFollowing[];
}

export interface seeFollowingVariables {
  account: string;
  offset?: number | null;
}
