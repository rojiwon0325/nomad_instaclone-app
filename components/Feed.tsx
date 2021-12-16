import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';

const Feed: React.FC<{ index: number, photo: string[], account: string }> = ({ index, photo, account }) => {
    const navigation = useNavigation();
    return (
        <Container onPress={() =>
            navigation.navigate(
                "Profile",
                { screen: "Feed", params: { account, initialScrollIndex: index } }
            )}>
            {
                photo.length > 0 ?
                    <Img source={{ uri: photo[0] }} resizeMode="cover" />
                    : null
            }
        </Container >
    );
};

const Container = styled.TouchableOpacity`
    width: 33.334%;
    aspect-ratio: 1;
    background-color: ${({ theme }) => theme.colors.bar};
    border: 1px solid ${({ theme }) => theme.colors.background};
`;

const Img = styled.Image`
    width: 100%;
    height: 100%;
`;

export default Feed;