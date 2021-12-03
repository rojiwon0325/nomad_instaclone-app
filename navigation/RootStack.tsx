import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ModalScreen } from '@screens';
import { RootStackParamList } from 'types';
import HomeTabNavigator from './HomeTab';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isLogin = useRecoilValue();
  useEffect(() => {

  }, []);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: true }} />
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