import { View, FlatList, Text } from "react-native"
import TweetListItem from "./TweetListItem"
import { Tweet } from "../../core/constants/types/Tweet";

interface SearchResultsProps {
    tweets: Tweet[];
}

const SearchTweetsResults = ({ tweets }: SearchResultsProps) => {
    return (
        <View>
            <FlatList
                data={tweets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TweetListItem tweet={item} />
                )}
            />
        </View>
    )
}

export default SearchTweetsResults