/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: newAccount
// ====================================================

export interface newAccount_newAccount {
  __typename: "ResultToken";
  ok: boolean;
  error: string | null;
}

export interface newAccount {
  newAccount: newAccount_newAccount;
}

export interface newAccountVariables {
  username: string;
  account: string;
  password: string;
}
