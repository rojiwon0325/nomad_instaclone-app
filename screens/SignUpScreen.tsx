import React, { useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'types';
import styled from 'styled-components/native';
import { AuthInput, AuthLayout, BlueBtn, Logo } from '@components';
import { TextInput } from 'react-native';

export default function SignInScreen({ navigation }: NativeStackScreenProps<AuthStackParamList>) {
    const next = useRef<TextInput>(null);
    const last = useRef<TextInput>(null);

    return (
        <AuthLayout>
            <LogoWrap>
                <Logo />
            </LogoWrap>

            <AuthInput placeholder="사용자 계정"
                autoFocus
                placeholderTextColor={"rgb(142,142,142)"}
                returnKeyType="next"
                onSubmitEditing={() => next?.current?.focus()}
            />
            <AuthInput placeholder="사용자 이릅"
                ref={next}
                placeholderTextColor={"rgb(142,142,142)"}
                returnKeyType="next"
                onSubmitEditing={() => last?.current?.focus()}
            />
            <AuthInput placeholder="비밀번호"
                ref={last}
                placeholderTextColor={"rgb(142,142,142)"}
                secureTextEntry
                returnKeyType="done"
            />
            <Margin />
            <BlueBtn onPress={() => navigation.navigate("SignIn")}>
                회원가입
            </BlueBtn>
        </AuthLayout>
    );
};

const LogoWrap = styled.View`
    width: 100%;
    height: 70px;
    margin-bottom: 30px;
`;
const Margin = styled.View`
    height: 20px;
`;