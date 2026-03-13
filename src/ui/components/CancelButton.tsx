import { Pressable, StyleSheet, Text } from "react-native"

interface CancelButtonProps {
    onPress: () => void
}

const CancelButton = ({ onPress }: CancelButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
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