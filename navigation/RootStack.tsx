import React, { useEffect } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ModalScreen } from '@screens';
import { AuthStackParamList, RootStackParamList } from 'types';
import HomeTabNavigator from './HomeTab';
import { useQuery, useReactiveVar } from '@apollo/client';
import { getMe } from '@Igql/getMe';
import { GETME_QUERY } from '@constants/query/account';
import { jwToken } from '@constants/ApolloClient';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator({ navigation }: NativeStackScreenProps<AuthStackParamList, "Root">) {
  const token = useReactiveVar(jwToken);
  const { data, loading } = useQuery<getMe>(GETME_QUERY, { skip: token === null });
  useEffect(() => {
    if (token === null || (data && data.getMe === null)) {
      navigation.navigate("SignIn");
    }
    if (data?.getMe) {
      console.log(data.getMe);
    }
  }, [token, data]);
  if (loading) {
    return null;
  }
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeTabNavigator} />
      <Stack.Group screenOptions={{ presentation: 'card' }}>
        <Stack.Screen name="Post" component={ModalScreen} />
        <Stack.Screen name="Profile" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */