import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'types';
import styled from 'styled-components/native';
import { AuthInput, AuthLayout, BlueBtn, BlueLink, Logo } from '@components';
import { Alert, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { newAccount } from 'Igql/newAccount';
import { NEWACCOUNT_MUTATION } from '@constants/query/account';

export default function SignInScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, "SignUp">) {
    const next = useRef<TextInput>(null);
    const last = useRef<TextInput>(null);
    const [loading, setLoad] = useState(false);
    const { control, handleSubmit, getValues, formState: { isValid }, reset } = useForm<{ account: string, username: string, password: string }>({ mode: "onChange" });
    const [join, { loading: joinLoading }] = useMutation<newAccount>(NEWACCOUNT_MUTATION, {
        onCompleted: ({ newAccount: { ok, error } }) => {
            if (ok) {
                Alert.alert("신규 가입을 환영합니다.", "", [{
                    text: "ok", onPress: () => {
                        const { account, password } = getValues();
                        navigation.navigate("SignIn", { account, password });
                    }
                }]);
            } else if (error) {
                Alert.alert("회원가입 실패", error, [{
                    text: "ok", onPress: () => reset()
                }, {
                    text: "cancel"
                }]);
            }
            setLoad(false);
        }
    });

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
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        placeholderTextColor={"rgb(142,142,142)"}
                        returnKeyType="next"
                        onSubmitEditing={() => next?.current?.focus()}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
            <Controller
                control={control}
                name="username"
                rules={{ required: true, minLength: 2 }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <AuthInput placeholder="사용자 이름"
                        ref={next}
                        autoCapitalize={"none"}
                        autoCorrect={false}
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
                        autoCapitalize={"none"}
                        autoCorrect={false}
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
            <BlueBtn disabled={!isValid || loading} loading={loading} onPress={handleSubmit(variables => { setLoad(true); join({ variables }); })}>
                회원가입
            </BlueBtn>
            <Margin />
            <BlueLink onPress={() => navigation.navigate("SignIn", { account: "", password: "" })}>
                로그인
            </BlueLink>
        </AuthLayout >
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