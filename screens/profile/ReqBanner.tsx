import { useMutation } from "@apollo/client";
import { BlueBtn, MarginH } from "@components";
import { GETME_QUERY, RESPONSEFOLLOW_MUTATION, SEEPROFILE_QUERY } from "@constants/query/account";
import { responseFollow } from "@Igql/responseFollow";
import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const ReqBanner: React.FC<{ account: string }> = ({ account }) => {
    const [response, { loading }] = useMutation<responseFollow>(RESPONSEFOLLOW_MUTATION, {
        refetchQueries: [{ query: SEEPROFILE_QUERY, variables: { account } }, { query: GETME_QUERY }]
    });
    const message = `${account}가 회원님을 팔로우하고 싶어합니다.`;
    if (loading) {
        return <ActivityIndicator style={{ height: 80 }} />
    }
    return (
        <Container>
            <TextWrap>{message.split(" ").map((str, idx) => <Message key={idx}>{str} </Message>)}</TextWrap>
            <Wrap>
                <Ok fontSize="14px" onPress={() => response({ variables: { account, accept: true } })}>확인</Ok>
                <MarginH size="5px" />
                <Del fontSize="14px" onPress={() => response({ variables: { account, accept: false } })}>삭제</Del>
            </Wrap>
        </Container>
    )
};

export default ReqBanner;

const Container = styled.View`
    height: 80px;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
`;

const TextWrap = styled.View`
    flex: 1;
    flex-wrap: wrap;
    flex-direction: row;
    margin-right: 30px;
`;

const Message = styled.Text`
    color: ${({ theme }) => theme.colors.subtext};
    font-size: 15px;
    font-weight: 600;
`;
const Wrap = styled.View`
    flex-direction: row;
`;
const Ok = styled(BlueBtn)`
    width: 80px;
    height: 35px;
`;

const Del = styled(BlueBtn)`
    width: 80px;
    height: 35px;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.border};
`;