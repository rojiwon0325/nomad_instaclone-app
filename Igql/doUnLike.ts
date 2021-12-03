/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: doUnLike
// ====================================================

export interface doUnLike_doUnLike {
  __typename: "LikeResult";
  ok: boolean;
  error: string | null;
  type: boolean | null;
}

export interface doUnLike {
  doUnLike: doUnLike_doUnLike;
}

export interface doUnLikeVariables {
  id: number;
}
