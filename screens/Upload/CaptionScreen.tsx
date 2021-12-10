import React, { useEffect } from "react";
import styled from "styled-components/native";
import { UploadStackScreenProps } from "types";
import Layout from "@constants/Layout";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, Platform, ScrollView } from "react-native";
import { useMutation } from "@apollo/client";
import { newPost } from "@Igql/newPost";
import { NEWPOST_MUTATION } from "@constants/query/post";
import { ReactNativeFile } from "apollo-upload-client";

export default function CaptionScreen({ navigation, route }: UploadStackScreenProps<"Caption">) {
    const { params: { photos } } = route;
    const { control, formState: { isValid, errors }, getValues } = useForm<{ caption: string }>();
    const [newPost, { loading }] = useMutation<newPost>(NEWPOST_MUTATION, {
        onCompleted: (result) => {
            Alert.alert("complete");
        }
    });

    useEffect(() => {
        navigation.setOptions({
            headerBackVisible: !loading,
            headerRight: () => <Upload disabled={loading || !isValid} onPress={async () => {
                const { caption } = getValues();
                try {
                    const photo = photos.map((uri, idx) => {
                        const file = new ReactNativeFile({
                            uri: uri,
                            name: idx + ".jpg",
                            type: "image/jpeg",
                        });
                        return file;
                    });
                    console.log(photo);
                    await newPost({
                        variables: {
                            caption: caption ?? "",
                            photo: photo
                        }
                    });
                } catch { }
            }}
            >{!loading ? <UploadText>업로드</UploadText> : <ActivityIndicator />}</Upload>
        });
    }, [loading, isValid]);

    return (
        <Container behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
            <ScrollView horizontal={true}>{photos.map(((uri, idx) => <Preview source={{ uri }} key={idx} resizeMode="contain" />))}</ScrollView>
            <Controller
                control={control}
                name="caption"
                rules={{ required: false }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <CaptionInput placeholder="문구 입력..."
                        multiline
                        autoFocus
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        placeholderTextColor={"rgb(142,142,142)"}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
        </Container>
    );
};

const Container = styled.KeyboardAvoidingView`
    flex: 1;
`;
const Preview = styled.Image`
    width: ${Layout.window.width + "px"};
    height: ${Layout.window.width + "px"};
    background-color: black;
`;

const CaptionInput = styled.TextInput`
    width: 100%;
    min-height: 100px;
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