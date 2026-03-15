import { Pressable, StyleSheet, Text } from "react-native"
import { colors } from "../colors";

interface TweetButtonProps {
    onPress: () => void;
}

const TweetButton = ({ onPress }: TweetButtonProps) => {
    return (
        <Pressable
            style={styles.button}
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
        paddingHorizontal: 16
    },
    label: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16
    }
})