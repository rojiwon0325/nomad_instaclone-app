import React, { useMemo } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { ROOMUPDATE_SUB, SEEROOM_QUERY, SENDCHAT_MUTATION } from "@constants/query/account";
import { seeRoom, seeRoom_seeRoom_chat } from "@Igql/seeRoom";
import { DCStackScreenProps } from "types";
import { FlatList } from "react-native";
import ChatBubble from "./ChatBubble";
import styled from "styled-components/native";
import { BottomInput, MarginV } from "@components";
import { roomUpdate } from "@Igql/roomUpdate";
import { Controller, useForm } from "react-hook-form";
import { sendChat } from "@Igql/sendChat";

export default function ChatScreen({ route }: DCStackScreenProps<"Chat">) {
    const { params: { roomId } } = route;
    const { data, refetch, loading, fetchMore } = useQuery<seeRoom>(SEEROOM_QUERY, {
        variables: { roomId },

    });
    const { control, handleSubmit, formState: { isValid }, reset } = useForm<{ chat: string }>({ mode: "onChange" });
    const [sendChat, { loading: loadingSend }] = useMutation<sendChat>(SENDCHAT_MUTATION);
    useSubscription<roomUpdate>(ROOMUPDATE_SUB, {
        variables: { roomId },
        onSubscriptionComplete: () => {
            console.log("complete");
        },
        onSubscriptionData: ({ client, subscriptionData: { data } }) =>
            client.cache.modify({
                id: `ChatRoom:${roomId}`,
                fields: {
                    chat: (pre) => data?.roomUpdate ? [data.roomUpdate, ...pre] : [pre]
                }
            }),
    });
    const [bubbles, cursor] = useMemo(() => {
        const chats: seeRoom_seeRoom_chat[][] = [];
        data?.seeRoom?.chat?.forEach(chat => {
            if (chats.length > 0) {
                const last = chats[chats.length - 1][0];
                if (last.account === chat.account) {
                    const lastDate = new Date(parseInt(last.createdAt)).toLocaleString('ko-KR', { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
                    const chatDate = new Date(parseInt(chat.createdAt)).toLocaleString('ko-KR', { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
                    if (lastDate === chatDate) {
                        chats[chats.length - 1].unshift(chat);
                        return;
                    }
                }
            }
            chats.push([chat]);
        });
        if (chats.length > 0) {
            const cursorId = chats[chats.length - 1][chats[chats.length - 1].length - 1].id;
            return [chats, cursorId];
        }
        return [chats];
    }, [data]);

    return (
        <Container behavior="padding" keyboardVerticalOffset={60}>
            <FlatList<seeRoom_seeRoom_chat[]>
                inverted
                data={bubbles}
                style={{ height: "100%" }}
                ListHeaderComponent={<MarginV size="10px" />}
                keyExtractor={(item, idx) => idx + `Bubble:${item[0].id}/${item.length}`}
                renderItem={({ item }) => <ChatBubble chats={item} isMe={item[0].account !== data?.seeRoom?.user[0].account} />}
                refreshing={loading}
                onRefresh={refetch}
                onEndReached={() => cursor ? fetchMore({ variables: { roomId, cursor } }) : null}
            />
            <Controller
                control={control}
                name="chat"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <BottomInput InputProps={{
                        placeholder: "메시지 보내기...",
                        value,
                        onChangeText: onChange,
                        onBlur,
                    }}
                        onPress={handleSubmit(async ({ chat }) => {
                            await sendChat({ variables: { text: chat, roomId } });
                            reset({ chat: "" });
                        })}
                        disabled={!isValid || loadingSend || loading}
                    />
                )}
            />
        </Container>
    );
};

const Container = styled.KeyboardAvoidingView`
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    padding-top: 10px;
`;
