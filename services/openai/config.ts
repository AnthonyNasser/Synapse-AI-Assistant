import { Configuration, OpenAIApi } from 'openai'

// TODO: There's probably a better way to do this
export const configureOpenAI = (apiKey: string) => {
  const configuration = new Configuration({
    apiKey: apiKey,
  })
  return new OpenAIApi(configuration)
}
