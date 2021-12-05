import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ModalScreen } from '@screens';
import { HomeTabScreenProps, ProfileStackParamList, RootStackScreenProps } from 'types';
import { FollowingScreen, FollwerScreen, MyProfileScreen, ProfileScreen } from 'screens/profile';
import styled from 'styled-components/native';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator({ navigation, route }: RootStackScreenProps<"Profile"> | HomeTabScreenProps<"MyProfile">) {

    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={{ presentation: "card", headerShown: route.name !== "MyProfile", headerLeft: () => <Btn onPress={() => navigation.goBack()} /> }}>
            <Stack.Screen name="Me" component={MyProfileScreen} />
            <Stack.Screen name="Main" component={ProfileScreen} />
            <Stack.Screen name="Follower" component={FollwerScreen} />
            <Stack.Screen name="Following" component={FollowingScreen} />
            <Stack.Screen name="Feed" component={ModalScreen} />
        </Stack.Navigator>
    );
}

const Btn = styled.TouchableOpacity`
    background-color: red;
    width: 100%;
    height: 40px;
`;

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */