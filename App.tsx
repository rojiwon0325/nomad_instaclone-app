import Providers from 'components/Providers';
import { DarkTheme, LightTheme } from 'constants/theme';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const [isLoadingComplete, isLogin] = useCachedResources();
  const isDark = useColorScheme() === "dark";

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Providers>
          <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
            <Navigation theme={isDark ? DarkTheme : LightTheme} isLogin={isLogin} />
            <StatusBar />
          </ThemeProvider>
        </Providers>
      </SafeAreaProvider>
    );
  }
};
