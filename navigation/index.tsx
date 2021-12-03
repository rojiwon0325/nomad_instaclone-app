import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import LinkingConfiguration from './LinkingConfiguration';
import AuthNavigator from './AuthStack';
import { DefaultTheme } from 'styled-components/native';
import { useSetRecoilState } from 'recoil';
import { isLogin } from '@constants/recoil';

export default function Navigation({ theme, isLogin: preLogin }: { theme: DefaultTheme, isLogin: boolean }) {
  const setLogin = useSetRecoilState(isLogin);
  useEffect(() => {
    setLogin(preLogin);
  }, []);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={theme}>
      <AuthNavigator isLogin={preLogin} />
    </NavigationContainer>
  );
}

/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */