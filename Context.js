import { createContext, useContext, useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import { getAPIKey, storeAPIKey, storeContext } from './utils/storage'
import { configureOpenAI } from './services/openai/config'
import clogger from './utils/logger'

const GlobalContext = createContext()

export function useGlobalContext() {
  return useContext(GlobalContext)
}

export function GlobalContextProvider({ children }) {
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('text-davinci-003')
  const [maxTokens, setMaxTokens] = useState(100)
  const [temperature, setTemperature] = useState(0.9)
  const [chatBoxes, setChatBoxes] = useState([])
  const [keyTested, setKeyTested] = useState(false)

  const [prompt, setPrompt] = useState('')

  const testAPIKey = async () => {
    if (apiKey !== '') {
      const configuration = new Configuration({
        apiKey: apiKey,
      })
      const openai = new OpenAIApi(configuration)
      // TODO: put this in the openai folder like textCompletion
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
            clogger.success("API Key set to: '" + apiKey + "'")
          }
        })
        .then(() => {
          clogger.success("API Key Tested: '" + keyTested ? 'Success' : 'Failure' + "'")
        })
        .catch((error) => {
          clogger.error("Error setting API Key: '" + apiKey + "'")
          setKeyTested(false)
        })
    } else {
      clogger.error('API Key is empty')
      setKeyTested(false)
    }
  }

  useEffect(() => {
    getAPIKey().then((value) => {
      if (value !== null) {
        setApiKey(value)
      }
    })
    configureOpenAI()
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
    prompt,
    setPrompt,
    model,
    setModel,
  }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}
