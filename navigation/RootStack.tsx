import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LikeScreen, ModalScreen } from '@screens';
import { AuthStackScreenProps, RootStackParamList } from 'types';
import HomeTabNavigator from './HomeTab';
import { useQuery } from '@apollo/client';
import { getMe } from '@Igql/getMe';
import { GETME_QUERY } from '@constants/query/account';
import ProfileNavigator from './ProfileStack';
import UploadNavigator from './UploadStack';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator({ navigation }: AuthStackScreenProps<"Root">) {
  const { data, loading } = useQuery<getMe>(GETME_QUERY);

  useEffect(() => {
    if (data?.getMe === null) {
      navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
    }
  }, [data?.getMe]);


  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeTabNavigator} />
      <Stack.Screen name="Profile" component={ProfileNavigator} options={{ headerShown: true }} />
      <Stack.Screen name="Upload" component={UploadNavigator} options={{ headerShown: false, animation: "none" }} />
      <Stack.Group screenOptions={{ presentation: "modal", headerShown: true }}>
        <Stack.Screen name="Like" component={LikeScreen} />
        <Stack.Screen name="Comment" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
