import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { checkAuth } from "../store/slices/authSlice";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoggedIn, isLoading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <Stack.Navigator>
            {isLoggedIn ? (
                <Stack.Screen name="Main" component={} />
            ) : (
                <Stack.Screen name="LogIn" component={} />
            )}
        </Stack.Navigator>
    )
}