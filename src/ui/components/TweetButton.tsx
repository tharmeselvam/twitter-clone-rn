import { Pressable, StyleSheet, Text } from "react-native"
import { colors } from "../colors";

interface TweetButtonProps {
    isDisabled: boolean;
    onPress: () => void;
}

const TweetButton = ({ onPress, isDisabled }: TweetButtonProps) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                isDisabled && styles.disabled
            ]}
            disabled={isDisabled}
            onPress={onPress}
        >
            <Text style={styles.label}>Tweet</Text>
        </Pressable>
    )
}

export default TweetButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    pressed: {
        opacity: 0.8,
    },
    disabled: {
        opacity: 0.5,
    },
    label: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    }
})