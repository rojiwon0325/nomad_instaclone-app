import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { seePost, seePost_seePost } from '@Igql/seePost';
import Avatar from '../Avatar';
import User from "../User";
import { Platform, useWindowDimensions, View } from 'react-native';
import Buttons from './Buttons';

const Swiper = Platform.OS !== "web" ? require("react-native-swiper") : null;

const Post: React.FC<{
    data: seePost_seePost,
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<seePost>>
}> = ({ data: { id, photo, detail, _count }, refetch }) => {
    const [captionSlice, setSlice] = useState(2);
    const WIDTH = useWindowDimensions().width;
    if (detail === null || _count === null) {
        return null;
    }
    const { account, avatarUrl, caption, createdAt, isLiked } = detail;
    const date = new Date(Number(createdAt)).toLocaleDateString("ko");
    const { like, comment } = _count;

    return (
        <Container>
            <Row style={{ paddingLeft: 10 }}>
                <Avatar avatarUrl={avatarUrl} />
                <MarginH size="10px" />
                <User account={account} />
            </Row>
            <View style={{ width: WIDTH, height: WIDTH }}>
                {Platform.OS === "web" ? <Photo source={{ uri: photo[0] }} /> :
                    <Swiper loop={false} showsButtons={true} horizontal showsPagination={true} dotStyle={{ backgroundColor: "gray" }} paginationStyle={{ position: "absolute", bottom: -30 }}>
                        {photo.map((uri, idx) => <Photo key={"Photo:" + idx} source={{ uri }} />)}
                    </Swiper>}
            </View>
            <Controls>
                <Row>
                    <Buttons id={id} isLiked={isLiked} />
                </Row>
                <TextWrap>
                    <Info>좋아요 <Bold>{like}</Bold>개</Info>
                </TextWrap>
                <TextWrap>
                    <User account={account} /><Info> {
                        caption.slice(0, captionSlice).join("\n")
                    }{caption.length > captionSlice ? <MoreBtn activeOpacity={1} onPress={(e) => {
                        setSlice((pre) => pre + 3);
                    }}><More>...더보기</More></MoreBtn> : null}</Info>
                </TextWrap>
                {comment > 0 ?
                    <TextWrap>
                        <More>댓글 보기</More>
                    </TextWrap>
                    : null}

                <CreatedAt>{date}</CreatedAt>
            </Controls>
        </Container>
    );
};
const MoreBtn = styled.TouchableOpacity`
    height: 14px;
`;

const More = styled.Text`
    color: ${({ theme }) => theme.colors.subtext};
    font-size: 14px;
`;

const CreatedAt = styled.Text`
    color: ${({ theme }) => theme.colors.subtext};
    font-size: 12px;
`;

const Bold = styled.Text`
    font-weight: bold;
`;

const TextWrap = styled.TouchableOpacity.attrs({
    activeOpacity: 1
})`
    flex-direction: row;
    padding-bottom: 10px;
`;

const Info = styled.Text`
    color:${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: 500;
`;

const Controls = styled.View`
    width: 100%;
    padding: 0 10px;
`;

const Photo = styled.Image`
    height: 100%;
    aspect-ratio: 1;
`;

const MarginV = styled.View<{ size: string }>`
    height: ${({ size }) => size};
`;

const MarginH = styled.View<{ size: string }>`
    width: ${({ size }) => size};
`;

const Row = styled.View`
    width: 100%;
    height: 50px;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
`;

const Container = styled.View`
    width: 100%;
    padding-bottom: 20px;
`;

export default Post;