import { View, Text, StyleSheet, Linking, Pressable, Image, Dimensions, ScrollView } from 'react-native'
import step1 from '../assets/instructions/step1.jpg'
import step2 from '../assets/instructions/step2.jpg'
import step3 from '../assets/instructions/step3.jpg'
import step4 from '../assets/instructions/step4.jpg'
import step5 from '../assets/instructions/step5.jpg'

export default function APIKeyInstructions() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Follow these instructions to generate an API Key on the OpenAI website.</Text>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ ...styles.text, fontWeight: 'bold', textAlign: 'left', fontSize: 20 }}>1) Go to OpenAI Website</Text>
        <Pressable onPress={() => Linking.openURL('https://openai.com/api')}>
          <Text
            style={{
              ...styles.text,
              textAlign: 'left',
              fontSize: 18,
              textDecorationColor: '#FFF',
              textDecorationLine: 'underline',
            }}
          >
            https://openai.com/api
          </Text>
        </Pressable>
      </View>
      <View style={{ alignItems: 'flex-start' }}>
        <Text style={{ ...styles.text, fontWeight: 'bold', textAlign: 'left', fontSize: 20 }}>2) Create Account or Login</Text>
        <Image source={step1} style={styles.image} />
      </View>
      <View style={{ alignItems: 'flex-start' }}>
        <Text style={{ ...styles.text, fontWeight: 'bold', textAlign: 'left', fontSize: 20 }}>3) Go to the Menu</Text>
        <Image source={step2} style={styles.image} />
      </View>
      <View style={{ alignItems: 'flex-start' }}>
        <Text style={{ ...styles.text, fontWeight: 'bold', textAlign: 'left', fontSize: 20 }}>4) Click "View API Keys"</Text>
        <Image source={step3} style={styles.image} />
      </View>
      <View style={{ alignItems: 'flex-start' }}>
        <Text style={{ ...styles.text, fontWeight: 'bold', textAlign: 'left', fontSize: 20 }}>5) Click "Create new secret key"</Text>
        <Image source={step4} style={styles.image} />
      </View>
      <View style={{ alignItems: 'flex-start' }}>
        <Text style={{ ...styles.text, fontWeight: 'bold', textAlign: 'left', fontSize: 20 }}>6) Copy the key</Text>
        <Image source={step5} style={styles.image} />
      </View>
      <View style={{ alignItems: 'flex-start' }}>
        <Text style={{ ...styles.text, fontWeight: 'bold', textAlign: 'left', fontSize: 20 }}>7) Paste the key into this app</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 16,
    color: '#FFF',
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: Dimensions.get('screen').width - 10,
    height: Dimensions.get('screen').height * 0.8,
    marginTop: 20,
  },
})
