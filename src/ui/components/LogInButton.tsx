import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native"
import { colors } from "../colors";
import { rootStyles } from "../styles";

interface ButtonProps {
    isLoading: boolean;
    isDisabled?: boolean;
    onPress: () => void;
}

const LogInButton = ({ isLoading, isDisabled, onPress }: ButtonProps) => {
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.button,
                pressed && rootStyles.buttonPressed,
            ]} 
            onPress={onPress}
            disabled={isDisabled}
        >

            {isLoading
                ? <ActivityIndicator size={30} color={colors.white} />
                : <Text style={styles.label}>Log In</Text>
            }
            
        </Pressable>
    )
}

export default LogInButton

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        height: 60,
        borderRadius: 40,
        backgroundColor: colors.primary
    },
    label: {
        color: colors.white,
        fontWeight: '900',
        textAlign: "center",
        fontSize: 24,
    },
    loadingIndicator: {
        color: colors.white
    }
})