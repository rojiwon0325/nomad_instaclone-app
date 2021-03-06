import React, { useState } from "react";
import { seeProfile } from "@Igql/seeProfile";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { seeFeed, seeFeed_seeFeed } from '@Igql/seeFeed';
import { Avatar, BlueBtn, Feed, MarginH, MarginV } from "@components";
import { ApolloQueryResult, OperationVariables, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { SEEFEED_QUERY } from "@constants/query/post";
import { useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ReqBanner from "./ReqBanner";
import { getMe } from "@Igql/getMe";
import { DELETEFOLLOWING_MUTATION, FINDORCREATEROOM_QUERY, REQUESTFOLLOW_MUTATION } from "@constants/query/account";
import { requestFollow } from "@Igql/requestFollow";
import { deleteFollowing } from "@Igql/deleteFollowing";
import { User, User_profile } from "@Igql/User";
import { findOrCreateRoom } from "@Igql/findOrCreateRoom";

interface Props {
    seeProfile: User;
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<seeProfile | getMe>>;
    navigation: NativeStackNavigationProp<ProfileStackParamList, "Main">;
}

const Presenter: React.FC<Props> = ({ seeProfile, refetch, navigation }) => {
    const rootNavigation = useNavigation();
    const { data } = useQuery<seeFeed>(SEEFEED_QUERY, { variables: { account: seeProfile.account } });
    const [QueryStartFn] = useLazyQuery<findOrCreateRoom>(FINDORCREATEROOM_QUERY);
    const [roomId, setRoomId] = useState<number | undefined>(undefined);
    const { avatarUrl, username, isMe, profile, account, isFollowing, isRequesting, isRequested } = seeProfile;

    const [follow, { loading: loadingFollow }] = useMutation<requestFollow>(REQUESTFOLLOW_MUTATION, {
        variables: { account },
        update: (cache, result) => {
            if (result.data?.requestFollow.ok) {
                cache.modify({
                    id: `User:${account}`,
                    fields: {
                        isRequesting: () => true
                    }
                });
            }
        },
    });
    const [unfollow, { loading: loadingUnFollow }] = useMutation<deleteFollowing>(DELETEFOLLOWING_MUTATION, {
        variables: { account },
        update: (cache, result) => {
            if (result.data?.deleteFollowing.ok) {
                cache.modify({
                    id: `User:${account}`,
                    fields: {
                        isFollowing: () => false,
                        profile: (prev: User_profile) => ({
                            ...prev,
                            _count: prev._count ? { ...prev._count, follower: prev._count.follower - 1 } : null
                        }),
                    }
                });
            }
        },
    });

    return (
        <>
            {isRequested ? <ReqBanner account={account} /> : null}
            <FlatList<seeFeed_seeFeed>
                refreshing={false}
                onRefresh={() => refetch()}
                data={data?.seeFeed ?? []}
                keyExtractor={({ id }) => id + ""}
                ListHeaderComponent={
                    <UserInfo>
                        <Top>
                            <Avatar avatarUrl={avatarUrl} />
                            <MarginH size="30px" />
                            <CountWrap activeOpacity={1}>
                                {profile?._count ? <Count number={true}>{profile._count.post}</Count> : null}
                                <Count>?????????</Count>
                            </CountWrap>
                            <CountWrap activeOpacity={1} onPress={() => { navigation.navigate("Follower", { account: seeProfile.account }) }}>
                                {profile?._count ? <Count number={true}>{profile._count.follower}</Count> : null}
                                <Count>?????????</Count>
                            </CountWrap>
                            <CountWrap activeOpacity={1} onPress={() => { navigation.navigate("Following", { account: seeProfile.account }) }}>
                                {profile?._count ? <Count number={true}>{profile._count.following}</Count> : null}
                                <Count>?????????</Count>
                            </CountWrap>
                        </Top>
                        <Mid>
                            <Username>{username}</Username>
                            <Bio>{profile?.bio}</Bio>
                        </Mid>
                        <Bot>
                            {isMe ?
                                <Btn activeOpacity={1}><BtnText>????????? ??????</BtnText></Btn> :
                                <>
                                    {
                                        isFollowing
                                            ? <Wrap><BlueBtn fontSize="16px"
                                                onPress={
                                                    () => unfollow()
                                                }
                                                loading={loadingUnFollow}
                                            >????????? ??????</BlueBtn></Wrap>
                                            : isRequesting
                                                ? <Wrap><BlueBtn fontSize="16px" disabled>?????????</BlueBtn></Wrap>
                                                : <Wrap><BlueBtn fontSize="16px"
                                                    onPress={
                                                        () => follow()
                                                    }
                                                    loading={loadingFollow}
                                                >?????????</BlueBtn></Wrap>
                                    }
                                    <MarginH size="5px" />
                                    <Btn activeOpacity={1} onPress={async () => {
                                        if (!roomId) {
                                            const { data } = await QueryStartFn({ variables: { account } });
                                            if (data?.findOrCreateRoom) {
                                                setRoomId(data.findOrCreateRoom);
                                                rootNavigation.navigate("DC", { screen: "Chat", params: { roomId: data.findOrCreateRoom, account } });
                                            }
                                        } else {
                                            rootNavigation.navigate("DC", { screen: "Chat", params: { roomId, account } });
                                        }
                                    }}><BtnText>?????????</BtnText></Btn>
                                </>
                            }
                        </Bot>
                    </UserInfo>
                }
                numColumns={3}
                columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 10 }}
                renderItem={({ item: { photo }, index }) => (
                    <Feed index={index} photo={photo} account={account} />
                )}
                ListFooterComponent={
                    () => {
                        if (data?.seeFeed === null) {
                            return (
                                <PrivateWrap>
                                    <PrivateWarn>????????? ???????????????.</PrivateWarn>
                                    <MarginV size="5px" />
                                    <Bio>???????????? ????????? ????????? ????????? ????????????!</Bio>
                                </PrivateWrap>
                            );
                        } else {
                            return null;
                        }
                    }
                }
            />
        </>
    );
};

export default Presenter;


const UserInfo = styled.View`
    width: 100%;
    flex-direction: column;
    padding: 10px;
`;

const Top = styled.View`
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
`;

const CountWrap = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const Count = styled.Text<{ number?: boolean }>`
    color:${({ theme }) => theme.colors.text};
    font-size: ${({ number }) => number ? "18px" : "16px"};
    font-weight: 900;
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

const Btn = styled.TouchableOpacity`
    flex: 1;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
`;
const Wrap = styled.View`
    flex: 1;
    margin: 10px 0;
`;

const BtnText = styled.Text`
    color:${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: 700;
`;

const PrivateWrap = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;
const PrivateWarn = styled.Text`
    color:${({ theme }) => theme.colors.text};
    font-size: 20px;
    font-weight: bold;
`;