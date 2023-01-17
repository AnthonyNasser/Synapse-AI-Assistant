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
