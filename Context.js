import { createContext, useContext, useEffect, useState } from 'react'

const GlobalContext = createContext()

export function useGlobalContext() {
  return useContext(GlobalContext)
}

export function GlobalContextProvider({ children }) {
  const [apiKey, setApiKey] = useState('')
  const [maxTokens, setMaxTokens] = useState(100)
  const [temperature, setTemperature] = useState(1)

  const value = { apiKey, setApiKey, maxTokens, setMaxTokens, temperature, setTemperature }

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}
