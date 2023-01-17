import { KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { View } from "../../components/Themed"
import { RootTabScreenProps } from "../../types"
import "react-native-url-polyfill/auto"
import React, { useEffect, useRef, useState } from "react"
import { useGlobalContext } from "../../Context"
import { TEXT_INPUT_STYLE } from "../../styles"
import { FontAwesome5 } from "@expo/vector-icons"
import ChatBox from "../../components/ChatBox"
import AnimatedLottieView from "lottie-react-native"
import makeTextCompletionRequest from "../../services/openai/textCompletionRequest"
import { getContext, storeContext } from "../../utils/storage"
import ScreenLoader from "../../components/ScreenLoader"
import styles from "./styles"
import * as StoreReview from "expo-store-review"
import clogger from "../../utils/logger"

const SHORT_RANDOM_THRESHOLD = 100
const LONG_RANDOM_THRESHOLD = 25

export default function ChatScreen({ navigation }: RootTabScreenProps<"Chat">) {
  const context = useGlobalContext()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [inputHeight, setInputHeight] = useState<number>(40)
  const [screenLoading, setScreenLoading] = useState<boolean>(true)
  const scrollViewRef = useRef<any>(null)

  useEffect(() => {
    setScreenLoading(true)
    setTimeout(() => {
      // setTimout is temporary solution to a bug
      getContext().then((storedContext: any) => {
        if (storedContext) {
          const { apiKey, temperature, maxTokens, chatBoxes, keyTested } = JSON.parse(storedContext)

          context.setApiKey(apiKey)
          context.setTemperature(temperature)
          context.setMaxTokens(maxTokens)
          context.setKeyTested(keyTested)
          context.setChatBoxes(chatBoxes)
        } else {
          context.setChatBoxes([
            {
              prompt: "Query OpenAI by entering a prompt below.",
              response: `Please note that this app is not affiliated with OpenAI in any way.
            \nThis app's features include:
            \n1. The ability to use your own API Key (see settings for more info)
            \n2. Adjust and configure the AI to your liking (see settings for more info)
            \n3. Copy responses to your clipboard with the button to the right
            \n4. Regenerate a response with the button next to a prompt
            \nThank you for downloading, please leave a review to submit feedback.`,
            },
          ])
        }
      })
      setScreenLoading(false)
    }, 500)
  }, [])

  const handleSend = async (prompt: string) => {
    setLoading(true)
    context.setPreviousPrompts(`${context.previousPrompts}${prompt.trim()}###endPrompt###`)
    let response: any = await makeTextCompletionRequest(
      context.apiKey,
      context.model,
      context.previousPrompts,
      prompt,
      context.previousResponses,
      context.temperature,
      context.maxTokens,
    )
    context.setPrompt("")
    // hard coded fix for a bug
    if (response && response !== "400") {
      // check prompt and response for all instances of ###endPrompt### and ###endResponse### and remove them
      while (prompt.includes("###endPrompt###")) {
        prompt = prompt.replace("###endPrompt###", "")
      }
      while (prompt.includes("###endResponse###")) {
        prompt = prompt.replace("###endResponse###", "")
      }
      while (response.includes("###endPrompt###")) {
        response = response.replace("###endPrompt###", "")
      }
      while (response.includes("###endResponse###")) {
        response = response.replace("###endResponse###", "")
      }
      // regex remove all special characters from beginning of string
      response = response.replace(/^[^a-zA-Z0-9]+/, "")
      const newChatBoxes = [...context.chatBoxes, { prompt: prompt.trim(), response: response.trim() }]
      context.setChatBoxes(newChatBoxes)
      storeContext({ ...context, chatBoxes: newChatBoxes })
      context.setPreviousResponses(`${context.previousResponses}${response.trim()}###endResponse###`)
      const isLongResponse = response.trim().length > 500
      const randomNumber = isLongResponse ? Math.floor(Math.random() * LONG_RANDOM_THRESHOLD) : Math.floor(Math.random() * SHORT_RANDOM_THRESHOLD)
      if (randomNumber === 0 && (await StoreReview.hasAction()) && (await StoreReview.isAvailableAsync())) {
        clogger.info("Requesting Review...")
        StoreReview.requestReview()
      }
    } else {
      context.setChatBoxes([
        {
          prompt: "Request Failed",
          response: "Please save a valid API Key in Settings.",
        },
      ])
    }
    setLoading(false)
  }

  return (
    <>
      {screenLoading ? (
        <ScreenLoader />
      ) : (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 15,
            }}
            keyboardShouldPersistTaps="never"
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {context.chatBoxes.map((chatBox: any, index: number) => {
              return <ChatBox key={index} prompt={chatBox.prompt} response={chatBox.response} setLoading={setLoading} />
            })}
            {loading ? (
              <View style={styles.loadingContainer}>
                <AnimatedLottieView source={require("../../assets/animations/loading.json")} autoPlay loop />
              </View>
            ) : null}
          </ScrollView>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={100}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000000",
            }}
            enabled
          >
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter a prompt..."
                style={[styles.textInput, {height: inputHeight > 40 ? inputHeight : 40}]}
                onContentSizeChange={(event) => {
                  const {contentSize} = event.nativeEvent
                  setInputHeight(contentSize.height)
                }}
                onChangeText={context.setPrompt}
                placeholderTextColor="#5a5a5a"
                value={context.prompt}
                multiline
              />
              <TouchableOpacity
                style={{ ...styles.sendButton, opacity: context.prompt.length > 0 ? 1 : 0.2 }}
                onPress={() => {
                  if (context.prompt.length > 0) handleSend(context.prompt)
                }}
              >
                <FontAwesome5 name="arrow-up" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  )
}
