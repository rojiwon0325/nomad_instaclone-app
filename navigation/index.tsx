import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import LinkingConfiguration from './LinkingConfiguration';
import AuthNavigator from './AuthStack';
import { DefaultTheme } from 'styled-components/native';

export default function Navigation({ theme, isLogin }: { theme: DefaultTheme, isLogin: boolean }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={theme}>
      <AuthNavigator isLogin={isLogin} />
    </NavigationContainer>
  );
}

/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */