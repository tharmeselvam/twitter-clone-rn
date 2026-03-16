import { Pressable, StyleSheet, Text } from "react-native"
import { rootStyles } from "../styles"

interface CancelButtonProps {
    onPress: () => void
}

const CancelButton = ({ onPress }: CancelButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                pressed && rootStyles.buttonPressed,
            ]}
        >
            <Text style={styles.text}>Cancel</Text>
        </Pressable>
    )
}

export default CancelButton

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'normal'
    }
})