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

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  Screen
>;

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList> | undefined;
  Like: { id: number };
  Comment: { postId: number };
  Profile: NavigatorScreenParams<ProfileStackParamList> | undefined;
  Upload: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type HomeTabParamList = {
  Main: undefined;
  Search: undefined;
  UploadFake: undefined;
  MyProfile: NavigatorScreenParams<MyProfileStackParamList> | undefined;
};

export type HomeTabScreenProps<Screen extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProfileStackParamList = {
  Main: { account: string };
  Follower: { account: string };
  Following: { account: string };
  Feed: { account: string, initialScrollIndex?: number };
};

export type ProfileStackScreenProps<Screen extends keyof ProfileStackParamList> = NativeStackScreenProps<
  ProfileStackParamList,
  Screen
>;

export type MyProfileStackParamList = {
  Main: undefined;
  Follower: { account: string };
  Following: { account: string };
  Feed: { account: string, initialScrollIndex?: number };
};

export type MyProfileStackScreenProps<Screen extends keyof MyProfileStackParamList> = NativeStackScreenProps<
  MyProfileStackParamList,
  Screen
>;


export type UploadStackParamList = {
  Select: undefined;
  Take: undefined;
  Caption: { photos: string[] };
};

export type UploadStackScreenProps<Screen extends keyof UploadStackParamList> = NativeStackScreenProps<
  UploadStackParamList,
  Screen
>;