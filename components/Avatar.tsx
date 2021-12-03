import React from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from "styled-components/native";

const Avatar: React.FC<{ avatarUrl: string, onPress?: ((event: GestureResponderEvent) => void) | undefined }> = ({ avatarUrl, onPress }) => {
    const defaultImg = require("../assets/images/defaultAvatar.png");

    return (
        <Container onPress={onPress} activeOpacity={1}>
            <Img source={{ uri: avatarUrl === "" ? "../assets/images/defaultAvatar.png" : avatarUrl }} resizeMode="contain" defaultSource={defaultImg} />
        </Container>
    );
};

const Container = styled.TouchableOpacity`
    background-color: "rgba(0,0,0,0)";
    aspect-ratio: 1;
    border-radius: 50px;
    height: 70%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const Img = styled.Image`
    width: 100%;
    height: 100%;
`;

export default Avatar;