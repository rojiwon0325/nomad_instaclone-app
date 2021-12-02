import React from 'react';
import { Keyboard, Platform } from 'react-native';
import styled from "styled-components/native";

const AuthLayout: React.FC = ({ children }) => {

    return (
        <Layout disabled={Platform.OS === "web"} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
            <Container behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}>
                {children}
            </Container>
        </Layout >
    );
};
export default AuthLayout;

const Layout = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.KeyboardAvoidingView`
    width: 100%;
    max-width: 350px;
    justify-content: center;
    align-items: center;
`;
