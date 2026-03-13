import { ApiUserFeedResponse, ApiUserWithBio } from "../../constants/types/API";
import { User, UserFeed } from "../../constants/types/User";
import formatUsername from "../../utils/formatUsername";

const mapUser = (apiUser: ApiUserWithBio): User => ({
    id: apiUser.id,
    username: formatUsername(apiUser.username),
    profile: {
        name: apiUser.profile.name,
        bio: apiUser.profile.bio,
    }
})

export const userFeedMapper = (response: ApiUserFeedResponse): UserFeed => ({
    page: response.page,
    limit: response.limit,
    total: response.total,
    users: response.data.map(mapUser),
})