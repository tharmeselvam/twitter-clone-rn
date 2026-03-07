import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";

import LogInScreen from "../ui/screens/LogInScreen";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    const { isLoggedIn, isLoading } = useSelector((state: RootState) => state.auth);

    return (
        <Stack.Navigator>
            {isLoggedIn ? (
                <Stack.Screen name="test" component={LogInScreen} />
            ) : (
                <Stack.Screen
                    name="LogIn"
                    component={LogInScreen}
                    options={{ headerShown: false }}
                />
            )}
        </Stack.Navigator>
    )
}