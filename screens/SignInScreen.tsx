import React, { useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'types';
import styled from 'styled-components/native';
import { AuthInput, AuthLayout, BlueBtn, BlueLink, Logo } from '@components';
import { TextInput } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

export default function SignInScreen({ navigation }: NativeStackScreenProps<AuthStackParamList>) {
    const last = useRef<TextInput>(null);
    const { control, handleSubmit, formState: { isValid } } = useForm<{ account: string, password: string }>({ mode: "onChange" });
    const onSubmit: SubmitHandler<{ account: string, password: string }> = (data) => { console.log(data) };
    return (
        <AuthLayout>
            <LogoWrap>
                <Logo />
            </LogoWrap>
            <Controller
                control={control}
                name="account"
                rules={{ required: true, minLength: 5 }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput placeholder="사용자 계정"
                        autoFocus
                        placeholderTextColor={"rgb(142,142,142)"}
                        returnKeyType="next"
                        onSubmitEditing={() => last?.current?.focus()}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
            <Controller
                control={control}
                name="password"
                rules={{ required: true, minLength: 5 }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput placeholder="비밀번호"
                        ref={last}
                        secureTextEntry
                        placeholderTextColor={"rgb(142,142,142)"}
                        returnKeyType="done"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
            <Margin />
            <BlueBtn disabled={!isValid} loading={false} onPress={handleSubmit(onSubmit)}>
                로그인
            </BlueBtn>
            <Margin />
            <BlueLink onPress={() => navigation.navigate("SignUp")}>
                회원가입
            </BlueLink>
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