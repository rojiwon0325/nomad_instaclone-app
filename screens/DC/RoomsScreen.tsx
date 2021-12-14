import { useQuery } from "@apollo/client";
import { SEEROOMLIST_QUERY } from "@constants/query/account";
import { seeRoomList, seeRoomList_seeRoomList } from "@Igql/seeRoomList";
import React from "react";
import { FlatList } from "react-native";
import { DCStackScreenProps } from "types";
import RowUser from "./RowUser";

export default function RoomsScreen({ navigation }: DCStackScreenProps<"Rooms">) {
    const { data, loading, refetch, fetchMore } = useQuery<seeRoomList>(SEEROOMLIST_QUERY);
    return (
        <FlatList<seeRoomList_seeRoomList>
            contentContainerStyle={{ padding: 10 }}
            data={data?.seeRoomList ?? []}
            keyExtractor={(item) => item.id + ""}
            renderItem={({ item }) => <RowUser navigation={navigation} room={item} />}
            refreshing={loading}
            onRefresh={() => refetch()}
            onEndReached={() => data?.seeRoomList ? fetchMore({ variables: { offset: data.seeRoomList.length } }) : null}
        />
    );
};