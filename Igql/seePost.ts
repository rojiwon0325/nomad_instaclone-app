/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seePost
// ====================================================

export interface seePost_seePost__count {
  __typename: "Post_count";
  like: number;
  comment: number;
  reComment: number;
}

export interface seePost_seePost_detail_comments__count {
  __typename: "Comment_count";
  reComment: number;
}

export interface seePost_seePost_detail_comments {
  __typename: "Comment";
  id: number;
  text: string;
  rootId: string | null;
  account: string;
  createdAt: string;
  _count: seePost_seePost_detail_comments__count | null;
  isMine: boolean;
}

export interface seePost_seePost_detail {
  __typename: "Post_detail";
  isMine: boolean;
  caption: string;
  account: string;
  isLiked: boolean;
  createdAt: string;
  avatarUrl: string;
  comments: seePost_seePost_detail_comments[];
}

export interface seePost_seePost {
  __typename: "Post";
  id: number;
  photo: string[];
  _count: seePost_seePost__count | null;
  detail: seePost_seePost_detail | null;
}

export interface seePost {
  seePost: seePost_seePost[] | null;
}

export interface seePostVariables {
  id?: number | null;
  offset?: number | null;
  account?: string | null;
}
