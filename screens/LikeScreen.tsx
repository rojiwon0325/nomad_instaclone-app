import React from 'react';
import { View } from 'react-native';
import { RootStackScreenProps } from 'types';

export default function LikeScreen({ navigation, route }: RootStackScreenProps<"Like">) {
    const { params } = route;
    console.log(params);

    return (
        <View >

        </View>
    );
}
