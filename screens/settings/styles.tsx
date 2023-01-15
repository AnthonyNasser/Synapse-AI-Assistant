import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginTop: 15,
          backgroundColor: '#000000',
          color: '#FFF',
          paddingBottom: 35,
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
        textInput: {
          color: 'white',
          fontSize: 16,
          width: '100%',
          height: 60,
          backgroundColor: '#1F1F1F',
          borderRadius: 7,
          borderWidth: 1,
          paddingLeft: 10,
          marginHorizontal: 15,
          marginTop: 10,
          paddingRight: 10,
        },
        apiButtonContainer: { 
          flexDirection: 'row', 
          alignItems: 'center', 
          backgroundColor: '#000000', 
          alignSelf: 'flex-start' 
        },
        button: {
          flexDirection: 'row',
          marginLeft: 20,
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 5,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          width: Dimensions.get('window').width / 2.5,
        },
        buttonText: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: 10,
        },
        slider: {
          height: 75,
          width: Dimensions.get('window').width * 0.92,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: '#1F1F1F',
          borderRadius: 10,
          marginTop: 20,
        }
    })

export default styles;