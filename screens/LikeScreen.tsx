import React from "react";
import { useQuery } from "@apollo/client";
import { SEELIKE_QUERY } from "@constants/query/account";
import { RootStackScreenProps } from "types";
import { ActivityIndicator } from "react-native";
import { UserList } from "@components";
import { seeLike } from "@Igql/seeLike";

export default function FollowerScreen({ route }: RootStackScreenProps<"Like">) {
    const { params: { id } } = route;
    const { data } = useQuery<seeLike>(SEELIKE_QUERY, { skip: !id, variables: { id } });

    if (!data) {
        return <ActivityIndicator />
    }
    return <UserList users={data.seeLike} />;
}