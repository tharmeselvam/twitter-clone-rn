import { StyleSheet, TextInput, View } from "react-native"
import { colors } from "../colors"
import Ionicons from "react-native-vector-icons/Ionicons"

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmitEditing: () => void;
}

const SearchBar = ({ value, onChangeText, onSubmitEditing }: SearchBarProps) => {
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Search Twitter"
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
            />
            
            <Ionicons 
                name="search-outline" size={20} color={colors.gray400} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        marginHorizontal: 16,
        paddingHorizontal: 18,
        paddingVertical: 2,
        backgroundColor: colors.gray200,
        borderRadius: 50,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
})