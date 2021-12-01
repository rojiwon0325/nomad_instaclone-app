import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import LinkingConfiguration from './LinkingConfiguration';
import AuthNavigator from './AuthStack';
import { CustomTheme } from 'constants/theme';

export default function Navigation({ theme }: { theme: CustomTheme }) {
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