import React from 'react';
import { useQuery } from '@apollo/client';
import { SEEPOST_QUERY } from '@constants/query/post';
import { seePost, seePost_seePost } from '@Igql/seePost';
import { FlatList } from 'react-native';
import { Post } from '@components';

export default function MainScreen() {
    const { data, refetch } = useQuery<seePost>(SEEPOST_QUERY);
    return (
        <FlatList<seePost_seePost>
            initialScrollIndex={0}
            data={data?.seePost ?? []}
            contentContainerStyle={{ width: "100%" }}
            keyExtractor={({ id }) => "Post:" + id}
            renderItem={({ item }) => <Post data={item} refetch={refetch} />}
        />
    );
}
