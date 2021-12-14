import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from "styled-components/native";

const User: React.FC<{ account: string }> = ({ account }) => {
    const navigation = useNavigation();
    return (
        <Container onPress={() => navigation.navigate("Profile", { screen: "Main", params: { account } })}>
            <Text>{account}</Text>
        </Container>
    );
};

const Text = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 16px;
    font-weight: bold;
`;

const Container = styled.TouchableOpacity`
    background-color: "rgba(0,0,0,0)";
    padding: 0;
    margin-bottom:-3px;
`;


export default User;