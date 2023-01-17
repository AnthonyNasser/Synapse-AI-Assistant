import { FontAwesome5, Ionicons } from "@expo/vector-icons"
import { Alert, Pressable, StyleSheet } from "react-native"
import { Text, View } from "./Themed"
import { useState } from "react"
import * as Clipboard from "expo-clipboard"
import { useGlobalContext } from "../Context"
import makeTextCompletionRequest from "../services/openai/textCompletionRequest"

type ChatBoxProps = {
  prompt: string
  response: string
  setLoading: (loading: boolean) => void
}

export default function ChatBox(props: ChatBoxProps) {
  const { prompt, response, setLoading } = props
  const [copied, setCopied] = useState<boolean>(false)
  const context = useGlobalContext()

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(response)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleSend = async (prompt: string) => {
    setLoading(true)
    context.setPrompt("")
    const response: any = await makeTextCompletionRequest(context.apiKey, context.model, prompt, context.temperature, context.maxTokens)
    if (response && response !== "400") {
      context.setChatBoxes([...context.chatBoxes, { id: `${prompt}${Math.random()}`, prompt: prompt.trim(), response: response.trim() }])
    } else {
      context.setChatBoxes([
        {
          id: `${prompt}${Math.random()}`,
          prompt: "Request Failed",
          response: "Please save a valid API Key in Settings.",
        },
      ])
    }
    setLoading(false)
  }

  return (
    <View
      style={{
        backgroundColor: "#000000",
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            color: "#ccc",
            fontSize: 16,
            flex: 1,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 15,
            marginBottom: 5,
          }}
        >
          {prompt}
        </Text>
        <Pressable
          style={{
            backgroundColor: "#1C1C1C",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            marginRight: 10,
            width: 60,
            height: 40,
          }}
          onPress={() => {
            Alert.alert("Delete the item with the following prompt?\n", `${prompt}`, [
              {
                text: "No",
                style: "destructive",
              },
              {
                text: "Yes",
                onPress: () => {
                  // TODO: Do this with IDs instead of responses because there's an edge case where there are two identical responses
                  context.setChatBoxes(context.chatBoxes.filter((box: any) => box.response !== `${response}`))
                },
              },
            ])
          }}
        >
          <FontAwesome5 name="trash" size={20} color="#FFF" style={{}} />
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#1C1C1C",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            marginRight: 10,
            width: 60,
            height: 40,
          }}
          onPress={() => {
            handleSend(prompt)
          }}
        >
          <FontAwesome5 name="retweet" size={20} color="#FFF" style={{}} />
        </Pressable>
      </View>
      <View style={styles.box}>
        <Text
          style={{
            color: "#bfbfbf",
            fontSize: 16,
            flex: 1,
          }}
        >
          {response}
        </Text>
        {copied ? (
          <FontAwesome5 name="clipboard-check" size={30} color="#FFF" style={{ paddingLeft: 15, width: 55 }} />
        ) : (
          <Pressable onPress={copyToClipboard}>
            <Ionicons
              name="copy"
              size={30}
              color={"#bfbfbf" + "80"}
              style={{
                paddingLeft: 15,
                width: 55,
              }}
            />
          </Pressable>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    width: "100%",
    borderColor: "#bfbfbf" + "50",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 15,
    marginVertical: 5,
  },
})
