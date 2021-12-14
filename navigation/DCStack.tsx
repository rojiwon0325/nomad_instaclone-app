import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { DCStackParamList, RootStackScreenProps } from 'types';
import { RoomsScreen } from 'screens/DC';

const Stack = createNativeStackNavigator<DCStackParamList>();

export default function DCNavigator({ navigation }: RootStackScreenProps<"DC">) {

    return (
        <Stack.Navigator initialRouteName="Rooms" screenOptions={{ headerShown: true, headerBackTitleVisible: false }}>
            <Stack.Screen name="Rooms" component={RoomsScreen} />
            <Stack.Screen name="Chat" component={RoomsScreen} />
        </Stack.Navigator>
    );
}
