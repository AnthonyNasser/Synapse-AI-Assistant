import { Dimensions, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000000",
  },
  separator: {
    height: 1,
    width: "80%",
  },
  loadingContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  inputContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  sendButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
})

export default styles
