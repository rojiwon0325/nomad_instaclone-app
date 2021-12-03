import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen, SignUpScreen } from '@screens';
import { AuthStackParamList } from 'types';
import RootNavigator from './RootStack';
import { isLogin } from '@constants/ApolloClient';


const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const login = isLogin();
  return (
    <Stack.Navigator initialRouteName={login ? "Root" : "SignIn"} screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="Root" component={RootNavigator} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="NotFound" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ presentation: "card" }} />
    </Stack.Navigator>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */