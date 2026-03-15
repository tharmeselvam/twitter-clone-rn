import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { colors } from "../colors"

interface ProfileImageProps {
    imageUri: string | null;
    style: StyleProp<ViewStyle>; 
}

const ProfileImage = ({ imageUri, style }: ProfileImageProps) => {
    return (
        <View style={[styles.profileImage, style]}>
            <Image
                style={styles.image}
                source={
                    imageUri
                        ? { uri: imageUri }
                        : require('../../assets/user-placeholder.png')
                }   
            />
        </View>
    )
}

export default ProfileImage

const styles = StyleSheet.create({
    profileImage: {
        backgroundColor: colors.gray250,
        aspectRatio: 1,
        borderRadius: 50,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
})