import { KeyboardAvoidingView, StyleSheet, TextInput, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { Configuration, OpenAIApi } from 'openai'
import 'react-native-url-polyfill/auto'
import React, { useEffect } from 'react'
import { useGlobalContext } from '../Context'
import { TEXT_INPUT_STYLE, BUTTON_STYLE, RESPONSE_STYLE } from '../styles'

const configuration = new Configuration({
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)

export default function TabOneScreen({ navigation }: RootTabScreenProps<'ChatGPT'>) {
  const context = useGlobalContext()
  const [prompt, setPrompt] = React.useState<string>('')
  const [response, setResponse] = React.useState<any>('')

  const makeRequest = async (prompt: string) => {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 100,
    })
    setResponse(completion.data.choices[0].text?.toString().trim())
  }

  return (
    <View style={styles.container}>
      <Text style={RESPONSE_STYLE}>{response}</Text>
      <TouchableOpacity onPress={() => makeRequest(prompt)} style={BUTTON_STYLE}>
        <Text>Generate Response</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        {/* <View style={{ ...styles.separator }} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
        <TextInput placeholder="Enter a prompt" style={TEXT_INPUT_STYLE} value={prompt} onChangeText={setPrompt} />
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  separator: {
    height: 1,
    width: '80%',
  },
})
