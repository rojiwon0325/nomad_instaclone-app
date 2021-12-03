/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Comment
// ====================================================

export interface Comment__count {
  __typename: "Comment_count";
  reComment: number;
}

export interface Comment {
  __typename: "Comment";
  id: number;
  text: string[];
  rootId: string | null;
  account: string;
  createdAt: string;
  _count: Comment__count | null;
  isMine: boolean;
}
