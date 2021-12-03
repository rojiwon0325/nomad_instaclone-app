/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type AuthStackParamList = {
  Root: NavigatorScreenParams<RootStackParamList> | undefined;
  SignIn: { account: string, password: string } | undefined;
  SignUp: undefined;
  NotFound: undefined;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList> | undefined;
  Post: undefined;
  Profile: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type HomeTabParamList = {
  Main: undefined;
  MyProfile: undefined;
};

export type HomeTabScreenProps<Screen extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
