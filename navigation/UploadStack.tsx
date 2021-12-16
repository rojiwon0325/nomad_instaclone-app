import React, { useEffect, useState } from 'react';
import { usePermissions } from 'expo-media-library';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CaptionScreen, SelectScreen, TakeScreen } from 'screens/Upload';
import { RootStackScreenProps, UploadStackParamList } from 'types';
import { Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderBack } from '@components';

const Stack = createNativeStackNavigator<UploadStackParamList>();

export default function UploadNavigator({ navigation }: RootStackScreenProps<"Upload">) {
    const [status, requestPermission] = usePermissions();
    const [notCheck, setCheck] = useState(true);
    const checkAccess = async () => {
        if (Platform.OS === "ios") {
            if (status === null || status.accessPrivileges === "none" && status.canAskAgain) {
                const { granted } = await requestPermission();
                setCheck(!granted);
            } else if (status.accessPrivileges === "none" && !status.canAskAgain) {
                if (navigation.canGoBack()) {
                    navigation.goBack();
                } else {
                    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
                }
            } else if (status.accessPrivileges !== "none") {
                setCheck(false);
            }
        } else if (Platform.OS === "android") {
            //안드로이드의 경우 status obj의 형태가 다르다.
        }
    };

    useEffect(() => {
        checkAccess();
    }, [notCheck]);
    if (notCheck) {
        return null;
    }
    return (
        <Stack.Navigator initialRouteName="Select" screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Select" component={SelectScreen} options={{
                title: "사진 선택", headerLeft: () => <HeaderBack canGoBack={navigation.canGoBack()} goBack={navigation.goBack} />
            }} />
            {status?.accessPrivileges === "all" ? <Stack.Screen name="Take" component={TakeScreen} options={{ title: "사진 촬영" }} /> : null}
            <Stack.Screen name="Caption" component={CaptionScreen} options={{ title: "문구" }} />
        </Stack.Navigator>
    );
};
