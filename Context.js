import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useContext, useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'

const GlobalContext = createContext()

export function useGlobalContext() {
  return useContext(GlobalContext)
}

export const ASYNCH_STORAGE_API_KEY = '@AYNCH_STORAGE_API_KEY'

export function GlobalContextProvider({ children }) {
  const [apiKey, setApiKey] = useState('')
  const [maxTokens, setMaxTokens] = useState(100)
  const [temperature, setTemperature] = useState(0.9)
  const [chatBoxes, setChatBoxes] = useState([])
  const [keyTested, setKeyTested] = useState(null)

  const getAPIKey = async () => {
    try {
      const value = await AsyncStorage.getItem('@AYNCH_STORAGE_API_KEY')
      if (value !== null) {
        setApiKey(value)
      }
    } catch (e) {
      console.error('Error Retrieving State: ', e)
    }
  }

  const storeAPIKey = async (value) => {
    try {
      await AsyncStorage.setItem(ASYNCH_STORAGE_API_KEY, value)
    } catch (e) {
      console.error('Error Saving State: ', e)
    }
  }

  const testAPIKey = async () => {
    if (apiKey !== '') {
      const configuration = new Configuration({
        apiKey: apiKey,
      })
      const openai = new OpenAIApi(configuration)
      await openai
        .createCompletion({
          model: 'text-davinci-003',
          prompt: 'This is a test.',
          temperature: 0.9,
          max_tokens: 5,
        })
        .then((completion) => {
          if (completion.status === 200) {
            setKeyTested(true)
          }
          console.log(keyTested)
        })
        .catch((error) => {
          console.error(error)
          setKeyTested(false)
          console.log(keyTested)
        })
    }
  }

  useEffect(() => {
    getAPIKey()
  }, [])

  const clearChatBoxes = () => {
    setChatBoxes([])
  }

  const onSave = () => {
    storeAPIKey(apiKey)
  }

  const value = {
    apiKey,
    setApiKey,
    maxTokens,
    setMaxTokens,
    temperature,
    setTemperature,
    chatBoxes,
    setChatBoxes,
    clearChatBoxes,
    onSave,
    keyTested,
    setKeyTested,
    testAPIKey,
  }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}
