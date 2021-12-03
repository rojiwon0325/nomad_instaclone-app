import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LinkingConfiguration from './LinkingConfiguration';
import AuthNavigator from './AuthStack';
import { DefaultTheme } from 'styled-components/native';

export default function Navigation({ theme }: { theme: DefaultTheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={theme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}

/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */