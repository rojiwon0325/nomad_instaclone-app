/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed__count {
  __typename: "Post_count";
  like: number;
  comment: number;
  reComment: number;
}

export interface seeFeed_seeFeed {
  __typename: "Post";
  id: number;
  photo: string[];
  _count: seeFeed_seeFeed__count | null;
}

export interface seeFeed {
  seeFeed: seeFeed_seeFeed[] | null;
}

export interface seeFeedVariables {
  account: string;
  offset?: number | null;
}
