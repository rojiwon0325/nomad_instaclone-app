import React, { useState } from 'react';
import styled from 'styled-components/native';
import { seePost_seePost } from '@Igql/seePost';
import Avatar from '../Avatar';
import User from "../User";
import { Platform, useWindowDimensions, View } from 'react-native';
import Buttons from './Buttons';
import MarginH from 'components/MarginH';
import { useNavigation } from '@react-navigation/native';
import useDateCalc from '@hooks/useDateCalc';

const Swiper = Platform.OS !== "web" ? require("react-native-swiper") : null;

const Post: React.FC<{ data: seePost_seePost }> = ({ data: { id, photo, detail, _count } }) => {
    const navigation = useNavigation();
    const WIDTH = useWindowDimensions().width;
    if (detail === null || _count === null) {
        return null;
    }
    const { account, avatarUrl, caption, createdAt, isLiked } = detail;
    const [captionMore, setMore] = useState(false);
    const [captions] = useState(caption.split(/\n|\r/));
    const date = useDateCalc(createdAt);
    const { like, comment } = _count;

    return (
        <Container>
            <Row style={{ paddingLeft: 10 }}>
                <AvatarWrap>
                    <Avatar avatarUrl={avatarUrl} account={account} />
                </AvatarWrap>
                <MarginH size="10px" />
                <User account={account} />
            </Row>
            <View style={{ width: WIDTH, height: WIDTH }}>
                {Platform.OS === "web" ? <Photo source={{ uri: photo[0] }} /> :
                    <Swiper loop={false} autoplayTimeout={0.1} showsButtons={true} horizontal showsPagination={true} dotStyle={{ backgroundColor: "gray" }} paginationStyle={{ position: "absolute", bottom: -30 }}>
                        {photo.map((uri, idx) => <Photo key={"Photo:" + idx} source={{ uri }} />)}
                    </Swiper>}
            </View>
            <Controls>
                <Row>
                    <Buttons id={id} isLiked={isLiked} />
                </Row>
                <TextWrap onPress={() => { navigation.navigate("Like", { id }) }}>
                    <Info>????????? <Bold>{like}</Bold>???</Info>
                </TextWrap>
                <TextWrap>
                    <Info>
                        <User account={account} />
                        &nbsp;
                        {
                            captionMore ? caption : captions[0].slice(0, 10)
                        }
                        {
                            !captionMore && (captions.length > 1 || caption.length > 10)
                                ? <MoreBtn activeOpacity={0} onPress={() => setMore(true)}><More>...?????????</More></MoreBtn>
                                : null
                        }
                    </Info>
                </TextWrap>
                {comment > 0 ?
                    <TextWrap>
                        <More>?????? ??????</More>
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
    flex:1;
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

const AvatarWrap = styled.View`
    height: 80%;
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