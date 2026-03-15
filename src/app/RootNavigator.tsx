import React from "react";
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogInScreen from "../ui/screens/LogInScreen";
import HomeScreen from "../ui/screens/HomeScreen";
import ProfileScreen from "../ui/screens/ProfileScreen";
import SearchScreen from "../ui/screens/SearchScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../ui/colors";
import { Image, StyleSheet, View } from "react-native";
import { FAB } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MainTabParamList, RootStackParamList } from "../core/constants/types/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import CreateTweetScreen from "../ui/screens/CreateTweetScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<MainTabParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'MainTabs'>

const MainTabs = ({ navigation }: Props) => {
    const insets = useSafeAreaInsets()
    const NAV_BAR_HEIGHT = 49

    const fabBottom = insets.bottom + NAV_BAR_HEIGHT + 16

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.gray400,
                    tabBarIcon: ({ focused, color, size }) => {
                        const icons: Record<string, { focused: string; unfocused: string }> = {
                            Home: { focused: 'home', unfocused: 'home-outline' },
                            Search: { focused: 'search', unfocused: 'search-outline' },
                            Profile: { focused: 'person-circle', unfocused: 'person-circle-outline' }
                        };
                        const icon = icons[route.name];
                        return <Ionicons name={focused ? icon.focused : icon.unfocused} size={size} color={color} />;
                    }
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerTitle: () => (
                            <Image
                                source={require('../assets/twitter-logo.png')}
                                style={styles.headerLogo}
                                resizeMode="contain"
                            />
                        )
                    }}
                />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>

            <FAB
                placement='right'
                color={colors.primary}
                icon={{ name: 'add', color: colors.white }}
                style={[styles.fab, {bottom: fabBottom}]}
                onPress={() => navigation.navigate('CreateTweet')}
            />
        </View>
    )
}

export const RootNavigator = () => {
    const { isLoggedIn, isLoading } = useSelector((state: RootState) => state.auth);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

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
            <Stack.Screen
                name="CreateTweet"
                component={CreateTweetScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerLogo: {
        width: 30,
        height: 30,
    },
    fab: {
        position: 'absolute',
    }
})