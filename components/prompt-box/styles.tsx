import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginVertical: "3%",
        justifyContent: 'center'
    },
    textStyle: {
        color: '#ccc',
        fontSize: 18,
        flex: 1,
        fontWeight: 'bold',
    },
    avatar: {
        alignSelf: 'flex-start',
        paddingHorizontal: "3%",
    },
    arrowIcon: {
        padding: 0,
        color: '#4B4B4B'
    }
})

export default styles
