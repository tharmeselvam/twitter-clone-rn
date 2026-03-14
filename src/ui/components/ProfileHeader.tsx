import { Image, StyleSheet, Text, View } from "react-native"
import { colors } from "../colors"
import { UserFull } from "../../core/constants/types/User"
import IconButton from "./IconButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import Avatar from "./Avatar";

interface ProfileHeaderProps {
    user: UserFull;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
    return (
        <View style={styles.container} pointerEvents="box-none">
            <View style={styles.headerPhoto}>

            </View>

            <Avatar style={styles.avatar} />

            <View style={styles.optionsContainer}>
                <IconButton 
                    icon={<Ionicons name='pencil' size={20} style={styles.optionIcon}/>}
                    onPress={() => {}}
                />
                <IconButton
                    icon={<Ionicons name='settings' size={20} style={styles.optionIcon}/>}
                    onPress={() => {}}
                />
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.namesContainer}>
                    <Text style={styles.name}>{user.profile.name}</Text>
                    <Text style={styles.username}>{user.username}</Text>
                </View>
                
                {user.profile.bio &&
                    <Text style={[styles.text, styles.bio]}>{user.profile.bio}</Text>
                }
                
                <View style={styles.followStatsContainer}>
                    <View style={styles.followStatSubContainer}>
                        <Text style={[styles.text, styles.followStatNumber]}>{user.followerCount}</Text>
                        <Text style={[styles.text]}>{user.followerCount === 1 ? 'Follower' : 'Followers'}</Text>
                    </View>

                    <View style={styles.followStatSubContainer}>
                        <Text style={[styles.text, styles.followStatNumber]}>{user.followingCount}</Text>
                        <Text style={[styles.text]}>Following</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    container: {

    },
    headerPhoto: {
        height: 140,
        backgroundColor: colors.primary
    },
    avatar: {
        position: 'absolute',
        top: 100,
        left: 16,
    },
    optionsContainer: {
        height: 60,
        flexDirection: 'row',
        padding: 16,
        gap: 15,
        justifyContent: 'flex-end'

    },
    optionIcon: {
        color: colors.gray700
    },
    infoContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 14
    },
    namesContainer: {
        gap: 2
    },
    name: {
        fontSize: 20,
        color: colors.black,
        fontWeight: '900'
    },
    username: {
        fontSize: 16,
        color: colors.gray600,
    },
    bio: {
        fontSize: 16,
        color: colors.black,
        lineHeight: 25
    },
    followStatsContainer: {
        marginTop: 8,
        flexDirection: 'row',
        gap: 20
    },
    followStatSubContainer: {
        flexDirection: 'row',
        gap: 6
    },
    followStatNumber: {
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
        color: colors.black
    }
})