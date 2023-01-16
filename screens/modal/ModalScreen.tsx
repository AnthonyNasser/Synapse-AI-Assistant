import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Platform, ScrollView } from 'react-native';
import { Text } from '../../components/Themed'
import APIKeyInstructions from '../../components/APIKeyInstructions'
import styles from "./styles"

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
