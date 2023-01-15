import AnimatedLottieView from 'lottie-react-native'
import { View, Text } from 'react-native'

export default function ScreenLoader() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedLottieView source={require('../assets/animations/loading.json')} autoPlay loop style={{ width: 200, height: 200 }} />
    </View>
  )
}
