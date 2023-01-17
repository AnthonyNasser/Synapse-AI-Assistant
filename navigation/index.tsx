import { FontAwesome } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"
import { Alert, ColorSchemeName, Pressable } from "react-native"

import Colors from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"
import ModalScreen from "../screens/modal/ModalScreen"
import NotFoundScreen from "../screens/not-found/NotFoundScreen"
import ChatScreen from "../screens/chat/ChatScreen"
import SettingsScreen from "../screens/settings/SettingsScreen"
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types"
import LinkingConfiguration from "./LinkingConfiguration"
import { useGlobalContext } from "../Context"
import { storeContext } from "../utils/storage"

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    // TODO: implement light colortheme
    <NavigationContainer linking={LinkingConfiguration} theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()
  const context = useGlobalContext()

  return (
    <BottomTab.Navigator
      initialRouteName="Chat"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={({ navigation }: RootTabScreenProps<"Chat">) => ({
          title: "Chat",
          tabBarIcon: ({ color }) => <TabBarIcon name="comments-o" color={color} />,
          headerRight: () => (
            <>
              {context.chatBoxes.length > 0 && (
                <Pressable
                  onPress={() =>
                    Alert.alert("Are you sure you want to delete all messages?", "", [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          storeContext({ ...context, chatBoxes: [] })
                          context.clearChatBoxes()
                        },
                      },
                    ])
                  }
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <FontAwesome name="trash" size={25} color="#FFFFFF" style={{ marginRight: 15 }} />
                </Pressable>
              )}
            </>
          ),
        })}
      />
      <BottomTab.Screen
        name="Settings" // TODO: fix this
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
