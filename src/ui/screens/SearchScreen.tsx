import { rootStyles } from "../styles"
import { SafeAreaView } from "react-native-safe-area-context"
import SearchBar from "../components/SearchBar"
import { NavigationState, SceneRendererProps, TabBar, TabView } from "react-native-tab-view"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { fetchSearchedTweets, setQuery } from "../../store/slices/searchSlice"
import { StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { useState } from "react"
import { TabRoute } from "../../core/constants/types/SearchTabRoute"
import { colors } from "../colors"
import SearchTweetsResults from "../components/SearchTweetsResults"


const SearchScreen = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { query, tweets } = useSelector((state: RootState) => state.search)

    const layout = useWindowDimensions()
    const [index, setIndex] = useState<number>(0)

    const handleSearch = () => {
        if (query === '') return

        dispatch(fetchSearchedTweets(query))
    }

    const routes: TabRoute[] = [
        { key: 'tweets', title: 'Tweets' },
        { key: 'people', title: 'People' },
    ]

    const renderScene = ({ route }: SceneRendererProps & { route: TabRoute }) => {
        switch (route.key){
            case 'tweets':
                return <SearchTweetsResults tweets={tweets}/>

            case 'people':
                return <View />
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
                'tweets': { labelStyle: styles.label},
                'people': { labelStyle: styles.label}
            }}
        />
    )

    return (
        <SafeAreaView style={rootStyles.screenContainer}>
            <SearchBar
                value={query}
                onChangeText={(text) => dispatch(setQuery(text))}
                onSubmitEditing={handleSearch}
            />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={{ width: layout.width }}
                
            />
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
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