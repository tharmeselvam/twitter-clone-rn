import { StyleSheet, TextInput } from "react-native"
import { colors } from "../colors";

interface AuthTextFieldProps {
    placeholder: string;
    value: string;
    secureTextEntry?: boolean;
    onChangeText: (text: string) => void;
}

const AuthTextField = ({ placeholder, value, secureTextEntry, onChangeText }: AuthTextFieldProps) => {
    return (
        <TextInput 
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            autoCapitalize="none"
            secureTextEntry={secureTextEntry}
        />
    )
}

export default AuthTextField

const styles = StyleSheet.create({
    input: { 
        borderWidth: 1, 
        borderColor: colors.primary, 
        borderRadius: 40,
        paddingVertical: 14,
        paddingHorizontal: 20, 
        fontSize: 15, 
        //margin: 10 
    },
})