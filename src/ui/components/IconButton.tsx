import { Pressable } from "react-native"

interface IconButtonProps {
    icon: React.ReactNode
    onPress: () => void;
}

const IconButton = ({ icon, onPress }: IconButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
        >
            {icon}
        </Pressable>
    )
}

export default IconButton