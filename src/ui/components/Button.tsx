import { Pressable, StyleSheet, Text } from "react-native"
import { colors } from "../colors";

interface ButtonProps {
    title: string;
    isDisabled?: boolean;
    backgroundColor?: string;
    onPress: () => void;
}

const Button = ({ title, isDisabled, onPress, backgroundColor }: ButtonProps) => {
    return (
        <Pressable 
            style={[styles.button, { backgroundColor }]} 
            onPress={onPress}
            disabled={isDisabled}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        padding: 14,
        borderRadius: 40,
        margin: 10,
    },
    buttonText: {
        color: colors.white,
        fontWeight: '900',
        textAlign: "center",
        fontSize: 22,
    }
})