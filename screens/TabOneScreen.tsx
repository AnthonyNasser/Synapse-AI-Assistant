import { Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { Configuration, OpenAIApi } from 'openai'
import 'react-native-url-polyfill/auto'
import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from '../Context'
import { TEXT_INPUT_STYLE } from '../styles'
import { FontAwesome5 } from '@expo/vector-icons'
import ChatBox from '../components/ChatBox'
import AnimatedLottieView from 'lottie-react-native'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'ChatGPT'>) {
  const context = useGlobalContext()
  const [prompt, setPrompt] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const scrollViewRef = useRef<any>(null)

  const configuration = new Configuration({
    apiKey: context.apiKey,
  })
  const openai = new OpenAIApi(configuration)

  useEffect(() => {
    context.setChatBoxes([
      {
        prompt: 'Query OpenAI by entering a prompt below.',
        response: `Please note that this app is not affiliated with OpenAI in any way.
        \nThis app's features include:
        \n1. Using your own API Key instead of being charged for a subscription
        \n2. Adjust and configure the AI to your liking (see settings for more info)
        \n3. Copy responses to your clipboard with the button to the right
        \nThank you for downloading, please leave a review to submit feedback.`,
      },
    ])
  }, [])

  const makeRequest = async (prompt: string) => {
    console.log('Making request')
    setLoading(true)
    setPrompt('')
    await openai
      .createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: context.temperature,
        max_tokens: context.maxTokens,
      })
      .then((completion: any) => {
        console.log(completion.data.choices[0].text.toString())
        if (completion.data.choices[0].text.toString().length > 0) {
          context.setChatBoxes([...context.chatBoxes, { prompt: prompt, response: completion.data.choices[0].text.toString().trim() }])
        }
      })
      .catch((error: any) => {
        // console.error(error)
        context.setChatBoxes([
          {
            prompt: 'Request Failed',
            response: 'Please save a valid API Key in Settings.',
          },
        ])
      })
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="never"
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {context.chatBoxes.map((chatBox: any, index: number) => {
          return <ChatBox key={index} prompt={chatBox.prompt} response={chatBox.response} />
        })}
        {loading ? (
          <View
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height * 0.2,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000000',
            }}
          >
            <AnimatedLottieView source={require('../assets/animations/loading.json')} autoPlay loop />
          </View>
        ) : null}
      </ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
        }}
        enabled
      >
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', backgroundColor: '#000000' }}>
          <TextInput
            placeholder="Enter a prompt..."
            style={TEXT_INPUT_STYLE}
            value={prompt}
            onChangeText={setPrompt}
            placeholderTextColor="#5a5a5a"
          />
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginBottom: 10,
              opacity: prompt.length > 0 ? 1 : 0.2,
            }}
            onPress={() => {
              makeRequest(prompt)
            }}
          >
            <FontAwesome5 name="arrow-up" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
  },
  separator: {
    height: 1,
    width: '80%',
  },
})
