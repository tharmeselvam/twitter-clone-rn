import { StyleSheet, TextInput, View } from "react-native"
import { colors } from "../colors"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useRef, useState } from "react";
import CancelButton from "./CancelButton";

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    onSubmitEditing: () => void;
}

const SearchBar = ({ value, onChangeText, onSubmitEditing }: SearchBarProps) => {
    const [showCancelButton, setShowCancelButton] = useState(false)
    const inputRef = useRef<TextInput>(null)

    const handleBlur = () => {
        inputRef.current?.blur()
        setShowCancelButton(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Ionicons name="search-outline" size={20} color={colors.gray400} />

                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder="Search Twitter"
                    value={value}
                    onFocus={() => setShowCancelButton(true)}
                    onBlur={() => setShowCancelButton(false)}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                />
            </View>
            
            {showCancelButton &&
                <CancelButton onPress={handleBlur} />
            }
            
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 2,
        backgroundColor: colors.gray200,
        borderRadius: 50,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 5
    },
})