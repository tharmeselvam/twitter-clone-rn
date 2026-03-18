import { View, FlatList, Text } from "react-native"
import TweetListItem from "./TweetListItem"
import { Tweet } from "../../core/constants/types/Tweet";
import ListSeparator from "./ListSeparator";

interface SearchResultsProps {
    tweets: Tweet[];
}

const SearchTweetsResults = ({ tweets }: SearchResultsProps) => {
    return (
        <FlatList
            data={tweets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TweetListItem tweet={item} />
            )}
            ItemSeparatorComponent={ListSeparator}
        />
    )
}

export default SearchTweetsResults