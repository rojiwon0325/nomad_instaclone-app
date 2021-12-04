import React from 'react';
import { View } from 'react-native';
import { RootStackScreenProps } from 'types';

export default function ProfileScreen({ navigation, route }: RootStackScreenProps<"Comment">) {
    const { params } = route;
    console.log(params);

    return (
        <View>

        </View>
    );
}
