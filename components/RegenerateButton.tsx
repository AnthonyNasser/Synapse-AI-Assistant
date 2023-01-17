import { View, Text, Pressable, Dimensions, Animated } from "react-native"
import React from "react"
import { FontAwesome5 } from "@expo/vector-icons"

type RegenerateButtonProps = {
  onPress: () => void
}

export default function RegenerateButton(props: RegenerateButtonProps) {
  const { onPress } = props
  const [fadeAnim] = React.useState(new Animated.Value(0)) // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          backgroundColor: "#000000",
          borderColor: "#FFF",
          borderWidth: 1,
          marginVertical: 20,
          width: Dimensions.get("window").width * 0.7,
          borderRadius: 10,
          padding: 15,
          // fade in animation
        }}
        onPress={onPress}
      >
        <Text
          style={{
            color: "#FFF",
            fontWeight: "bold",
            fontSize: 14,
            marginRight: 10,
          }}
        >
          Regenerate
        </Text>
        <FontAwesome5 name="retweet" size={20} color="#FFF" style={{}} />
      </Pressable>
    </Animated.View>
  )
}
