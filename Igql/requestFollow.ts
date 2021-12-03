/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestFollow
// ====================================================

export interface requestFollow_requestFollow {
  __typename: "ResultToken";
  ok: boolean;
  error: string | null;
}

export interface requestFollow {
  requestFollow: requestFollow_requestFollow;
}

export interface requestFollowVariables {
  account: string;
}
