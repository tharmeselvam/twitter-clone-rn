import { StyleSheet } from "react-native";
import { colors } from "./colors";


export const rootStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    tabBar: {
        backgroundColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray300,
        marginHorizontal: 0
    },
    tabBarIndicator: {
        backgroundColor: colors.primary,
        height: 4,
        borderRadius: 50
    },
    tabBarLabel: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export const tabBarStyleProps = {
    indicatorStyle: rootStyles.tabBarIndicator,
    activeColor: colors.black,
    inactiveColor: colors.gray600
}