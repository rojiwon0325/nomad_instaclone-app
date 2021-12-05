import React from "react";
import { useQuery } from "@apollo/client";
import { SEEFOLLOWER_QUERY } from "@constants/query/account";
import { ProfileStackScreenProps } from "types";
import { ActivityIndicator } from "react-native";
import { UserList } from "@components";
import { seeFollower } from "@Igql/seeFollower";

export default function FollowerScreen({ route }: ProfileStackScreenProps<"Follower">) {
    const { params: { account } } = route;
    const { data } = useQuery<seeFollower>(SEEFOLLOWER_QUERY, { skip: !account, variables: { account } });
    if (!data) {
        return <ActivityIndicator />
    }
    return <UserList users={data.seeFollower} />;
}