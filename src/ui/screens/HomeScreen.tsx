import { FlatList, Text, View } from "react-native"
import TweetListItem from "../components/TweetListItem"
import { AppDispatch, RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchHomeFeed } from "../../store/slices/tweetsSlice"
import ListSeparator from "../components/ListSeparator"

const HomeScreen = () => {
    const { isLoading, data: tweets, error } = useSelector((state: RootState) => state.tweets.homeTweets)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchHomeFeed());
    }, [])
    
    return (
        <View>
            <FlatList
                data={tweets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TweetListItem tweet={item} />
                )}
                ItemSeparatorComponent={ListSeparator}
            />

            
        </View>
    )
}

export default HomeScreen