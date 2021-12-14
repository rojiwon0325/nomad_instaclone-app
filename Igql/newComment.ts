/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: newComment
// ====================================================

export interface newComment_newComment_comment__count {
  __typename: "Comment_count";
  reComment: number;
}

export interface newComment_newComment_comment {
  __typename: "Comment";
  id: number;
  text: string;
  rootId: string | null;
  account: string;
  createdAt: string;
  _count: newComment_newComment_comment__count | null;
  isMine: boolean;
}

export interface newComment_newComment {
  __typename: "CommentResult";
  ok: boolean;
  error: string | null;
  comment: newComment_newComment_comment | null;
}

export interface newComment {
  newComment: newComment_newComment;
}

export interface newCommentVariables {
  postId: number;
  text: string;
  rootId?: number | null;
}
