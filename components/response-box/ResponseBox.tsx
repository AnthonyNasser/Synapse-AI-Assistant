import { useState } from 'react'
import { Pressable } from 'react-native'
import { Text, View } from '../Themed'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import styles from "./styles"

type ResponseBoxProps = {
    response: string;
}

export default function ResponseBox({response}: ResponseBoxProps) {
    const [copied, setCopied] = useState<boolean>(false)

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(response)
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      }

    return (
        <View style={styles.box}>
            <View style={styles.contentContainer}>
                {<FontAwesome5 name="robot" size={20} color="white" style={styles.avatar}/>}
                <Text
                style={styles.textStyle}
                >
                    {response}
                </Text>
            </View>
            <View style={styles.iconContainer}>
              {copied ? (
                <FontAwesome5 name="clipboard-check" size={24} color="#FFF" />
              ) : (
                <Pressable onPress={copyToClipboard}>
                  <Ionicons
                    name="copy"
                    size={24}
                    color={'#bfbfbf' + '80'}
                  />
                </Pressable>
              )}
            </View>
      </View>
    )
}