import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { GlobalContextProvider } from "./Context"

import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"
import { useEffect } from "react"
import clogger from "./utils/logger"

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  useEffect(() => {
    clogger.info("App mounted ======================\n")
  }, [])

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <GlobalContextProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </GlobalContextProvider>
    )
  }
}
