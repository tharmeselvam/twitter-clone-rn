import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { logIn } from "../../store/slices/authSlice";
import Toast from "react-native-toast-message";
import AuthTextField from "../components/AuthTextField";
import { rootStyles } from "../styles";
import Button from "../components/Button";
import { colors } from "../colors";

const LogInScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, errorMessage } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (errorMessage) {
            Toast.show({
                type: 'error',
                text1: errorMessage
            })
        }
    }, [errorMessage]);

    return (
        <View style={rootStyles.screenContainer}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../../assets/twitter-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>See what's happening in the world right now.</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.formFieldsContainer}>
                    <AuthTextField
                        placeholder="Email"
                        value={email}
                        secureTextEntry={false}
                        onChangeText={setEmail}
                    />
                    <AuthTextField
                        placeholder="Password"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />
                </View>

                <Button
                    title={isLoading ? "Logging in..." : "Log In"}
                    isDisabled={isLoading}
                    backgroundColor={colors.primary}
                    onPress={() => dispatch(logIn({ email, password }))}
                />
            </View>

        </View>
    );
}

export default LogInScreen;

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1.5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 50,
        marginHorizontal: 10,
    },
    logo: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        margin: 40,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 50,
    },
    formFieldsContainer: {
        marginBottom: 40,
    }
})