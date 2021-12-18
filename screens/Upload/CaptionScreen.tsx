import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { UploadStackScreenProps } from "types";
import Layout from "@constants/Layout";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Platform, ScrollView, View } from "react-native";
import { useLazyQuery, useMutation } from "@apollo/client";
import { newPost } from "@Igql/newPost";
import { NEWPOST_MUTATION, SEEPOST_QUERY } from "@constants/query/post";
import { ReactNativeFile } from "apollo-upload-client";
import { useNavigation } from "@react-navigation/native";
import { seePost } from "@Igql/seePost";

export default function CaptionScreen({ navigation, route }: UploadStackScreenProps<"Caption">) {
    const { params: { photos } } = route;
    const nav = useNavigation();
    const { control, formState: { isValid, errors }, getValues } = useForm<{ caption: string }>();
    const [QueryStartFn] = useLazyQuery<seePost>(SEEPOST_QUERY);
    const [newPost, { loading }] = useMutation<newPost>(NEWPOST_MUTATION, {
        onCompleted: async ({ newPost: { ok, error } }) => {
            if (ok) {
                Alert.alert("업로드", "게시물이 업로드 되었습니다.", [{
                    text: "ok", onPress: async () => {
                        QueryStartFn();
                        nav.navigate("Home");
                    }
                }]);
            } else if (error) {
                Alert.alert("업로드 실패", error);
            } else {
                Alert.alert("완료되었습니다.");
            }
        },
        refetchQueries: [{ query: SEEPOST_QUERY }]
    });
    const UploadFn = async () => {
        const { caption } = getValues();
        try {
            const photo: ReactNativeFile[] = [];
            photos.forEach((uri, idx) => {
                const file = new ReactNativeFile({
                    uri,
                    name: "take" + idx,
                    type: "image/jpeg",
                });
                photo.push(file);
            });
            if (photo.length > 0) {
                await newPost({
                    variables: {
                        caption: caption ?? "",
                        photo
                    }
                });

            }
        } catch (e) {
            console.log("In Caption" + e);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerBackVisible: !loading,
            headerRight: () => (
                <Upload disabled={loading || !isValid} onPress={
                    UploadFn
                }>
                    {!loading ? <UploadText>업로드</UploadText> : <ActivityIndicator color="rgb(0,149,253)" />}
                </Upload>
            )
        });
    }, [loading, isValid]);

    return (
        <Container behavior="position">
            <View>
                <ScrollView horizontal={true}>{
                    photos.map((uri, idx) => <Preview source={{ uri }} key={idx} resizeMode="cover" />)
                }</ScrollView>
                <Controller
                    control={control}
                    name="caption"
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <CaptionInput placeholder="문구 입력..."
                            multiline
                            autoFocus
                            autoCapitalize="none"
                            autoCorrect={false}
                            contextMenuHidden={false}
                            placeholderTextColor={"rgb(142,142,142)"}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
            </View>
        </Container>
    );
};

const Container = styled.KeyboardAvoidingView`
    padding-bottom: 100px;
    flex-direction: column;
`;
const Preview = styled.Image`
    width: ${Layout.window.width + "px"};
    height: ${Layout.window.width + "px"};
    background-color: black;
`;

const CaptionInput = styled.TextInput`
    width: 100%;
    min-height: 100px;
    background-color: ${({ theme }) => theme.colors.bar};
    color: ${({ theme }) => theme.colors.text};
    font-size: 18px;
    font-weight: 600;
    padding: 10px;
`;

const Upload = styled.TouchableOpacity``;
const UploadText = styled.Text`
    font-size: 18px;
    font-weight: 500;
    color: "rgb(0,149,253)";
`;