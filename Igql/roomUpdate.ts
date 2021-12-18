/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: roomUpdate
// ====================================================

export interface roomUpdate_roomUpdate {
  __typename: "Chat";
  id: number;
  text: string;
  read: boolean;
  roomId: number;
  account: string;
  createdAt: string;
}

export interface roomUpdate {
  roomUpdate: roomUpdate_roomUpdate;
}

export interface roomUpdateVariables {
  roomId: number;
}
