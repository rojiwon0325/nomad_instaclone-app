import React from 'react';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTabParamList, RootStackScreenProps } from "types";
import { MainScreen, SearchScreen } from '@screens';
import { Avatar, Logo } from '@components';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/client';
import { getMe } from '@Igql/getMe';
import { GETME_QUERY } from '@constants/query/account';
import ProfileNavigator from './ProfileStack';
import { View } from 'react-native';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeTabNavigator({ navigation }: RootStackScreenProps<"Home">) {
    const { data } = useQuery<getMe>(GETME_QUERY);
    return (
        <Tab.Navigator initialRouteName="Main" screenOptions={{ tabBarShowLabel: false, headerTitle: () => null }}>
            <Tab.Screen
                name="Main"
                component={MainScreen}
                options={{ headerLeft: () => <LogoWrap><Logo /></LogoWrap>, headerRightContainerStyle: { paddingRight: 15 }, headerRight: () => <Touch onPress={() => navigation.navigate("DC")}><Plane name="paper-plane-outline" size={25} /></Touch>, tabBarIcon: (props) => <TabBarIcon name='home' props={props} /> }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{ tabBarIcon: (props) => <TabBarIcon name='search' props={props} /> }}
            />
            <Tab.Screen
                name="UploadFake"
                component={View}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate("Upload");
                    }
                }}
                options={{ tabBarIcon: ({ focused, color, size }) => <FontAwesome name={focused ? "plus-square" : "plus-square-o"} color={color} size={size} /> }}
            />
            <Tab.Screen
                name="MyProfile"
                component={ProfileNavigator}
                options={{ headerShown: true, headerLeft: () => <LogoWrap><Logo /></LogoWrap>, headerRightContainerStyle: { paddingRight: 15 }, headerRight: () => <Plane name="paper-plane-outline" size={25} />, tabBarIcon: (props) => data?.getMe ? <TabWrap><Avatar avatarUrl={data.getMe.avatarUrl} /></TabWrap> : <TabBarIcon name='person' props={props} /> }}
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
    align-items: center;
    justify-content: center;
`;
const TabWrap = styled.View`
    width: 80%;
    height: 60%;
    align-items: center;
    justify-content: center;
`;
const Touch = styled.TouchableOpacity``;

const Plane = styled(Ionicons)`
    color: ${({ theme }) => theme.colors.text};
`;
