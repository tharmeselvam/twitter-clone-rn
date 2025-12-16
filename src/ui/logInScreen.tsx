import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logIn } from "../store/slices/authSlice";
import Toast from "react-native-toast-message";

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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                secureTextEntry={ true }
            />

            <Button 
                title="Log In"
                onPress={() => dispatch(logIn({ email, password }))}
            />        
        </View>
    );
}

export default LogInScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, fontSize: 15, margin: 10 },
})