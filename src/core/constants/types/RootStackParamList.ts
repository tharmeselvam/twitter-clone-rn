import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type RootStackParamList = {
    LogIn: undefined;
    MainTabs: undefined;
    CreateTweet: undefined;
}

export type MainTabParamList = {
    Home: undefined;
    Search: undefined;
    Profile: undefined;
}

export type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>