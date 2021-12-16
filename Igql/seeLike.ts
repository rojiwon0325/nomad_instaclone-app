/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeLike
// ====================================================

export interface seeLike_seeLike {
  __typename: "User";
  username: string;
  account: string;
  avatarUrl: string;
  isMe: boolean | null;
  isFollowing: boolean | null;
  isRequesting: boolean | null;
  isRequested: boolean | null;
}

export interface seeLike {
  seeLike: seeLike_seeLike[];
}

export interface seeLikeVariables {
  id: number;
  offset?: number | null;
}
