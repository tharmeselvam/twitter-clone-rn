import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { logIn } from "../../store/slices/authSlice";
import Toast from "react-native-toast-message";
import AuthTextField from "../components/AuthTextField";
import { rootStyles } from "../styles";
import LogInButton from "../components/LogInButton";
import { colors } from "../colors";
import { SafeAreaView } from "react-native-safe-area-context";

const LogInScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, errorMessage } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrorMessage, setValidationErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const error = validationErrorMessage ?? errorMessage
        if (error) {
            Toast.show({
                type: 'error',
                text1: error,
            })
        }
    }, [errorMessage, validationErrorMessage]);

    const validateForm = (): boolean => {
        if (email.length === 0) {
            setValidationErrorMessage("Email cannot be empty.");
            return false;
        }
        if (password.length === 0) {
            setValidationErrorMessage("Password cannot be empty.");
            return false;
        }
        setValidationErrorMessage(null);
        return true;
    };

    const handleLogIn = () => {
        if (!validateForm()) return;

        dispatch(logIn({ email, password }));
    };

    return (
        <SafeAreaView style={[rootStyles.screenContainer, styles.container]}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../../assets/twitter-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>See what's happening in the world right now.</Text>
                </View>

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

                <LogInButton
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    onPress={handleLogIn}
                />
            </View>

        </SafeAreaView>
    );
}

export default LogInScreen;

const styles = StyleSheet.create({
    container: {
        padding: 26,
        gap: 20,
    },
    headerContainer: {
        flex: 1.3,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        //backgroundColor: 'blue'
    },
    logo: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        //backgroundColor: 'red'
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        //backgroundColor: 'gray'
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    formContainer: {
        //backgroundColor: 'red',
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        gap: 50,
        paddingBottom: 50,
    },
    formFieldsContainer: {
        marginBottom: 40,
        gap: 20,
    }
})