import { View } from "react-native"
import { rootStyles, tabBarStyleProps } from "../styles"
import { MaterialTabBar, Tabs, TabBarProps } from "react-native-collapsible-tab-view"
import ProfileHeader from "../components/ProfileHeader"
import ProfileTweetFeed from "../components/ProfileTweetFeed"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useEffect, useRef } from "react"
import { fetchProfileFeed, fetchProfileInfo } from "../../store/slices/profileSlice"
import { ProfileFeedType } from "../../core/constants/types/ProfileFeedType"
import { IndexChangeEventData } from "react-native-collapsible-tab-view/lib/typescript/src/types"

const ProfileScreen = () => {
    const { user, tweets, replies, likedTweets } = useSelector((state: RootState) => state.profile)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchProfileInfo())
        dispatch(fetchProfileFeed('tweets'))
    }, [dispatch])

    const fetchedTabs = useRef<Set<ProfileFeedType>>(new Set(['tweets']))

    const handleTabChange = ({ tabName }: IndexChangeEventData<string>) => {
        if (!fetchedTabs.current.has(tabName as ProfileFeedType)) {
            fetchedTabs.current.add(tabName as ProfileFeedType)
            dispatch(fetchProfileFeed(tabName as ProfileFeedType))
        }
    }

    if (!user.data) {
        //Handle error
        return null
    }

    const userData = user.data

    return (
        <View style={rootStyles.screenContainer}>

            {user.data &&
                <Tabs.Container
                    headerContainerStyle={{elevation: 0}}
                    renderHeader={() => <ProfileHeader user={userData} />}
                    onTabChange={handleTabChange}
                    renderTabBar={(props: TabBarProps) => (
                        <MaterialTabBar
                            {...props}
                            {...tabBarStyleProps}
                            style={rootStyles.tabBar}
                            labelStyle={rootStyles.tabBarLabel}
                        />
                    )}
                >
                    <Tabs.Tab name="tweets" label="Tweets">
                        <ProfileTweetFeed tweets={tweets.data} />
                    </Tabs.Tab>

                    <Tabs.Tab name="replies" label="Replies">
                        <ProfileTweetFeed tweets={replies.data} />
                    </Tabs.Tab>

                    <Tabs.Tab name="likedTweets" label="Likes">
                        <ProfileTweetFeed tweets={likedTweets.data} />
                    </Tabs.Tab>
                </Tabs.Container>
            }

        </View>
    )
}

export default ProfileScreen