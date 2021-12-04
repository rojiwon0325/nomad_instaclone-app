import { useQuery } from '@apollo/client';
import { Avatar, Feed } from '@components';
import { SEEPROFILE_QUERY } from '@constants/query/account';
import { SEEFEED_QUERY } from '@constants/query/post';
import { seeFeed, seeFeed_seeFeed } from '@Igql/seeFeed';
import { seeProfile } from '@Igql/seeProfile';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { ProfileStackScreenProps } from 'types';

export default function ProfileScreen({ navigation, route }: ProfileStackScreenProps<"Main">) {
    const { params: { account } } = route;
    const { data, refetch } = useQuery<seeProfile>(SEEPROFILE_QUERY, { variables: { account } });
    const { data: feedData } = useQuery<seeFeed>(SEEFEED_QUERY, { variables: { account } });

    if (!data) {
        return <ActivityIndicator />
    } else if (!data.seeProfile) {
        return null;
    }
    const { username, avatarUrl, isMe, isFollowing, profile } = data.seeProfile;

    useEffect(() => {
        refetch({ account });
    }, []);

    return (
        <FlatList<seeFeed_seeFeed>
            data={feedData?.seeFeed ?? []}
            keyExtractor={({ id }) => id + ""}
            ListHeaderComponent={
                <UserInfo>
                    <Top>
                        <Avatar avatarUrl={avatarUrl} />

                    </Top>
                    <Mid>
                        <Username>{username}</Username>
                    </Mid>
                    <Bot>
                        <Bio>{profile?.bio?.join("\n")}</Bio>
                    </Bot>
                </UserInfo>
            }
            renderItem={({ item: { photo }, index }) => (
                <Feed index={index} photo={photo} account={account} />
            )}
        />
    );
};

const UserInfo = styled.View`
    width: 100%;
    flex-direction: column;
    padding: 0 10px;
`;

const Top = styled.View`
    width: 100%;
    height: 100px;
    flex-direction: row;
    align-items: center;
    background-color: red;
`;


const Mid = styled.View`
    width: 100%;
    flex-direction: column;
`;

const Username = styled.Text`
    color:${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: 800;
    padding: 3px 0;
`;

const Bio = styled.Text`
    color:${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: 600;
`;

const Bot = styled.View`
    width: 100%;
    flex-direction: row;
`;
