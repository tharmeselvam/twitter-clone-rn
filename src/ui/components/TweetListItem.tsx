import { Image, StyleSheet, Text, View } from "react-native"
import { Tweet } from "../../core/constants/types/Tweet"
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../colors";
import formatDate from "../../core/utils/formatDate";

interface TweetListItemProps {
    tweet: Tweet;
}

const TweetListItem: React.FC<TweetListItemProps> = ({ tweet }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image
                    source={require('../../assets/user-placeholder.png')}
                    style={styles.avatar}
                />
            </View>

            <View style={styles.rightContainer}>
                <View style={styles.headerContainer}>
                    <View style={styles.authorContainer}>
                        <Text style={styles.displayName}>{tweet.author.displayName}</Text>
                        <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
                            {tweet.author.username}
                        </Text>
                    </View>

                    <Text style={styles.date}>
                        {formatDate(tweet.createdAt)}
                    </Text>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.content}>{tweet.content}</Text>
                </View>

                <View style={styles.actionsContainer}>
                    <Ionicons name="chatbubble-outline" size={20} color="gray" />
                    <Ionicons name="repeat-outline" size={20} color="gray" />
                    <Ionicons name="heart-outline" size={20} color="gray" />
                    <Ionicons name="bookmark-outline" size={20} color="gray" />

                </View>
            </View>
        </View>
    )
}

export default TweetListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 2,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
    },
    leftContainer: {
        paddingTop: 4,
        width: 45,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: 'gray',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    },
    authorContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 8,
        minWidth: 0,
    },
    displayName: {
        fontWeight: 'bold',
        fontSize: 16,
        flexShrink: 0,
    },
    username: {
        fontWeight: 'normal',
        fontSize: 16,
        color: 'gray',
        flexShrink: 1,
        minWidth: 0,
    },
    date: {
        fontSize: 16,
        color: 'gray',
    },
    contentContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingVertical: 6,
    },
    content: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'normal',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 40,
        paddingVertical: 8,
    }
})