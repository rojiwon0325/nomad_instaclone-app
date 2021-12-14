/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Post_detail
// ====================================================

export interface Post_detail_comments__count {
  __typename: "Comment_count";
  reComment: number;
}

export interface Post_detail_comments {
  __typename: "Comment";
  id: number;
  text: string;
  rootId: string | null;
  account: string;
  createdAt: string;
  _count: Post_detail_comments__count | null;
  isMine: boolean;
}

export interface Post_detail {
  __typename: "Post_detail";
  isMine: boolean;
  caption: string;
  account: string;
  isLiked: boolean;
  createdAt: string;
  avatarUrl: string;
  comments: Post_detail_comments[];
}
