import { Pressable, StyleSheet, Text } from "react-native"
import { colors } from "../colors"

interface SmallFollowButtonProps {
    onPress: () => void;
}

const SmallFollowButton = ({ onPress }: SmallFollowButtonProps) => {
    return (
        <Pressable 
            style={styles.button} 
            onPress={onPress}
        >
            <Text style={styles.buttonText}>Follow</Text>
        </Pressable>
    )
}

export default SmallFollowButton

const styles = StyleSheet.create({
    button: {
        paddingVertical: 6,
        paddingHorizontal: 20,
        width: 110,
        borderRadius: 40,
        backgroundColor: colors.primary
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: "center",
        fontSize: 16,
    }
})