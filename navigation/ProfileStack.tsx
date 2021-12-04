import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ModalScreen, ProfileScreen } from '@screens';
import { ProfileStackParamList, RootStackScreenProps } from 'types';
import { useQuery, useReactiveVar } from '@apollo/client';
import { CHECKACCESS_QUERY } from '@constants/query/account';
import { checkAccess } from '@Igql/checkAccess';
import { ActivityIndicator } from 'react-native';


const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator({ navigation, route }: RootStackScreenProps<"Profile">) {
    const { params } = route;
    const account = params?.params?.account ?? "";
    const { data } = useQuery<checkAccess>(CHECKACCESS_QUERY, { skip: params === undefined, variables: { account } });

    if (data === undefined) {
        return <ActivityIndicator />;
    }

    if (!data.checkAccess) {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate("Home");
        }
    }
    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Main" component={ProfileScreen} />
            <Stack.Screen name="Follower" component={ModalScreen} />
            <Stack.Screen name="Following" component={ModalScreen} />
            <Stack.Screen name="Feed" component={ModalScreen} />
        </Stack.Navigator>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */