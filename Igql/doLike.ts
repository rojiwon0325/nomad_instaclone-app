/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: doLike
// ====================================================

export interface doLike_doLike {
  __typename: "LikeResult";
  ok: boolean;
  error: string | null;
  type: boolean | null;
}

export interface doLike {
  doLike: doLike_doLike;
}

export interface doLikeVariables {
  id: number;
}
