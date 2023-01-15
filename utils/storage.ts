import AsyncStorage from '@react-native-async-storage/async-storage'
import clogger from './logger'

export const ASYNCH_STORAGE_API_KEY = '@AYNCH_STORAGE_API_KEY'
export const ASYNCH_STORAGE_CONTEXT = '@AYNCH_STORAGE_CONTEXT'

export const getAPIKey = async () => {
  try {
    const value = await AsyncStorage.getItem('@AYNCH_STORAGE_API_KEY')
    if (value !== null) {
      clogger.info('API Key Retrieved: ', value)
      return value
    }
  } catch (e) {
    clogger.error('Error Retrieving State: ', e)
  }
}

export const storeAPIKey = async (value: string) => {
  try {
    await AsyncStorage.setItem(ASYNCH_STORAGE_API_KEY, value)
    clogger.success('API Key Stored.')
  } catch (e) {
    clogger.error('Error Saving State: ', e)
  }
}

export const getContext = async () => {
  try {
    const value = await AsyncStorage.getItem(ASYNCH_STORAGE_CONTEXT)
    if (value !== null) {
      clogger.info('Context Retrieved.')
      return value
    }
  } catch (e) {
    clogger.error('Error Retrieving State: ', e)
  }
}

export const storeContext = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(ASYNCH_STORAGE_CONTEXT, jsonValue)
    clogger.success('Context Stored.')
  } catch (e) {
    clogger.error('Error Saving State: ', e)
  }
}
