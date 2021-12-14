/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRoomList
// ====================================================

export interface seeRoomList_seeRoomList_user {
  __typename: "User";
  account: string;
  username: string;
  avatarUrl: string;
}

export interface seeRoomList_seeRoomList_chat {
  __typename: "Chat";
  id: number;
  text: string;
  read: boolean;
  roomId: number;
  account: string;
  createdAt: string;
}

export interface seeRoomList_seeRoomList {
  __typename: "ChatRoom";
  id: number;
  user: seeRoomList_seeRoomList_user[];
  chat: seeRoomList_seeRoomList_chat[];
  updatedAt: string;
}

export interface seeRoomList {
  seeRoomList: seeRoomList_seeRoomList[];
}

export interface seeRoomListVariables {
  offset?: number | null;
}
