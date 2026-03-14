import { StyleSheet } from "react-native";
import { colors } from "./colors";


export const rootStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    tabBar: {
        backgroundColor: 'transparent',
        elevation: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
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