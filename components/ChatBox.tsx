import { FontAwesome5, Ionicons } from "@expo/vector-icons"
import { Alert, Pressable, StyleSheet } from "react-native"
import { Text, View } from "./Themed"
import * as Clipboard from "expo-clipboard"
import { useGlobalContext } from "../Context"
import makeTextCompletionRequest from "../services/openai/textCompletionRequest"
import { useState } from 'react'
import PromptBox from './prompt-box/PromptBox'
import ResponseBox from './response-box/ResponseBox'
import clogger from '../utils/logger'
import { storeContext } from '../utils/storage'

type ChatBoxProps = {
  prompt: string
  response: string
  setLoading: (loading: boolean) => void
}

export default function ChatBox(props: ChatBoxProps) {
  const { prompt, response, setLoading } = props
  const context = useGlobalContext()

  const handleDelete = () => {
    Alert.alert('Delete the item with the following prompt?\n', `${prompt}`, [
      {
        text: 'No',
        style: 'destructive',
      },
      {
        text: 'Yes',
        onPress: () => {
          // TODO: Do this with IDs instead of responses because there's an edge case where there are two identical responses
          context.setChatBoxes(context.chatBoxes.filter((box: any) => box.response !== `${response}`))
          storeContext({...context, chatBoxes: context.chatBoxes.filter((box: any) => box.response !== `${response}`)})
        },
      },
    ])
  }

  const handleSend = async (prompt: string) => {
    setLoading(true)
    context.setPrompt('')
    const response: any = await makeTextCompletionRequest(context.apiKey, context.model, prompt, context.temperature, context.maxTokens)
    if (response && response !== '400') {
      const newChatBoxes = [...context.chatBoxes, { id: `${prompt}${Math.random()}`, prompt: prompt.trim(), response: response.trim() }]
      context.setChatBoxes(newChatBoxes)
      storeContext({...context, chatBoxes: newChatBoxes})
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
        backgroundColor: '#000000',
      }}
    >
      <PromptBox prompt={prompt} onDelete={() => handleDelete()} onRegenerate={(prompt:string) => handleSend(prompt)}/>
      <ResponseBox response={response}/>
    </View>
  )
}
