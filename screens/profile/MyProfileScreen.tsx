import { useQuery } from '@apollo/client';
import { UserList } from '@components';
import { GETME_QUERY } from '@constants/query/account';
import { getMe } from '@Igql/getMe';
import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { ProfileStackScreenProps } from 'types';
import Presenter from './Presenter';

export default function ProfileScreen({ route }: ProfileStackScreenProps<"Me">) {
    const { data } = useQuery<getMe>(GETME_QUERY);

    if (!data) {
        return <ActivityIndicator />
    } else if (!data.getMe) {
        Alert.alert("정보를 불러오지 못했습니다.");
        return null;
    }

    return (<Presenter seeProfile={data.getMe} />);
};
