import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { AuthStackParamList } from 'types';

const linking: LinkingOptions<AuthStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Main: 'homemain',
              Search: 'search',
              MyProfile: 'myprofile',
            },
          },
          Like: 'like',
          Comment: 'comment',
          Profile: {
            screens: {
              Main: "profilemain",
              Follower: "follower",
              Following: "following",
              Feed: "feed"
            }
          },
        }
      },
      SignIn: 'signin',
      SignUp: 'signup',
      NotFound: '*',
    },
  },
};

export default linking;

/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */
