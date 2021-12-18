import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { SEEROOM_QUERY } from "@constants/query/account";
import { seeRoom, seeRoom_seeRoom_chat } from "@Igql/seeRoom";
import { DCStackScreenProps } from "types";
import { FlatList, Platform, TextInput } from "react-native";
import ChatBubble from "./ChatBubble";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { MarginH, MarginV } from "@components";

export default function ChatScreen({ navigation, route }: DCStackScreenProps<"Chat">) {
    const { params: { roomId } } = route;
    const ref = useRef<TextInput>(null);
    const [bubbles, setBubbles] = useState<seeRoom_seeRoom_chat[][]>([]);
    const [cursor, setCursor] = useState<number | undefined>(undefined);
    const { data, refetch, loading, fetchMore } = useQuery<seeRoom>(SEEROOM_QUERY, { variables: { roomId } });

    useEffect(() => {
        const chats: seeRoom_seeRoom_chat[][] = [];
        data?.seeRoom?.chat?.forEach(chat => {
            if (chats.length > 0) {
                const last = chats[chats.length - 1][0];
                if (last.account === chat.account) {
                    const lastDate = new Date(parseInt(last.createdAt)).toLocaleString('ko-KR', { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
                    const chatDate = new Date(parseInt(chat.createdAt)).toLocaleString('ko-KR', { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
                    if (lastDate === chatDate) {
                        chats[chats.length - 1].push(chat);
                        return;
                    }
                }
            }
            chats.push([chat]);
        });
        if (chats.length > 0) {
            setCursor(chats[chats.length - 1][chats[chats.length - 1].length - 1].id);
            setBubbles(chats);
        }
    }, [data]);

    return (
        <Container behavior="position" keyboardVerticalOffset={60}>
            <FlatList<seeRoom_seeRoom_chat[]>
                inverted
                data={bubbles}
                style={{ height: "100%" }}
                ListHeaderComponent={<MarginV size="10px" />}
                keyExtractor={(item) => `Bubble:${item[0].id}`}
                renderItem={({ item }) => <ChatBubble chats={item} isMe={item[0].account !== data?.seeRoom?.user[0].account} />}
                refreshing={loading}
                onRefresh={refetch}
                onEndReached={() => cursor ? fetchMore({ variables: { roomId, cursor } }) : null}
            />
            <InputWrap>
                <TextInputWrap disabled={Platform.OS === "web"} onPress={() => ref.current?.focus()} activeOpacity={1}>
                    <Input
                        ref={ref}
                        autoCapitalize="none"
                        autoCorrect={false}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />
                </TextInputWrap>
                <MarginH size="10px" />
                <SubmitText>
                    <Ion name="send" size={30} />
                </SubmitText>
            </InputWrap>
        </Container>
    );
};

const Container = styled.KeyboardAvoidingView`
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
`;

const InputWrap = styled.View`
    padding: 40px 20px;
    padding-top: 0px;
    flex-direction: row;
    align-items: center;
`;

const TextInputWrap = styled.TouchableOpacity`
    border-radius: 20px;
    padding: 10px 20px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    flex: 1;
    font-size: 18px;
    font-weight: 600;
    align-items: flex-start;
    justify-content: center;
`;

const Input = styled.TextInput`
    color:${({ theme }) => theme.colors.text};
    font-size: 18px;
    font-weight: 600;
    max-height: 100px;
`;

const SubmitText = styled.TouchableOpacity`
`;

const Ion = styled(Ionicons)`
    border-radius: 100px;
    color:${({ theme }) => theme.colors.text};
`;