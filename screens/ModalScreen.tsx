import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Platform, ScrollView, StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import APIKeyInstructions from '../components/APIKeyInstructions'

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
    navigation.setOptions({
      title: parameter,
      headerRight: () => (
        <Text style={{ color: '#FFF', paddingRight: 20 }} onPress={() => navigation.navigate('Settings')}>
          Done
        </Text>
      ),
    })
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {parameter === 'API Key' ? <APIKeyInstructions /> : <Text style={styles.text}>{description}</Text>}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#000',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  text: {
    fontSize: 16,
    color: '#FFF',
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
