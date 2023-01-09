import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import { Text, View } from './Themed'
import { useState } from 'react'
import * as Clipboard from 'expo-clipboard'

type ChatBoxProps = {
  prompt: string
  response: string
}

export default function ChatBox(props: ChatBoxProps) {
  const { prompt, response } = props
  const [copiedText, setCopiedText] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(response)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  //   const fetchCopiedText = async () => {
  //     const text = await Clipboard.getStringAsync()
  //     setCopiedText(text)
  //   }

  return (
    <View>
      <Text
        style={{
          color: Colors.light.tint,
          fontSize: 16,
          flex: 1,
          fontWeight: 'bold',
          marginTop: 10,
          marginLeft: 10,
          marginBottom: 5,
        }}
      >
        {prompt}
      </Text>
      <View style={styles.box}>
        <Text
          style={{
            color: Colors.light.tint,
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
              color={Colors.light.tint + '80'}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.tint + '20',
    width: '100%',
    borderColor: Colors.light.tint + '50',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 15,
    marginVertical: 8,
  },
})
