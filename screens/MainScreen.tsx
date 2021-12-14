import React from 'react';
import { useQuery } from '@apollo/client';
import { SEEPOST_QUERY } from '@constants/query/post';
import { seePost, seePost_seePost } from '@Igql/seePost';
import { FlatList } from 'react-native';
import { Post } from '@components';

export default function MainScreen() {
    const { data, loading, refetch, fetchMore } = useQuery<seePost>(SEEPOST_QUERY);
    const renderItem = ({ item }: { item: seePost_seePost }) => (<Post data={item} />);
    return (
        <FlatList<seePost_seePost>
            refreshing={loading}
            onRefresh={() => refetch()}
            onEndReached={() => data?.seePost ? fetchMore({ variables: { offset: data.seePost.length } }) : null}
            initialScrollIndex={0}
            initialNumToRender={2}
            data={data?.seePost ?? []}
            contentContainerStyle={{ width: "100%" }}
            keyExtractor={({ id }) => "Post:" + id}
            renderItem={renderItem}
        />
    );
}
