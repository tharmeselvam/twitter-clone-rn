import { StyleSheet, Text, View } from "react-native"
import { Tweet } from "../../core/constants/types/Tweet"
import { colors } from "../colors";
import formatDate from "../../core/utils/formatDate";
import ProfileImage from "./ProfileImage";
import TweetLikeAction from "./TweetLikeAction";
import TweetReplyAction from "./TweetReplyAction";
import TweetRetweetAction from "./TweetRetweetAction";
import TweetBookmarkAction from "./TweetBookmarkAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { toggleTweetLike } from "../../store/slices/tweetsSlice";

interface TweetListItemProps {
    tweet: Tweet;
}

const TweetListItem = ({ tweet }: TweetListItemProps) => {
    const dispatch = useDispatch<AppDispatch>()

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <ProfileImage
                    imageUri={tweet.author.profileImageUri}
                    style={styles.profileImage}
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
                    <TweetReplyAction countValue={tweet.replyCount} onPress={() => {}}/>
                    <TweetRetweetAction countValue={0} onPress={() => {}} />
                    <TweetLikeAction isLiked={tweet.isLiked} countValue={tweet.likeCount} onPress={
                        () => dispatch(toggleTweetLike(tweet.id))
                    }/>
                    <TweetBookmarkAction countValue={0} onPress={() => {}} />

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
    profileImage: {
        width: 45,
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
        paddingVertical: 8,
    }
})