import React from "react"
import { seeRoom_seeRoom_chat } from "@Igql/seeRoom";
import styled from "styled-components/native";
import { Avatar } from "@components";


const ChatBubble: React.FC<{ chats: seeRoom_seeRoom_chat[], isMe: boolean }> = ({ chats, isMe }) => {
    const ChatDate = new Date(parseInt(chats[0].createdAt)).toLocaleTimeString("ko-KR", { timeStyle: "short" });


    return (
        <Container isMe={isMe}>
            {isMe ? null :
                <AvatarWrap>
                    <Avatar avatarUrl="" />
                </AvatarWrap>
            }
            <Bubble isMe={isMe}>
                {chats.map((chat, idx) => (
                    <MessageWrap key={`chat:${chat.id}`}>
                        {isMe && chats.length - 1 === idx && <CreatedAt>{ChatDate}</CreatedAt>}
                        <Message isMe={isMe}>
                            <Text>{chat.text}</Text>
                        </Message>
                        {!isMe && chats.length - 1 === idx && <CreatedAt>{ChatDate}</CreatedAt>}
                    </MessageWrap>
                )
                )}
            </Bubble>

        </Container>
    );

};

export default ChatBubble;

const Container = styled.View<{ isMe: boolean }>`
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    justify-content: ${({ isMe }) => isMe ? "flex-end" : "flex-start"};
    padding-left: ${({ isMe }) => isMe ? "90px" : "10px"};
    padding-right: ${({ isMe }) => isMe ? "10px" : "90px"};
    padding-bottom: 5px;
`;

const AvatarWrap = styled.View`
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

const Bubble = styled.View<{ isMe: boolean }>`
    flex: 1;
    flex-direction: column;
    align-items: ${({ isMe }) => isMe ? "flex-end" : "flex-start"};
`;

const MessageWrap = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

const Message = styled.View<{ isMe: boolean }>`
    background-color: ${({ theme, isMe }) => isMe ? theme.colors.border : theme.colors.background};
    ${({ isMe, theme }) => isMe ? "margin-left: 5px;" : `border: 1px solid ${theme.colors.border}; margin-right: 5px;`};
    padding: 7px 10px;
    border-radius: 10px;
    margin-top: 5px;
    flex-direction: row;
    justify-content: ${({ isMe }) => isMe ? "flex-end" : "flex-start"};
`;

const Text = styled.Text`
    color: ${({ theme }) => theme.colors.text};
`;

const CreatedAt = styled.Text`
    color: ${({ theme }) => theme.colors.subtext};
`;