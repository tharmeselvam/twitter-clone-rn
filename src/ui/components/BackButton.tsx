import { Pressable, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { colors } from "../colors"

interface BackButtonProps {
    onPress: () => void;
}

const BackButton = ({ onPress }: BackButtonProps) => {
    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Ionicons name="arrow-back-outline" size={30} color={colors.black} />
        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({
    button: {
        padding: 6
    }
})