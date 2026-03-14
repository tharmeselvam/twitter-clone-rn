import { Image, StyleSheet, Text, View } from "react-native"
import { colors } from "../colors"
import { User } from "../../core/constants/types/User";
import Button from "./Button";
import SmallFollowButton from "./SmallFollowButton";

interface UserListItemProps {
    user: User;
}

const UserListItem = ({ user }: UserListItemProps) => {
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
                    <View style={styles.namesContainer}>
                        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                            {user.profile.name}
                        </Text>
                        <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
                            {user.username}
                        </Text>
                    </View>

                    <SmallFollowButton onPress={() => {}} />

                </View>

                {user.profile.bio &&
                    <View style={styles.bioContainer}>
                        <Text style={styles.bio} numberOfLines={3} ellipsizeMode="tail">
                            {user.profile.bio}
                        </Text>
                    </View>
                }

            </View>
        </View>
    )
}

export default UserListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
    },
    leftContainer: {
        paddingTop: 4,
        width: 40,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'gray',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        gap: 2,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    },
    namesContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minWidth: 0,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        minWidth: 0,
    },
    username: {
        fontWeight: 'normal',
        fontSize: 16,
        color: 'gray',
        flexShrink: 1,
        minWidth: 0,
    },
    bioContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingVertical: 6,
    },
    bio: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'normal',
    },
})