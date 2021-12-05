import React from "react";
import { useQuery } from "@apollo/client";
import { SEEFOLLOWING_QUERY } from "@constants/query/account";
import { ProfileStackScreenProps } from "types";
import { ActivityIndicator } from "react-native";
import { UserList } from "@components";
import { seeFollowing } from "@Igql/seeFollowing";

export default function FollowingScreen({ route }: ProfileStackScreenProps<"Follower">) {
    const { params: { account } } = route;
    const { data } = useQuery<seeFollowing>(SEEFOLLOWING_QUERY, { skip: !account, variables: { account } });
    if (!data) {
        return <ActivityIndicator />
    }
    return <UserList users={data.seeFollowing} />;
}