import React from "react";
import styled from "styled-components/native";
import Avatar from "../Avatar";
import BlueBtn from "../BlueBtn";
import MarginH from "../MarginH";
import { useMutation } from "@apollo/client";
import { REQUESTFOLLOW_MUTATION } from "@constants/query/account";
import { requestFollow } from "@Igql/requestFollow";
import { SimpleUser } from "@Igql/SimpleUser";

const Row: React.FC<{ user: SimpleUser }> = ({ user }) => {

    const [follow, { loading }] = useMutation<requestFollow>(REQUESTFOLLOW_MUTATION, {
        variables: { account: user.account },
        update: (cache, result) => {
            if (result.data?.requestFollow.ok) {
                cache.modify({
                    id: `User:${user.account}`,
                    fields: {
                        isRequesting: () => true,
                    }
                });
            }
        },
    });



    return (
        <Container>
            <Avatar avatarUrl={user.avatarUrl} />
            <MarginH size="10px" />
            <Info>
                <Account numberOfLines={1} ellipsizeMode="tail">{user.account}</Account>
                <Username numberOfLines={1} ellipsizeMode="tail">{user.username}</Username>
            </Info>
            <BtnWrap>
                {
                    user.isMe ? null :
                        user.isFollowing ? <BlueBtn disabled>팔로잉</BlueBtn> :
                            user.isRequesting ?
                                <BlueBtn disabled>요청중</BlueBtn> :
                                <BlueBtn loading={loading} disabled={loading} onPress={() => follow()}>팔로우</BlueBtn>
                }
            </BtnWrap>
        </Container>
    );
};

export default Row;

const Container = styled.View`
    width: 100%;
    height: 80px;
    padding: 10px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const Info = styled.View`
    flex: 1;
`;

const Account = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 18px;
    font-weight: bold;
`;

const Username = styled.Text`
    color: ${({ theme }) => theme.colors.subtext};
    font-size: 16px;
`;

const BtnWrap = styled.View`
    width: 100px;
`;