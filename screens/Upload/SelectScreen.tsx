import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { UploadStackScreenProps } from "types";
import { Alert, FlatList, Image, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "constants/Layout";

export default function SelectScreen({ navigation }: UploadStackScreenProps<"Select">) {
    const [selected, setSelect] = useState<MediaLibrary.Asset[]>([]);
    const [endCursor, setCursor] = useState<string | undefined>(undefined);
    const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);

    const select = (asset: MediaLibrary.Asset) => setSelect((pre) =>
        pre.includes(asset) ? pre.filter(elem => elem !== asset) : [...pre, asset]
    );

    const refreshPhoto = async () => {
        const res = await MediaLibrary.getAssetsAsync({ mediaType: "photo" });
        setPhotos(res.assets);
        setCursor(res.endCursor);
    };
    const getPhoto = async () => {
        const res = await MediaLibrary.getAssetsAsync({ mediaType: "photo", after: endCursor });
        setPhotos((pre) => [...pre, ...res.assets]);
        setCursor(res.endCursor);
    };

    useEffect(() => {
        if (photos.length === 0) {
            getPhoto();
        }
        navigation.setOptions({
            headerRight: () => <CaptionBtn onPress={() => {
                if (selected.length > 0) {
                    navigation.navigate("Caption", { photos: selected });
                } else {
                    Alert.alert("사진을 한장 이상 선택해주세요.");
                }
            }}><CaptionText>다음</CaptionText></CaptionBtn>
        });
        return
    }, [selected]);

    return (
        <>
            <Preview uri={selected.length === 0 ? "" : selected[selected.length - 1].uri}>
                <TakeNav onPress={() => navigation.navigate("Take")}>
                    <Ionicons name="camera" style={{ color: "white", opacity: 0.5 }} size={30} />
                </TakeNav>
            </Preview>
            <FlatList<MediaLibrary.Asset>
                data={photos}
                keyExtractor={(item) => item.filename + item.mediaType}
                numColumns={4}
                renderItem={({ item }) => (
                    <PreviewContainer onPress={() => select(item)}>
                        <Preview uri={item.uri} />
                        <CheckBox>
                            <Ionicons name="checkmark-circle" size={18} color={selected.includes(item) ? "rgb(0,149,253)" : "white"} />
                        </CheckBox>
                    </PreviewContainer>
                )}
                refreshing={false}
                onRefresh={refreshPhoto}
                onEndReached={getPhoto}
            />
        </>
    );
};

const PreviewContainer = styled.TouchableOpacity`
    width: ${Layout.window.width / 4 + "px"};
    border: 1px solid black;
`;

const Preview: React.FC<{ uri: string }> = ({ uri, children }) => {

    if (uri === "") {
        return <View style={{ aspectRatio: 1, width: "100%", backgroundColor: "black", position: "relative" }}>{children}</View>;
    }
    return <View style={{ position: "relative" }}><Image resizeMode="contain" style={{ aspectRatio: 1, width: "100%", backgroundColor: "black" }} source={{ uri }} />{children}</View>;
}

const CheckBox = styled.View`
    position: absolute;
    bottom: 2px;
    right: 2px;
`;

const TakeNav = styled.TouchableOpacity`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
`;

const CaptionBtn = styled.TouchableOpacity``;
const CaptionText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: "rgb(0,149,253)";
`;