/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendChat
// ====================================================

export interface sendChat_sendChat {
  __typename: "ResultToken";
  ok: boolean;
  error: string | null;
}

export interface sendChat {
  sendChat: sendChat_sendChat;
}

export interface sendChatVariables {
  text: string;
  roomId?: number | null;
  receiver?: string | null;
}
