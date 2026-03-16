import TweetListItem from "./TweetListItem"
import { Tweet } from "../../core/constants/types/Tweet"
import { Tabs } from "react-native-collapsible-tab-view"
import ListSeparator from "./ListSeparator"

interface TweetFeedProps {
    tweets: Tweet[];
}

const ProfileTweetFeed = ({ tweets }: TweetFeedProps) => {
    return (
        <Tabs.FlatList
            data={tweets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <TweetListItem tweet={item} />
            )}
            ItemSeparatorComponent={ListSeparator}
        />
    )
}

export default ProfileTweetFeed