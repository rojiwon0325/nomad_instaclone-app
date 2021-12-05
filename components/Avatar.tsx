import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from "styled-components/native";

const Avatar: React.FC<{ avatarUrl: string, account?: string }> = ({ avatarUrl, account }) => {
    const navigation = useNavigation();
    const defaultImg = require("../assets/images/defaultAvatar.png");

    return (
        <Container disabled={!account} onPress={() => account && navigation.navigate("Profile", { screen: "Main", params: { account } })} activeOpacity={1}>
            <Img source={{ uri: avatarUrl === "" ? "../assets/images/defaultAvatar.png" : avatarUrl }} resizeMode="contain" defaultSource={defaultImg} />
        </Container>
    );
};

const Container = styled.TouchableOpacity`
    background-color: "rgba(0,0,0,0)";
    aspect-ratio: 1;
    border-radius: 1000px;
    height: 100%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const Img = styled.Image`
    width: 100%;
    height: 100%;
`;

export default Avatar;