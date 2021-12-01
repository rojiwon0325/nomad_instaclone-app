import * as React from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTabParamList } from "types";
import { MainScreen, ProfileScreen } from '@screens';

const BottomTab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeTabNavigator() {
    const tabBarIcon = ({ color }: { color: string }) => <TabBarIcon name="code" color={color} />;
    return (
        <BottomTab.Navigator initialRouteName="Main">
            <BottomTab.Screen
                name="Main"
                component={MainScreen}
                options={{ title: 'Main', tabBarIcon, }}
            />
            <BottomTab.Screen
                name="MyProfile"
                component={ProfileScreen}
                options={{ title: 'Profile', tabBarIcon, }}
            />
        </BottomTab.Navigator>
    );
}
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */