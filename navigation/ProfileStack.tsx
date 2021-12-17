import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ModalScreen } from '@screens';
import { HomeTabScreenProps, ProfileStackParamList, RootStackScreenProps } from 'types';
import { FollowingScreen, FollwerScreen, ProfileScreen } from 'screens/profile';
import { HeaderBack, Logo } from '@components';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { logout } from '@constants/ApolloClient';
import { GETME_QUERY } from '@constants/query/account';
import { useApolloClient } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { getMe } from '@Igql/getMe';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator({ navigation, route }: RootStackScreenProps<"Profile"> | HomeTabScreenProps<"MyProfile">) {
    const client = useApolloClient();
    const { getMe } = client.readQuery<getMe>({ query: GETME_QUERY }) ?? { getMe: null };

    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerBackTitleVisible: false }}>
            <Stack.Screen name="Main"
                component={ProfileScreen}
                options={{
                    headerLeft: () => route.name === "MyProfile"
                        ? <AccountWrap><Account>{getMe?.account}</Account></AccountWrap>
                        : <HeaderBack canGoBack={navigation.canGoBack()} goBack={navigation.goBack} />,
                    title: route.name === "MyProfile" ? "" : route.params?.params?.account,
                    headerRight: () => route.name === "MyProfile"
                        ? (<View style={{ flexDirection: "row", paddingHorizontal: 5 }}>
                            <Touch onPress={async () => {
                                await logout();
                                client.refetchQueries({
                                    include: [GETME_QUERY]
                                });
                            }}>
                                <Ion name="ellipsis-horizontal" size={25} />
                            </Touch>
                        </View>)
                        : null
                }} />
            < Stack.Screen name="Feed" component={ModalScreen} />
            <Stack.Screen name="Follower" component={FollwerScreen} />
            <Stack.Screen name="Following" component={FollowingScreen} />
        </Stack.Navigator >
    );
}

const AccountWrap = styled.TouchableOpacity`
`;

const Account = styled.Text`
    color:${({ theme }) => theme.dark ? "rgb(255,255,255)" : "rgb(0,0,0)"};
    font-size: 24px;
    font-weight: bold;
`;

const Touch = styled.TouchableOpacity`
    margin-left: 15px;
`;

const Ion = styled(Ionicons)`
    color: ${({ theme }) => theme.colors.text};
`;
