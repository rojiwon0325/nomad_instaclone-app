import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ModalScreen } from '@screens';
import { HomeTabScreenProps, MyProfileStackParamList, ProfileStackParamList, RootStackScreenProps } from 'types';
import { FollowingScreen, FollwerScreen, MyProfileScreen, ProfileScreen } from 'screens/profile';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<ProfileStackParamList | MyProfileStackParamList>();

export default function ProfileNavigator({ navigation, route }: RootStackScreenProps<"Profile"> | HomeTabScreenProps<"MyProfile">) {

    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={route.name === "Profile" ? ProfileScreen : MyProfileScreen} />
            <Stack.Screen name="Feed" component={ModalScreen} />
            <Stack.Group screenOptions={{ presentation: "modal", headerShown: true }}>
                <Stack.Screen name="Follower" component={FollwerScreen} />
                <Stack.Screen name="Following" component={FollowingScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

const Touch = styled.TouchableOpacity`
`;

const Plane = styled(Ionicons)`
    color: ${({ theme }) => theme.colors.text};
`;