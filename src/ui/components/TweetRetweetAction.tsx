import { Pressable, Text, View } from "react-native"
import { rootStyles } from "../styles"
import Ionicons from "react-native-vector-icons/Ionicons"

interface TweetRetweetActionProps {
    countValue: number;
    onPress: () => void;
}

const TweetRetweetAction = ({ countValue, onPress }: TweetRetweetActionProps) => {
    return (
        <View style={rootStyles.tweetActionContainer}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    pressed && rootStyles.buttonPressed
                ]}
            >
                <Ionicons name="repeat-outline" size={18} style={rootStyles.tweetActionDefault} />
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

export default TweetRetweetAction