import { useQuery } from '@apollo/client';
import { GETME_QUERY, SEEPROFILE_QUERY } from '@constants/query/account';
import { getMe } from '@Igql/getMe';
import { seeProfile } from '@Igql/seeProfile';
import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { ProfileStackScreenProps } from 'types';
import Presenter from './Presenter';

export default function ProfileScreen({ route }: ProfileStackScreenProps<"Main">) {
    const { params } = route;

    const { data, refetch } = useQuery<seeProfile>(SEEPROFILE_QUERY, { skip: params === undefined, variables: { account: params?.account ?? "" } });
    const { data: MyData, refetch: refetchGetMe } = useQuery<getMe>(GETME_QUERY, { skip: params !== undefined });

    if (data?.seeProfile === null || MyData?.getMe === null) {
        Alert.alert("정보를 불러오는데 실패했습니다.");
        return null;
    }
    if (data?.seeProfile) {
        return (<Presenter seeProfile={data.seeProfile} refetch={refetch} />);
    } else if (MyData?.getMe) {
        return (<Presenter seeProfile={MyData.getMe} refetch={refetchGetMe} />);
    } else {
        return <ActivityIndicator />;
    }

};
