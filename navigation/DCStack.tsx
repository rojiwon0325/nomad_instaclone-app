import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DCStackParamList, RootStackScreenProps } from 'types';
import { ChatScreen, RoomsScreen } from 'screens/DC';
import { HeaderBack } from '@components';

const Stack = createNativeStackNavigator<DCStackParamList>();

export default function DCNavigator({ navigation }: RootStackScreenProps<"DC">) {

    return (
        <Stack.Navigator initialRouteName="Rooms" screenOptions={{ headerShown: true, headerBackTitleVisible: false }}>
            <Stack.Screen name="Rooms" component={RoomsScreen} options={{
                headerLeft: () => <HeaderBack canGoBack={navigation.canGoBack()} goBack={navigation.goBack} />
            }} />
            <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
    );
}
