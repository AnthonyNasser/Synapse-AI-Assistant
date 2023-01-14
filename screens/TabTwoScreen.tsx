import { FontAwesome5 } from '@expo/vector-icons'
import { Dimensions, Pressable, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import { Text, View } from '../components/Themed'
import Slider from '@react-native-community/slider'
import { useGlobalContext } from '../Context'
import { RootTabScreenProps } from '../types'
import { useState } from 'react'
import AnimatedLottieView from 'lottie-react-native'

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'ChatGPT'>) {
  const context = useGlobalContext()
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {context.keyTested ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#000000' }}>
            <Text style={styles.title}>API Key: {context.apiKey.substring(0, 5) + '...' + context.apiKey.substring(context.apiKey.length - 5)}</Text>
            <FontAwesome5 name="check-circle" size={24} style={{ marginLeft: 10 }} color="green" />
          </View>
        ) : (
          <>
            <TextInput
              value={context.apiKey}
              onChangeText={(text: string) => {
                context.setApiKey(text)
              }}
              placeholder="Enter API Key"
              placeholderTextColor="#5a5a5a"
              style={{
                color: 'white',
                fontSize: 16,
                width: '80%',
                height: 50,
                backgroundColor: '#1F1F1F',
                borderRadius: 5,
                borderColor: !context.keyTested ? 'red' : 'green',
                borderWidth: 1,
                paddingLeft: 10,
                marginHorizontal: 20,
                marginTop: 10,
                paddingRight: 10,
              }}
            />
            <Pressable
              onPress={() =>
                navigation.navigate('Modal', {
                  parameter: 'API Key',
                  description: ``,
                  navigation: navigation,
                } as any)
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome5 name="question-circle" size={25} color="white" />
            </Pressable>
          </>
        )}
      </View>
      {!loading ? (
        <>
          {!context.keyTested ? (
            <TouchableOpacity
              onPress={async () => {
                setLoading(true)
                context.onSave()
                await context.testAPIKey()
                setLoading(false)
              }}
              style={{
                flexDirection: 'row',
                marginLeft: 20,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 5,
                padding: 10,
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <FontAwesome5 name="key" size={25} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}
              >
                Save Key
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                setLoading(true)
                context.setKeyTested(false)
                setLoading(false)
              }}
              style={{
                flexDirection: 'row',
                marginLeft: 20,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 5,
                padding: 10,
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <FontAwesome5 name="key" size={25} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}
              >
                Change Key
              </Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <View
          style={{
            width: Dimensions.get('window').width * 0.5,
            height: Dimensions.get('window').height * 0.05,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000',
          }}
        >
          <AnimatedLottieView source={require('../assets/animations/loading.json')} autoPlay loop />
        </View>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Max Tokens = {context.maxTokens}</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('Modal', {
              parameter: 'Max Tokens',
              description: `In OpenAI's API, the "max_tokens" parameter determines the maximum number of tokens (i.e., words and word pieces) that the model will consider when generating text. This can be used to limit the length of the generated text or to ensure that the model does not spend too much time or computational resources on a single request.
        \nOne reason you might want to limit the number of tokens in your OpenAI queries is to save time and resources. Generating long pieces of text can be computationally expensive, and if you only need a short piece of text or are making many requests in a short period of time, limiting the number of tokens can help you stay within your usage limits and avoid running out of resources. Limiting the number of tokens can also be useful if you want to ensure that the model stays focused on a specific topic or prompt and does not generate unrelated or tangential text.`,
              navigation: navigation,
            } as any)
          }
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome5 name="question-circle" size={25} color="white" />
        </Pressable>
      </View>
      <Slider
        style={{ width: '95%', height: 75, alignSelf: 'center' }}
        minimumValue={16}
        maximumValue={1000}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
        thumbTintColor="#FFFFFF"
        value={context.maxTokens}
        onValueChange={(value) => context.setMaxTokens(value)}
        step={10}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Temperature = {context.temperature.toFixed(2)}</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('Modal', {
              parameter: 'Temperature',
              description: `The temperature parameter in OpenAI determines how random or certain the model's predictions will be.
                \nA higher temperature will cause the model to produce more diverse and random predictions. This can be useful in certain situations, such as when you want the model to explore a wider range of possibilities or be less predictable. However, a higher temperature can also cause the model to make more mistakes and produce less accurate predictions, so it's important to use it carefully.
                \nA lower temperature will cause the model to be more certain and confident in its predictions. This can be useful in situations where you want the model to be more reliable and accurate, but it can also make the model's output less diverse and more predictable. It's important to find the right balance between high and low temperatures depending on your specific needs.
                `,
              navigation: navigation,
            } as any)
          }
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome5 name="question-circle" size={25} color="white" />
        </Pressable>
      </View>
      <Slider
        style={{ width: '95%', height: 75, alignSelf: 'center' }}
        minimumValue={0.1}
        maximumValue={1.0}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
        thumbTintColor="#FFFFFF"
        value={context.temperature}
        onValueChange={(value) => context.setTemperature(value)}
        step={0.1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 30,
    backgroundColor: '#000000',
    color: '#FFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 25,
    color: '#FFF',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 30,
    backgroundColor: '#000000',
  },
})
