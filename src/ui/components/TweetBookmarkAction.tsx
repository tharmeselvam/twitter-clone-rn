import { Pressable, Text, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { rootStyles } from "../styles"

interface TweetBookmarkActionProps {
    countValue: number;
    onPress: () => void;
}

const TweetBookmarkAction = ({ countValue, onPress }: TweetBookmarkActionProps) => {
    return (
        <View style={rootStyles.tweetActionContainer}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    pressed && rootStyles.pressed
                ]}
            >
                <Ionicons name="bookmark-outline" size={18} style={rootStyles.tweetActionDefault} />
            </Pressable>

            {countValue > 0 &&
                <Text
                    style={[
                        rootStyles.tweetActionCountValue,
                        rootStyles.tweetActionDefault,
                    ]}
                >{countValue}</Text>
            }
        </View>
    )
}

export default TweetBookmarkAction