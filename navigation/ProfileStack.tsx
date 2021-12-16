import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ModalScreen } from '@screens';
import { HomeTabScreenProps, MyProfileStackParamList, ProfileStackParamList, RootStackScreenProps } from 'types';
import { FollowingScreen, FollwerScreen, MyProfileScreen, ProfileScreen } from 'screens/profile';
import { HeaderBack } from '@components';

const Stack = createNativeStackNavigator<ProfileStackParamList | MyProfileStackParamList>();

export default function ProfileNavigator({ navigation, route }: RootStackScreenProps<"Profile"> | HomeTabScreenProps<"MyProfile">) {

    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen name="Main"
                component={route.name === "Profile" ? ProfileScreen : MyProfileScreen}
                options={{
                    headerShown: route.name === "Profile",
                    headerLeft: () => <HeaderBack canGoBack={navigation.canGoBack()} goBack={navigation.goBack} />,
                    title: route.params?.params?.account
                }} />
            <Stack.Screen name="Feed" component={ModalScreen} />
            <Stack.Screen name="Follower" component={FollwerScreen} />
            <Stack.Screen name="Following" component={FollowingScreen} />
        </Stack.Navigator>
    );
}