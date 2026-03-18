import { FlatList, View } from "react-native"
import { User } from "../../core/constants/types/User"
import UserListItem from "./UserListItem";

interface SearchUsersResultsProps {
    users: User[];
}

const SearchUsersResults = ({ users }: SearchUsersResultsProps) => {
    return (
        <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <UserListItem user={item} />
            )}
        />
    )
}

export default SearchUsersResults