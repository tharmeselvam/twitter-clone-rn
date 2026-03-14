import { FlatList, ListRenderItem } from "react-native"
import TweetListItem from "./TweetListItem"
import { Tweet } from "../../core/constants/types/Tweet";
import { Tabs } from "react-native-collapsible-tab-view";
import { useCallback } from "react";

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
        />
    )
}

export default ProfileTweetFeed