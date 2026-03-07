import { FlatList, Text, View } from "react-native"
import { rootStyles } from "../styles"
import TweetListItem from "../components/TweetListItem"
import { AppDispatch, RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchHomeTweets } from "../../store/slices/homeSlice"

const HomeScreen = () => {
    const { tweets } = useSelector((state: RootState) => state.home)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchHomeTweets());
    }, [])
    
    return (
        <View style={rootStyles.screenContainer}>
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

export default HomeScreen