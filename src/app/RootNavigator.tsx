import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogInScreen from "../ui/screens/LogInScreen";
import HomeScreen from "../ui/screens/HomeScreen";
import ProfileScreen from "../ui/screens/ProfileScreen";
import SearchScreen from "../ui/screens/SearchScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../ui/colors";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.gray400,
                tabBarIcon: ({ focused, color, size }) => {
                    const icons: Record<string, {focused: string; unfocused: string}> = {
                        Home: { focused: 'home', unfocused: 'home-outline' },
                        Search: { focused: 'search', unfocused: 'search-outline' },
                        Profile: { focused: 'person-circle', unfocused: 'person-circle-outline' }
                    };
                    const icon = icons[route.name];
                    return <Ionicons name={focused ? icon.focused : icon.unfocused} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export const RootNavigator = () => {
    const { isLoggedIn, isLoading } = useSelector((state: RootState) => state.auth);

    return (
        <Stack.Navigator>
            {isLoggedIn ? (
                <Stack.Screen
                    name="MainTabs"
                    component={MainTabs}
                    options={{ headerShown: false }}
                />
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