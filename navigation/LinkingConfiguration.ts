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
              MyProfile: {
                screens: {
                  Main: "profile",
                  Follower: "follower",
                  Following: "following",
                  Feed: "feed"
                }
              }
            }
          },
          Like: 'like',
          Comment: 'comment',
          DC: {
            screens: {
              Rooms: "rooms",
              Chat: "chat"
            }
          },
          Upload: {
            screens: {
              Select: "select",
              Take: "take",
              Caption: "caption",
            }
          },
          Profile: {
            screens: {
              Main: "profile",
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
