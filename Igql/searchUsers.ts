/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchUsers
// ====================================================

export interface searchUsers_searchUsers {
  __typename: "User";
  username: string;
  account: string;
  avatarUrl: string;
  isMe: boolean | null;
  isFollowing: boolean | null;
  isRequesting: boolean | null;
}

export interface searchUsers {
  searchUsers: searchUsers_searchUsers[];
}

export interface searchUsersVariables {
  key: string;
}
