import React, { useEffect } from 'react';
import { usePermissions } from 'expo-media-library';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CaptionScreen, SelectScreen, TakeScreen } from 'screens/Upload';
import { RootStackScreenProps, UploadStackParamList } from 'types';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator<UploadStackParamList>();

export default function UploadNavigator({ navigation }: RootStackScreenProps<"Upload">) {
    const [status, requestPermission] = usePermissions();
    const checkAccess = async () => {
        if (Platform.OS === "ios") {
            if (status === null || status.accessPrivileges === "none" && status.canAskAgain) {
                await requestPermission();
            } else if (status.accessPrivileges === "none" && !status.canAskAgain) {
                if (navigation.canGoBack()) {
                    navigation.goBack();
                } else {
                    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
                }
            }
        } else if (Platform.OS === "android") {
            //안드로이드의 경우 status obj의 형태가 다르다.
        }
    };

    useEffect(() => {
        checkAccess();
    }, []);

    return (
        <Stack.Navigator initialRouteName="Select" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Select" component={SelectScreen} />
            {status?.accessPrivileges === "all" ? <Stack.Screen name="Take" component={TakeScreen} /> : null}
            <Stack.Screen name="Caption" component={CaptionScreen} />
        </Stack.Navigator>
    );
}