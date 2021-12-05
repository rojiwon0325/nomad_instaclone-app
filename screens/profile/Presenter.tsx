import React from "react";
import { seeProfile_seeProfile } from "@Igql/seeProfile";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { seeFeed, seeFeed_seeFeed } from '@Igql/seeFeed';
import { Avatar, Feed, MarginH, MarginV } from "@components";
import { useQuery } from "@apollo/client";
import { SEEFEED_QUERY } from "@constants/query/post";

const Presenter: React.FC<{ seeProfile: seeProfile_seeProfile }> = ({ seeProfile }) => {
    const { data } = useQuery<seeFeed>(SEEFEED_QUERY, { variables: { account: seeProfile.account } });
    const { avatarUrl, username, isMe, profile, account } = seeProfile;
    return (
        <FlatList<seeFeed_seeFeed>
            data={data?.seeFeed ?? []}
            keyExtractor={({ id }) => id + ""}
            ListHeaderComponent={
                <UserInfo>
                    <Top>
                        <Avatar avatarUrl={avatarUrl} />
                        <MarginH size="30px" />
                        <CountWrap>
                            {profile?._count ? <Count number={true}>{profile._count.post}</Count> : null}
                            <Count>게시물</Count>
                        </CountWrap>
                        <CountWrap>
                            {profile?._count ? <Count number={true}>{profile._count.follower}</Count> : null}
                            <Count>팔로워</Count>
                        </CountWrap><CountWrap>
                            {profile?._count ? <Count number={true}>{profile._count.following}</Count> : null}
                            <Count>팔로잉</Count>
                        </CountWrap>
                    </Top>
                    <Mid>
                        <Username>{username}</Username>
                        <Bio>{profile?.bio?.join("\n")}</Bio>
                    </Mid>
                    <Bot>
                        {isMe ?
                            <Btn><BtnText>프로필 편집</BtnText></Btn> :
                            <>
                                <Btn><BtnText>팔로잉</BtnText></Btn>
                                <MarginH size="5px" />
                                <Btn><BtnText>메시지</BtnText></Btn>
                            </>
                        }
                    </Bot>
                </UserInfo>
            }
            renderItem={({ item: { photo }, index }) => (
                <Feed index={index} photo={photo} account={account} />
            )}
            ListFooterComponent={
                () => {
                    if (data?.seeFeed === null) {
                        return (
                            <PrivateWrap>
                                <PrivateWarn>비공개 계정입니다.</PrivateWarn>
                                <MarginV size="5px" />
                                <Bio>게시물을 보려면 팔로우 요청을 해보세요!</Bio>
                            </PrivateWrap>
                        );
                    } else {
                        return null;
                    }
                }
            }
        />
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
    flex-direction: row;
    align-items: center;
`;

const CountWrap = styled.View`
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