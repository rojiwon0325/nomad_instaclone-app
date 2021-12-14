/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChatRoom
// ====================================================

export interface ChatRoom_user {
  __typename: "User";
  account: string;
  username: string;
  avatarUrl: string;
}

export interface ChatRoom_chat {
  __typename: "Chat";
  id: number;
  text: string;
  read: boolean;
  roomId: number;
  account: string;
  createdAt: string;
}

export interface ChatRoom {
  __typename: "ChatRoom";
  id: number;
  user: ChatRoom_user[];
  chat: ChatRoom_chat[];
  updatedAt: string;
}
