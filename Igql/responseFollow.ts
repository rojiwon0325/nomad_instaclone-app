/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: responseFollow
// ====================================================

export interface responseFollow_responseFollow {
  __typename: "ResultToken";
  ok: boolean;
  error: string | null;
}

export interface responseFollow {
  responseFollow: responseFollow_responseFollow;
}

export interface responseFollowVariables {
  account: string;
  accept: boolean;
}
