/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: newPost
// ====================================================

export interface newPost_newPost {
  __typename: "ResultToken";
  ok: boolean;
  error: string | null;
}

export interface newPost {
  newPost: newPost_newPost;
}

export interface newPostVariables {
  photo: any[];
  caption: string;
}
