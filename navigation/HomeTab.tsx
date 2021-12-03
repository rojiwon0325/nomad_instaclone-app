import * as React from 'react';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTabParamList, RootStackScreenProps } from "types";
import { MainScreen, ProfileScreen } from '@screens';
import { Logo } from '@components';
import styled from 'styled-components/native';
import { logout } from '@constants/ApolloClient';
import Avatar from 'components/Avatar';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeTabNavigator({ navigation }: RootStackScreenProps<"Home">) {
    return (
        <Tab.Navigator initialRouteName="Main" screenOptions={{ tabBarShowLabel: false, headerTitle: () => null }}>
            <Tab.Screen
                name="Main"
                component={MainScreen}
                options={{ headerRightContainerStyle: { paddingRight: 10 }, headerRight: () => <Avatar onPress={logout} avatarUrl={""} />, headerLeft: () => <LogoWrap><Logo /></LogoWrap>, tabBarIcon: (props) => <TabBarIcon name='home' props={props} /> }}
            />
            <Tab.Screen
                name="Search"
                component={MainScreen}
                options={{ title: 'Search', tabBarIcon: (props) => <TabBarIcon name='search' props={props} /> }}
            />
            <Tab.Screen
                name="NewPost"
                component={MainScreen}
                options={{ title: 'New Post', headerShown: false, tabBarIcon: ({ focused, color, size }) => <FontAwesome name={focused ? "plus-square" : "plus-square-o"} color={color} size={size} /> }}
            />
            <Tab.Screen
                name="MyProfile"
                component={ProfileScreen}
                options={{ title: 'Profile', tabBarIcon: (props) => <TabBarIcon name='person' props={props} /> }}
            />
        </Tab.Navigator>
    );
}
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const TabBarIcon = ({ name, props }: { name: 'home' | 'search' | 'person' | 'md-add', props: { focused: boolean, color: string, size: number } }) =>
    <Ionicons name={props.focused ? `${name}` : `${name}-outline`} color={props.color} size={props.size} />;
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

const LogoWrap = styled.View`
    width: 80%;
    height: 100%;
`;