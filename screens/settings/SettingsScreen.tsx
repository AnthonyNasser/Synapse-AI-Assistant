import { Entypo, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { Dimensions, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import styles from "./styles"

import { Text, View } from "../../components/Themed"
import Slider from "@react-native-community/slider"
import { useGlobalContext } from "../../Context"
import { RootTabScreenProps } from "../../types"
import { useEffect, useState } from "react"
import { getContext, storeContext } from "../../utils/storage"
import ScreenLoader from "../../components/ScreenLoader"
// import clogger from "../../utils/logger"

export default function SettingsScreen({ navigation }: RootTabScreenProps<"Chat">) {
  const context = useGlobalContext()
  const [screenLoading, setScreenLoading] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setScreenLoading(true)
    getContext().then((storedContext: any) => {
      if (storedContext) {
        const { apiKey, temperature, maxTokens, keyTested, model } = JSON.parse(storedContext)

        context.setApiKey(apiKey)
        context.setTemperature(temperature)
        context.setModel(model)
        context.setMaxTokens(maxTokens)
        context.setKeyTested(keyTested)
      }
    })
    setScreenLoading(false)
  }, [])

  useEffect(() => {
    storeContext(context)
  }, [context])

  return (
    <>
      {screenLoading ? (
        <ScreenLoader />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
            {context.keyTested ? (
              <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#000000" }}>
                <Text style={styles.title}>
                  API Key: {context.apiKey.substring(0, 5) + "..." + context.apiKey.substring(context.apiKey.length - 5)}
                </Text>
                <FontAwesome5 name="check-circle" size={24} style={{ marginLeft: 10 }} color="green" />
              </View>
            ) : (
              <>
                <TextInput
                  value={context.apiKey}
                  onChangeText={(text: string) => {
                    context.setApiKey(text)
                  }}
                  placeholder="Enter API Key"
                  placeholderTextColor="#5a5a5a"
                  style={{ ...styles.textInput, borderColor: !context.keyTested ? "#ba000d" : "green" }}
                />
                {/* <Pressable
                  onPress={() =>
                    navigation.navigate('Modal', {
                      parameter: 'API Key',
                      description: ``,
                      navigation: navigation,
                    } as any)
                  }
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <FontAwesome5 name="question-circle" size={25} color="#FFF" />
                </Pressable>
              </> */}
              </>
            )}
          </View>
          {!loading ? (
            <>
              {!context.keyTested ? (
                <View style={styles.apiButtonContainer}>
                  <TouchableOpacity
                    onPress={async () => {
                      if (context.apiKey) {
                        setLoading(true)
                        context.onSave()
                        await context.testAPIKey()
                        setLoading(false)
                      }
                    }}
                    style={styles.button}
                  >
                    <FontAwesome5 name="key" size={25} color="white" />
                    <Text style={styles.buttonText}>Save Key</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      navigation.navigate("Modal", {
                        parameter: "API Key",
                        description: ``,
                        navigation: navigation,
                      } as any)
                    }}
                    style={styles.button}
                  >
                    <FontAwesome5 name="question-circle" size={25} color="white" />
                    <Text style={styles.buttonText}>Get a Key</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={async () => {
                    setLoading(true)
                    context.setKeyTested(false)
                    setLoading(false)
                  }}
                  style={styles.button}
                >
                  <FontAwesome5 name="key" size={25} color="white" />
                  <Text style={styles.buttonText}>Change Key</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 20, marginTop: 10 }}>Testing Your Key...</Text>
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              GPT-3 Model ={" "}
              {context.model === "text-davinci-003"
                ? "Davinci"
                : context.model === "text-curie-001"
                ? "Curie"
                : context.model === "text-babbage-001"
                ? "Babbage"
                : context.model === "text-ada-001"
                ? "Ada"
                : "Davinci"}
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate("Modal", {
                  parameter: "Select GPT-3 Model",
                  description: `Davinci (Max tokens per request: 4,000)
                  \nDavinci is the most advanced version of the GPT-3 model and is able to perform any task that the other models can do, with an added advantage of producing higher quality and longer output, and following instructions better. It also includes the feature to insert completions within text. The model is named after the famous artist, scientist, and inventor Leonardo da Vinci, who is considered a true "Renaissance man" for his numerous talents and achievements in a wide variety of fields. Training data goes up to June 2021.
                  \n\nCurie (Max tokens per request: 2,048)
                  \nVery capable, but faster than Davinci. Named after Marie Curie, a Polish-born scientist who made pioneering research on radioactivity and became the first woman to win a Nobel Prize, and the first person to win two Nobel Prizes in different sciences. She was known for her work on the discovery of radium and polonium, and her pioneering research in the field of radioactivity. Training data goes up to October 2019.
                  \n\nBabbage (Max tokens per request: 2,048)
                  \nCapable of straightforward tasks and very fast. named after Charles Babbage, an English mathematician, inventor and mechanical engineer who originated the concept of a programmable computer. He is credited with designing the first mechanical computer, which he called the "Analytical Engine". Although the machine was never built during his lifetime, Babbage's ideas about computer design laid the foundation for the development of the modern computer. Training Data goes up to October 2019.
                  \n\nAda (Max tokens per request: 2,048)
                  \nThe most basic version of the GPT-3 model. It is capable of performing simple tasks, but is not as capable as the other models. Named after Ada Lovelace, an English mathematician and writer who is credited as the world's first computer programmer for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine. Her notes on the engine include what is recognized as the first published algorithm intended to be processed by a machine. Ada's work on the engine, including her notes, are considered the first published algorithm intended to be processed by a machine, and as such she is considered the first computer programmer. Training data goes up to October 2019.
                  `,
                  navigation: navigation,
                } as any)
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome5 name="question-circle" size={25} color="white" />
            </Pressable>
          </View>
          <View style={{ flexDirection: "row", alignSelf: "flex-start", marginTop: 20, backgroundColor: "#000000" }}>
            <Pressable
              style={{
                width: (Dimensions.get("window").width * 0.92) / 2.3,
                flexDirection: "row",
                backgroundColor: context.model === "text-davinci-003" ? "white" : "#1F1F1F",
                height: 75,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginLeft: 20,
                borderRadius: 10,
                marginRight: 25,
              }}
              onPress={() => {
                context.setModel("text-davinci-003")
              }}
            >
              <FontAwesome5 name="paint-brush" size={25} color={context.model === "text-davinci-003" ? "#1F1F1F" : "white"} style={{}} />
              <Text style={{ ...styles.title, color: context.model === "text-davinci-003" ? "#1F1F1F" : "white" }}>Davinci</Text>
            </Pressable>
            <Pressable
              style={{
                width: (Dimensions.get("window").width * 0.92) / 2.3,
                flexDirection: "row",
                backgroundColor: context.model === "text-curie-001" ? "white" : "#1F1F1F",
                height: 75,
                alignItems: "center",
                justifyContent: "flex-start",
                alignSelf: "center",
                paddingHorizontal: 10,

                borderRadius: 10,
              }}
              onPress={() => {
                context.setModel("text-curie-001")
              }}
            >
              <FontAwesome5 name="atom" size={25} color={context.model === "text-curie-001" ? "#1F1F1F" : "white"} style={{ marginLeft: 25 }} />
              <Text style={{ ...styles.title, color: context.model === "text-curie-001" ? "#1F1F1F" : "white" }}>Curie</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: "row", alignSelf: "flex-start", marginTop: 20, backgroundColor: "#000000" }}>
            <Pressable
              style={{
                width: (Dimensions.get("window").width * 0.92) / 2.3,
                flexDirection: "row",
                backgroundColor: context.model === "text-babbage-001" ? "white" : "#1F1F1F",
                height: 75,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginLeft: 20,
                borderRadius: 10,
                marginRight: 25,
              }}
              onPress={() => {
                context.setModel("text-babbage-001")
              }}
            >
              <MaterialCommunityIcons name="abacus" size={25} color={context.model === "text-babbage-001" ? "#1F1F1F" : "white"} style={{}} />
              <Text style={{ ...styles.title, color: context.model === "text-babbage-001" ? "#1F1F1F" : "white" }}>Babbage</Text>
            </Pressable>
            <Pressable
              style={{
                width: (Dimensions.get("window").width * 0.92) / 2.3,
                flexDirection: "row",
                backgroundColor: context.model === "text-ada-001" ? "white" : "#1F1F1F",
                height: 75,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 10,
              }}
              onPress={() => {
                context.setModel("text-ada-001")
              }}
            >
              <Entypo name="classic-computer" size={25} color={context.model === "text-ada-001" ? "#1F1F1F" : "white"} style={{}} />
              <Text style={{ ...styles.title, color: context.model === "text-ada-001" ? "#1F1F1F" : "white" }}>Ada</Text>
            </Pressable>
          </View>
          {/* <Picker
            selectedValue={context.model}
            style={{
              width: Dimensions.get('window').width * 0.92,
              color: 'white',
              backgroundColor: '#1F1F1F',
              borderRadius: 10,
              borderColor: 'white',
              marginTop: 20,
              alignSelf: 'center',
              height: Dimensions.get('window').height / 5,
              flex: 1,
            }}
            itemStyle={{ color: 'white' }}
            dropdownIconColor="white"
            numberOfLines={2}
            focusable={true}
            onValueChange={(itemValue, itemIndex) => context.setModel(itemValue)}
          >
            <Picker.Item label="Davinci" value="text-davinci-003" />
            <Picker.Item label="Curie" value="text-curie-001" />
            <Picker.Item label="Babbage" value="text-babbage-001" />
            <Picker.Item label="Ada" value="text-ada-001" />
          </Picker> */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Max Tokens = {context.maxTokens}</Text>
            <Pressable
              onPress={() =>
                navigation.navigate("Modal", {
                  parameter: "Max Tokens",
                  description: `In OpenAI's API, the "max_tokens" parameter determines the maximum number of tokens (i.e., words and word pieces) that the model will consider when generating text. This can be used to limit the length of the generated text or to ensure that the model does not spend too much time or computational resources on a single request.
        \nOne reason you might want to limit the number of tokens in your OpenAI queries is to save time and resources. Generating long pieces of text can be computationally expensive, and if you only need a short piece of text or are making many requests in a short period of time, limiting the number of tokens can help you stay within your usage limits and avoid running out of resources. Limiting the number of tokens can also be useful if you want to ensure that the model stays focused on a specific topic or prompt and does not generate unrelated or tangential text.`,
                  navigation: navigation,
                } as any)
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome5 name="question-circle" size={25} color="white" />
            </Pressable>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={16}
            maximumValue={2048}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FFFFFF"
            value={context.maxTokens}
            onValueChange={(value) => context.setMaxTokens(value)}
            step={16}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Temperature = {context.temperature.toFixed(2)}</Text>
            <Pressable
              onPress={() =>
                navigation.navigate("Modal", {
                  parameter: "Temperature",
                  description: `The temperature parameter in OpenAI determines how random or certain the model's predictions will be.
                \nA higher temperature will cause the model to produce more diverse and random predictions. This can be useful in certain situations, such as when you want the model to explore a wider range of possibilities or be less predictable. However, a higher temperature can also cause the model to make more mistakes and produce less accurate predictions, so it's important to use it carefully.
                \nA lower temperature will cause the model to be more certain and confident in its predictions. This can be useful in situations where you want the model to be more reliable and accurate, but it can also make the model's output less diverse and more predictable. It's important to find the right balance between high and low temperatures depending on your specific needs.
                `,
                  navigation: navigation,
                } as any)
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome5 name="question-circle" size={25} color="white" />
            </Pressable>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0.1}
            maximumValue={1.0}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor="#FFFFFF"
            value={context.temperature}
            onValueChange={(value) => context.setTemperature(value)}
            step={0.1}
          />
        </ScrollView>
      )}
    </>
  )
}
