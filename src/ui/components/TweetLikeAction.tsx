import { Pressable, StyleSheet, Text, View } from "react-native"
import IconButton from "./IconButton"
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../colors";
import { rootStyles } from "../styles";

interface TweetLikeActionProps {
    isLiked: boolean;
    countValue: number;
    onPress: () => void
}

const TweetLikeAction = ({ isLiked, countValue, onPress }: TweetLikeActionProps) => {
    return (
        <View style={rootStyles.tweetActionContainer}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    pressed && rootStyles.pressed
                ]}
            >
                {isLiked
                    ? <Ionicons name="heart" size={20} style={styles.isLiked} />
                    : <Ionicons name="heart-outline" size={20} style={rootStyles.tweetActionDefault} />
                }
            </Pressable>

            {countValue > 0 &&
                <Text
                    style={[
                        rootStyles.tweetActionCountValue,
                        isLiked ? styles.isLiked : rootStyles.tweetActionDefault
                    ]}
                >{countValue}</Text>
            }
        </View>
    )
}

export default TweetLikeAction

const styles = StyleSheet.create({
    isLiked: {
        color: colors.like
    },
})