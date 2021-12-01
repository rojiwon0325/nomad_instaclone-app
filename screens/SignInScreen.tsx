import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import { AuthStackParamList } from 'types';

export default function SignInScreen({ navigation }: NativeStackScreenProps<AuthStackParamList>) {


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.title}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>
    );
}

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