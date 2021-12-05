import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LikeScreen, ModalScreen } from '@screens';
import { AuthStackScreenProps, RootStackParamList } from 'types';
import HomeTabNavigator from './HomeTab';
import { useQuery, useReactiveVar } from '@apollo/client';
import { getMe } from '@Igql/getMe';
import { GETME_QUERY } from '@constants/query/account';
import { jwToken, myData } from '@constants/ApolloClient';
import ProfileNavigator from './ProfileStack';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator({ navigation }: AuthStackScreenProps<"Root">) {
  const token = jwToken();
  const { data, loading } = useQuery<getMe>(GETME_QUERY, { skip: token === null });

  useEffect(() => {
    if (token === null || (data && data.getMe === null)) {
      console.log("token:", token);
      navigation.navigate("SignIn");
    }
    if (data?.getMe) {
      myData(data.getMe);
    }
  }, [token, data]);
  if (loading) {
    return null;
  }
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeTabNavigator} />
      <Stack.Group screenOptions={{ presentation: "card" }}>
        <Stack.Screen name="Like" component={LikeScreen} />
        <Stack.Screen name="Comment" component={ModalScreen} />
        <Stack.Screen name="Profile" component={ProfileNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */