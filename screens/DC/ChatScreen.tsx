import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { SEEROOM_QUERY } from "@constants/query/account";
import { seeRoom, seeRoom_seeRoom_chat } from "@Igql/seeRoom";
import { DCStackScreenProps } from "types";
import { FlatList, View } from "react-native";
import ChatBubble from "./ChatBubble";

export default function ChatScreen({ navigation, route }: DCStackScreenProps<"Chat">) {
    const { params: { roomId } } = route;
    const [bubbles, setBubbles] = useState<seeRoom_seeRoom_chat[][]>([]);
    const [cursor, setCursor] = useState<number | undefined>(undefined);
    const { data, refetch, loading, fetchMore } = useQuery<seeRoom>(SEEROOM_QUERY, { variables: { roomId } });

    useEffect(() => {
        const chats: seeRoom_seeRoom_chat[][] = [];
        data?.seeRoom?.chat.forEach(chat => {
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
        setCursor(chats[chats.length - 1][chats[chats.length - 1].length - 1].id);
        setBubbles(chats);
    }, [data]);

    return <FlatList<seeRoom_seeRoom_chat[]>
        inverted
        ListHeaderComponent={() => <View style={{ backgroundColor: "red", height: 20 }} />}
        data={bubbles}
        keyExtractor={(item) => `Bubble:${item[0].id}`}
        renderItem={({ item }) => <ChatBubble chats={item} isMe={item[0].account !== data?.seeRoom?.user[0].account} />}
        refreshing={loading}
        onRefresh={refetch}
        onEndReached={() => cursor ? fetchMore({ variables: { roomId, cursor } }) : null}
    />;
};