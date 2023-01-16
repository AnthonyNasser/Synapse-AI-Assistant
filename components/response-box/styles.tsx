import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    box: {
        backgroundColor: "#1C1C1C",
        flexDirection: 'column',
        width: "100%",
        borderColor: '#bfbfbf' + '50',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: "2%",
        alignItems: "center",
        justifyContent: "center"
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#1C1C1C",
    },
    avatar: {
        paddingHorizontal: "3.3%"
    },
    textStyle: {
        color: '#bfbfbf',
        fontSize: 16,
        flex: 1,
        paddingRight: "3%"
    },
    iconContainer: {
        flex: 1,
        alignSelf: "flex-end",
        backgroundColor: "#1C1C1C",
        paddingHorizontal: "2%",
        marginTop: "1%"
    }
})

export default styles;