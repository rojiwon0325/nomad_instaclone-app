import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { UploadStackScreenProps } from "types";
import { FlatList, Image, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "constants/Layout";

export default function SelectScreen({ navigation }: UploadStackScreenProps<"Select">) {
    const [selected, setSelect] = useState<string[]>([]);
    const [endCursor, setCursor] = useState<string | undefined>(undefined);
    const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
    const select = (uri: string) => setSelect((pre) =>
        pre.includes(uri) ? pre.filter(elem => elem !== uri) : [...pre, uri]
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
        getPhoto();
    }, []);

    return (
        <>
            <Preview uri={selected.length === 0 ? "" : selected[selected.length - 1]} />
            <FlatList<MediaLibrary.Asset>
                data={photos}
                keyExtractor={(item) => item.filename + item.mediaType}
                numColumns={4}
                renderItem={({ item: { uri } }) => (
                    <PreviewContainer onPress={() => select(uri)}>
                        <Preview uri={uri} />
                        <CheckBox>
                            <Ionicons name="checkmark-circle" size={18} color={selected.includes(uri) ? "rgb(0,149,253)" : "white"} />
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

const Preview: React.FC<{ uri: string }> = ({ uri }) => {

    if (uri === "") {
        return <View style={{ aspectRatio: 1, width: "100%" }} />;
    }
    return <Image resizeMode="contain" style={{ aspectRatio: 1, width: "100%" }} source={{ uri }} />
}

const CheckBox = styled.View`
    position: absolute;
    bottom: 2px;
    right: 2px;
`;