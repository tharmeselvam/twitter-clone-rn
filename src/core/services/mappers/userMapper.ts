import { ApiUserFeedResponse, ApiUserFull, ApiUserWithBio } from "../../constants/types/API";
import { User, UserFeed, UserFull } from "../../constants/types/User";
import formatUsername from "../../utils/formatUsername";

const mapUser = (apiUser: ApiUserWithBio): User => ({
    id: apiUser.id,
    username: formatUsername(apiUser.username),
    profile: {
        name: apiUser.profile.name,
        bio: apiUser.profile.bio,
        profileImageUri: apiUser.profile.profileImageUri,
    }
})

export const mapUserFull = (apiUser: ApiUserFull): UserFull => ({
    id: apiUser.id,
    username: formatUsername(apiUser.username),
    profile: {
        name: apiUser.profile.name,
        bio: apiUser.profile.bio,
        profileImageUri: apiUser.profile.profileImageUri,
        headerImageUri: apiUser.profile.headerImageUri,
    },
    followerCount: apiUser.followerCount,
    followingCount: apiUser.followingCount,
})

export const userFeedMapper = (response: ApiUserFeedResponse): UserFeed => ({
    page: response.page,
    limit: response.limit,
    total: response.total,
    users: response.data.map(mapUser),
})