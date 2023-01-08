import { Dimensions, TextStyle, ViewStyle } from 'react-native'

export const TEXT_INPUT_STYLE: TextStyle = {
  height: 50,
  width: Dimensions.get('window').width - 10,
  borderWidth: 1,
  fontSize: 20,
  color: 'white',
  borderColor: 'white',
  borderRadius: 10,
  paddingLeft: 20,
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
