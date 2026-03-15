import { View } from "react-native"
import { rootStyles, tabBarStyleProps } from "../styles"
import { MaterialTabBar, Tabs, TabBarProps } from "react-native-collapsible-tab-view"
import ProfileHeader from "../components/ProfileHeader"
import ProfileTweetFeed from "../components/ProfileTweetFeed"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useEffect, useRef } from "react"
import { fetchOwnProfileInfo } from "../../store/slices/usersSlice"
import { ProfileFeedType } from "../../core/constants/types/ProfileFeedType"
import { IndexChangeEventData } from "react-native-collapsible-tab-view/lib/typescript/src/types"
import { fetchProfileFeed } from "../../store/slices/tweetsSlice"

const ProfileScreen = () => {
    const { isLoading, data: currentUserData, error } = useSelector((state: RootState) => state.users.currentUser)
    const { profileTweets, profileReplies, profileLikes } = useSelector((state: RootState) => state.tweets)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchOwnProfileInfo())
        dispatch(fetchProfileFeed('profileTweets'))
    }, [dispatch])

    const fetchedTabs = useRef<Set<ProfileFeedType>>(new Set(['profileTweets']))

    const handleTabChange = ({ tabName }: IndexChangeEventData<string>) => {
        if (!fetchedTabs.current.has(tabName as ProfileFeedType)) {
            fetchedTabs.current.add(tabName as ProfileFeedType)
            dispatch(fetchProfileFeed(tabName as ProfileFeedType))
        }
    }

    if (!currentUserData) {
        //Handle error
        return null
    }

    const userData = currentUserData

    return (
        <View style={rootStyles.screenContainer}>

            {userData &&
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
                    <Tabs.Tab name="profileTweets" label="Tweets">
                        <ProfileTweetFeed tweets={profileTweets.data} />
                    </Tabs.Tab>

                    <Tabs.Tab name="profileReplies" label="Replies">
                        <ProfileTweetFeed tweets={profileReplies.data} />
                    </Tabs.Tab>

                    <Tabs.Tab name="profileLikes" label="Likes">
                        <ProfileTweetFeed tweets={profileLikes.data} />
                    </Tabs.Tab>
                </Tabs.Container>
            }

        </View>
    )
}

export default ProfileScreen