import { StyleSheet, View } from "react-native";
import { colors } from "../colors";

const ListSeparator = () => {
    return (
        <View style={styles.separator} />
    );
}

export default ListSeparator;

const styles = StyleSheet.create({
    separator: {
        height: 0.5,
        backgroundColor: colors.gray300,
    },
}) 