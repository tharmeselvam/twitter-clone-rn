import { rootStyles } from "../styles"
import { SafeAreaView } from "react-native-safe-area-context"
import SearchBar from "../components/SearchBar"
import { NavigationState, SceneRendererProps, TabBar, TabView } from "react-native-tab-view"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { fetchSearchedTweets, fetchSearchedUsers, resetSearch, setHasSearced, setQuery } from "../../store/slices/searchSlice"
import { StyleSheet, useWindowDimensions, View } from "react-native"
import { useState } from "react"
import { TabRoute } from "../../core/constants/types/SearchTabRoute"
import { colors } from "../colors"
import SearchTweetsResults from "../components/SearchTweetsResults"
import SearchUsersResults from "../components/SearchUsersResults"
import BackButton from "../components/BackButton"


const SearchScreen = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { query, hasSearched, tweetsResults, usersResults } = useSelector((state: RootState) => state.search)

    const layout = useWindowDimensions()
    const [index, setIndex] = useState<number>(0)

    const handleSearch = () => {
        if (query.trim() === '') return

        dispatch(resetSearch())
        dispatch(setHasSearced(true))
        if (index === 0) {
            dispatch(fetchSearchedTweets(query))
        } else {
            dispatch(fetchSearchedUsers(query))
        }
    }

    const handleTabSwitch = (index: number) => {
        setIndex(index)

        if (index === 0 && tweetsResults.status === 'inactive') {
            dispatch(fetchSearchedTweets(query))
        } else if (index === 1 && usersResults.status === 'inactive') {
            dispatch(fetchSearchedUsers(query))
        }
    }

    const routes: TabRoute[] = [
        { key: 'tweets', title: 'Tweets' },
        { key: 'people', title: 'People' },
    ]

    const renderScene = ({ route }: SceneRendererProps & { route: TabRoute }) => {
        switch (route.key) {
            case 'tweets':
                return <SearchTweetsResults tweets={tweetsResults.data} />

            case 'people':
                return <SearchUsersResults users={usersResults.data} />
        }
    }

    const renderTabBar = (props: SceneRendererProps & { navigationState: NavigationState<TabRoute> }) => (
        <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
            activeColor={colors.black}
            inactiveColor={colors.gray600}
            options={{
                'tweets': { labelStyle: styles.label },
                'people': { labelStyle: styles.label }
            }}
        />
    )

    return (
        <SafeAreaView style={rootStyles.screenContainer}>
            <View style={[styles.header, !hasSearched ? {paddingLeft: 16} : null]}>
                {hasSearched &&
                    <BackButton onPress={() => {
                        dispatch(resetSearch())
                        dispatch(setHasSearced(false))
                    }}
                    />
                }

                <SearchBar
                    value={query}
                    onChangeText={(text) => dispatch(setQuery(text))}
                    onSubmitEditing={handleSearch}
                />
            </View>


            {hasSearched &&
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={handleTabSwitch}
                    renderTabBar={renderTabBar}
                    initialLayout={{ width: layout.width }}

                />
            }

        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingRight: 16,
    },
    tabBar: {
        backgroundColor: 'transparent',
        elevation: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.gray300,
        marginHorizontal: 0
    },
    indicator: {
        backgroundColor: colors.primary,
        height: 4,
        borderRadius: 50
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})