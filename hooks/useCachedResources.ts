import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isLogin, setLogin] = React.useState(false);
  const storage = useAsyncStorage('isLogin');

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
        const login = await storage.getItem();
        setLogin(login !== null);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return [isLoadingComplete, isLogin];
}
