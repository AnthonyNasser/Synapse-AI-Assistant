import { FontAwesome5 } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'

import { Text, View } from '../components/Themed'
import Slider from '@react-native-community/slider'
import { useGlobalContext } from '../Context'
import { RootTabScreenProps } from '../types'

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'ChatGPT'>) {
  const context = useGlobalContext()

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Max Tokens = {context.maxTokens}</Text>
        <Pressable
          onPress={() => navigation.navigate('Modal', { parameter: 'Max Tokens', description: 'Hello World', navigation: navigation } as any)}
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
          onPress={() => navigation.navigate('Modal', { parameter: 'Temperature', description: 'Hello World', navigation: navigation } as any)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <FontAwesome5 name="question-circle" size={25} color="white" />
        </Pressable>
      </View>
      <Slider
        style={{ width: '95%', height: 75, alignSelf: 'center' }}
        minimumValue={0.0}
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 25,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
})
