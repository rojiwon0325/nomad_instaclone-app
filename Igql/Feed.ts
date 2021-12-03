/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Feed
// ====================================================

export interface Feed__count {
  __typename: "Post_count";
  like: number;
  comment: number;
  reComment: number;
}

export interface Feed {
  __typename: "Post";
  id: number;
  photo: string[];
  _count: Feed__count | null;
}
