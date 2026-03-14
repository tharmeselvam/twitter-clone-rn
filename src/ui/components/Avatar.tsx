import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { colors } from "../colors"

interface AvatarProps {
    imageUri?: string;
    style: StyleProp<ViewStyle>; 
}

const Avatar = ({ imageUri, style }: AvatarProps) => {
    return (
        <View style={[styles.avatar, style]}>
            <Image
                style={styles.avatarImage}
                source={
                    require('../../assets/user-placeholder.png')
                }   
            />
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
        backgroundColor: colors.gray200,
        width: 100,
        aspectRatio: 1,
        borderRadius: 50,
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
})