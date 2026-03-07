import { Text, View } from "react-native"
import { Tweet } from "../../core/constants/types/Tweet"

interface TweetListItemProps {
    tweet: Tweet;
}

const TweetListItem: React.FC<TweetListItemProps> = ({ tweet }) => {
    return (
        <View>
            <Text>{tweet.content}</Text>
        </View>
    )
}

export default TweetListItem