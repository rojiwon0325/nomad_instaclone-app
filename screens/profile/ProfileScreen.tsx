import { useQuery } from '@apollo/client';
import { SEEPROFILE_QUERY } from '@constants/query/account';
import { seeProfile } from '@Igql/seeProfile';
import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { ProfileStackScreenProps } from 'types';
import Presenter from './Presenter';

export default function ProfileScreen({ route }: ProfileStackScreenProps<"Main">) {
    const { params: { account } } = route;
    const { data } = useQuery<seeProfile>(SEEPROFILE_QUERY, { skip: account === "", variables: { account } });

    if (account === "") {
        Alert.alert("존재하지 않는 계정입니다.");
        return null;
    }

    if (!data) {
        return <ActivityIndicator />
    } else if (!data.seeProfile) {
        Alert.alert("존재하지 않는 계정입니다.");
        return null;
    }

    return (<Presenter seeProfile={data.seeProfile} />);
};
