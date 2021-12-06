import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ModalScreen } from '@screens';
import { HomeTabScreenProps, MyProfileStackParamList } from 'types';
import { FollowingScreen, FollwerScreen, MyProfileScreen } from 'screens/profile';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<MyProfileStackParamList>();

export default function MyProfileNavigator({ navigation, route }: HomeTabScreenProps<"MyProfile">) {

    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MyProfileScreen} />
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