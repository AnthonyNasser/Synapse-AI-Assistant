import { Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import 'react-native-url-polyfill/auto'
import React, { useEffect, useRef, useState } from 'react'
import { useGlobalContext } from '../Context'
import { TEXT_INPUT_STYLE } from '../styles'
import { FontAwesome5 } from '@expo/vector-icons'
import ChatBox from '../components/ChatBox'
import AnimatedLottieView from 'lottie-react-native'
import makeTextCompletionRequest from '../services/openai/textCompletionRequest'
import { getContext } from '../utils/storage'
import ScreenLoader from '../components/ScreenLoader'
// import clogger from '../utils/logger'

export default function ChatScreen({ navigation }: RootTabScreenProps<'Chat'>) {
  const context = useGlobalContext()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [screenLoading, setScreenLoading] = useState<boolean>(true)
  const scrollViewRef = useRef<any>(null)

  useEffect(() => {
    setScreenLoading(true)
    setTimeout(() => {
      // setTimout is temporary solution to a bug
      getContext().then((storedContext: any) => {
        const { apiKey, temperature, maxTokens, chatBoxes, keyTested } = JSON.parse(storedContext)
        if (storedContext) {
          context.setApiKey(apiKey)
          context.setTemperature(temperature)
          context.setMaxTokens(maxTokens)
          context.setKeyTested(keyTested)
          context.setChatBoxes(chatBoxes)
        } else {
          context.setChatBoxes([
            {
              prompt: 'Query OpenAI by entering a prompt below.',
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
    context.setPrompt('')
    const response: any = await makeTextCompletionRequest(context.apiKey, context.model, prompt, context.temperature, context.maxTokens)
    if (response && response !== '400') {
      context.setChatBoxes([...context.chatBoxes, { prompt: prompt.trim(), response: response.trim() }])
    } else {
      context.setChatBoxes([
        {
          prompt: 'Request Failed',
          response: 'Please save a valid API Key in Settings.',
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
                value={context.prompt}
                onChangeText={context.setPrompt}
                placeholderTextColor="#5a5a5a"
              />
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  marginBottom: 10,
                  opacity: context.prompt.length > 0 ? 1 : 0.2,
                }}
                onPress={() => {
                  handleSend(context.prompt)
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
