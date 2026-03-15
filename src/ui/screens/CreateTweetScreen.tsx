import { StyleSheet, TextInput, View } from "react-native"
import { rootStyles } from "../styles"
import CancelButton from "../components/CancelButton"
import TweetButton from "../components/TweetButton"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../core/constants/types/RootStackParamList"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors } from "../colors"
import { useEffect, useState } from "react"
import Toast from "react-native-toast-message"
import { tweetsRepository } from "../../core/services/repositories/tweetsRepository"

type Props = NativeStackScreenProps<RootStackParamList, 'CreateTweet'>

const CreateTweetScreen = ({ navigation }: Props) => {
    const [tweetContent, setTweetContent] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const MAX_LENGTH = 280

    useEffect(() => {
        if (tweetContent.length >= MAX_LENGTH) {
            Toast.show({
                type: 'error',
                text1: "You have reached the maximum tweet length."
            })
        }

        if (errorMessage) {
            Toast.show({
                type: 'error',
                text1: errorMessage
            })
        }
    }, [tweetContent, errorMessage])

    const handleSendTweet = async () => {
        const result = await tweetsRepository.createTweet(tweetContent)

        if (!result.success) {
            setErrorMessage(result.error.message)
        }

        Toast.show({
            type: 'success',
            text1: "Tweet sent!"
        })

        navigation.goBack()
    }

    return (
        <SafeAreaView style={[rootStyles.screenContainer, styles.container]}>
            <View style={styles.actionsContainer}>
                <CancelButton onPress={() => navigation.goBack()}/>

                <TweetButton isDisabled={tweetContent.trim() === ''} onPress={handleSendTweet} />
            </View>

            <View>
                <TextInput 
                    style={styles.input}
                    placeholder="What's happening?"
                    maxLength={MAX_LENGTH}
                    value={tweetContent}
                    onChangeText={setTweetContent}
                />
            </View>
        </SafeAreaView>
    )
}

export default CreateTweetScreen

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16
    }, 
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        fontSize: 16,
        color: colors.black
    }
})