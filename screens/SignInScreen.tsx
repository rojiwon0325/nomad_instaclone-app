import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { AuthStackParamList } from 'types';
import styled from 'styled-components/native';

export default function SignInScreen({ navigation }: NativeStackScreenProps<AuthStackParamList>) {


    return (
        <View style={styles.container}>
            <Logo resizeMode="contain" source={require("../assets/images/logo_dark.png")} />
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.title}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
        </View>
    );
}
const Logo = styled.Image`
    width: 100%;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});