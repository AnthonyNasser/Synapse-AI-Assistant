import { Dimensions, TextStyle, ViewStyle } from 'react-native'
import Colors from './constants/Colors'

export const TEXT_INPUT_STYLE: TextStyle = {
  height: Dimensions.get('window').height / 18,
  width: Dimensions.get('window').width - 40,
  borderWidth: 2,
  fontSize: 20,
  color: Colors.dark.text,
  borderColor: Colors.light.tint,
  borderRadius: 10,
  paddingLeft: 20,
  marginRight: 5,
}

export const RESPONSE_STYLE: TextStyle = {
  color: 'white',
  fontSize: 20,
  marginTop: '20%',
  borderWidth: 1,
  padding: 25,
  borderColor: 'white',
  borderRadius: 10,
}

export const BUTTON_STYLE: ViewStyle = {
  backgroundColor: 'black',
  padding: 10,
  borderColor: 'white',
  borderWidth: 1,
  borderRadius: 5,
  marginVertical: 20,
}
