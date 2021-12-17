/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRoom
// ====================================================

export interface seeRoom_seeRoom_user {
  __typename: "User";
  account: string;
  username: string;
  avatarUrl: string;
}

export interface seeRoom_seeRoom_chat {
  __typename: "Chat";
  id: number;
  text: string;
  read: boolean;
  roomId: number;
  account: string;
  createdAt: string;
}

export interface seeRoom_seeRoom {
  __typename: "ChatRoom";
  id: number;
  user: seeRoom_seeRoom_user[];
  chat: seeRoom_seeRoom_chat[];
  updatedAt: string;
}

export interface seeRoom {
  seeRoom: seeRoom_seeRoom | null;
}

export interface seeRoomVariables {
  roomId: number;
  cursor?: number | null;
}
