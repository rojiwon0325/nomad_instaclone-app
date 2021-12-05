import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCHUSERS_QUERY } from "@constants/query/account";
import { HomeTabScreenProps } from "types";
import { ActivityIndicator } from "react-native";
import { MarginV, SearchBar, UserList } from "@components";
import { searchUsers } from "@Igql/searchUsers";
import Constants from "expo-constants";

export default function SearchScreen({ navigation }: HomeTabScreenProps<"Search">) {
    const [startQueryFn, { loading, data }] = useLazyQuery<searchUsers>(SEARCHUSERS_QUERY);
    const onValid = ({ key }: { key: string }) => {
        if (!loading) {
            startQueryFn({ variables: { key } });
        }
    }
    useEffect(() => {
        navigation.setOptions({
            header: () => <><MarginV size={Constants.statusBarHeight + "px"} /><SearchBar onValid={onValid} /></>
        });

    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }
    return <UserList users={data?.searchUsers} />;
};