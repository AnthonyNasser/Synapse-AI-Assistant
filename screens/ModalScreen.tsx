import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'

type ModalScreenProps = {
  parameter?: string
  description?: string
  route?: any
  navigation?: any
}

export default function ModalScreen(props: ModalScreenProps) {
  const { parameter, description } = props.route.params
  const { navigation } = props

  useEffect(() => {
    navigation.setOptions({ title: parameter })
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parameter}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>{description}</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
