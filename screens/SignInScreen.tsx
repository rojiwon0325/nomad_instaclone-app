import React, { useEffect, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'types';
import styled from 'styled-components/native';
import { AuthInput, AuthLayout, BlueBtn, BlueLink, Logo } from '@components';
import { TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '@constants/query/account';
import { login } from 'Igql/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';
import { isLogin } from '@constants/recoil';

export default function SignInScreen({ navigation, route }: NativeStackScreenProps<AuthStackParamList, "SignIn">) {
    const last = useRef<TextInput>(null);
    const setLogin = useSetRecoilState(isLogin);
    const { params } = route;
    const { control, handleSubmit, formState: { isValid, errors }, reset } = useForm<{ account: string, password: string }>({ mode: "onChange" });
    const [login, { loading }] = useMutation<login>(LOGIN_MUTATION, {
        onCompleted: async ({ login: { ok, error, token } }) => {
            if (ok && token) {
                await AsyncStorage.multiSet([['jwt', token], ['isLogin', 'true']]);
                setLogin(true);
                navigation.navigate("Root");
            } else {
                console.log(error);
                //error message 창 만들것
            }
        },
    });
    useEffect(() => {
        reset(params);
    }, [params]);

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
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        placeholderTextColor={"rgb(142,142,142)"}
                        returnKeyType="done"
                        value={value}
                        defaultValue={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
            <Margin />
            <BlueBtn disabled={!isValid || loading} loading={loading} onPress={handleSubmit(variables => loading ? null : login({ variables }))}>
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