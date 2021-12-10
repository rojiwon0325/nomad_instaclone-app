import React, { useEffect, useRef, useState } from "react";
import { UploadStackScreenProps } from "types";
import { Camera } from 'expo-camera';
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

export default function TakeScreen({ navigation }: UploadStackScreenProps<"Take">) {
    const [hasPermission, setHasPermission] = useState(false);
    const camera = useRef<Camera>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flashIcon, setIcon] = useState<"flash-off" | "flash" | "flash-outline">("flash-off");
    const [flashMode, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [zoomValue, setZoom] = useState(0);
    const [cameraReady, setCameraReady] = useState(false);

    const onCameraReady = () => setCameraReady(true);
    const setFlashMode = () => {
        setFlash(pre => {
            if (pre === Camera.Constants.FlashMode.off) {
                setIcon("flash");
                return Camera.Constants.FlashMode.on;
            } else if (pre === Camera.Constants.FlashMode.on) {
                setIcon("flash-outline");
                return Camera.Constants.FlashMode.auto;
            } else if (pre === Camera.Constants.FlashMode.auto) {
                setIcon("flash");
                return Camera.Constants.FlashMode.torch;
            } else {
                setIcon("flash-off");
                return Camera.Constants.FlashMode.off;
            }
        });
    };

    useEffect(() => {
        (async () => {
            const { granted } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(granted);
        })();
    }, []);

    if (hasPermission === false) {
        return null;
    }
    return (
        <Container>
            <Camera onCameraReady={onCameraReady} ref={camera} type={type} flashMode={flashMode} zoom={zoomValue} style={{ width: "100%", aspectRatio: 1 }} />

            <Controls>
                <Setting onPress={() => setFlashMode()}>
                    <Ionicons name={flashIcon} style={{ color: "white" }} size={40} />
                </Setting>
                <Take onPress={async () => {
                    if (camera.current && cameraReady) {
                        setCameraReady(false);
                        camera.current.pausePreview();
                        const { uri } = await camera.current.takePictureAsync({ quality: 1, exif: true });
                        navigation.navigate("Caption", { photos: [uri] });
                    }
                }}>
                    <TakeIn />
                </Take>
                <Setting onPress={() => setType(pre => pre === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
                    <Ionicons name="camera-reverse" style={{ color: "white" }} size={40} />
                </Setting>
            </Controls>
        </Container>
    );
};


const Container = styled.View`
    flex: 1;
    background-color: black;
`;

const Controls = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

const Take = styled.TouchableOpacity`
    width: 25%;
    aspect-ratio: 1;
    background-color: black;
    border: 5px solid white;
    border-radius: 500px;
    align-items: center;
    justify-content: center;
`;

const TakeIn = styled.View`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 500px;
    border: 3px solid rgba(0,0,0,1);
`;

const Setting = styled.TouchableOpacity`
    color: white;
`;