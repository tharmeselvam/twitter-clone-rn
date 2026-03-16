import { Pressable, StyleSheet, Text, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons";
import { rootStyles } from "../styles";

interface TweetReplyActionProps {
    countValue: number;
    onPress: () => void;
}

const TweetReplyAction = ({ countValue, onPress }: TweetReplyActionProps) => {
    return (
        <View style={rootStyles.tweetActionContainer}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    pressed && rootStyles.buttonPressed
                ]}
            >
                <Ionicons name="chatbubble-outline" size={18} style={rootStyles.tweetActionDefault} />
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

export default TweetReplyAction
