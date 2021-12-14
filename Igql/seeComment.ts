/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeComment
// ====================================================

export interface seeComment_seeComment__count {
  __typename: "Comment_count";
  reComment: number;
}

export interface seeComment_seeComment {
  __typename: "Comment";
  id: number;
  text: string;
  rootId: string | null;
  account: string;
  createdAt: string;
  _count: seeComment_seeComment__count | null;
  isMine: boolean;
}

export interface seeComment {
  seeComment: seeComment_seeComment[];
}

export interface seeCommentVariables {
  postId: number;
  rootId?: number | null;
  offset?: number | null;
  take?: number | null;
}
