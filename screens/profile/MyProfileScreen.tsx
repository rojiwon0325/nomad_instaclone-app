import { useQuery } from '@apollo/client';
import { GETME_QUERY } from '@constants/query/account';
import { getMe } from '@Igql/getMe';
import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { HomeTabScreenProps } from 'types';
import Presenter from './Presenter';

export default function ProfileScreen({ }: HomeTabScreenProps<"MyProfile">) {
    const { data, refetch } = useQuery<getMe>(GETME_QUERY);

    if (!data) {
        return <ActivityIndicator />
    } else if (!data.getMe) {
        Alert.alert("정보를 불러오지 못했습니다.");
        return null;
    }

    return (<Presenter seeProfile={data.getMe} refetch={refetch} />);
};
