import clogger from "../../utils/logger"
import { configureOpenAI } from "./config"

const makeTextCompletionRequest = async (
  apiKey: string,
  model: string,
  previousPrompts: string,
  prompt: string,
  previousResponses: string,
  temperature: number,
  max_tokens: number,
) => {
  const openai = configureOpenAI(apiKey)

  var res: string = "Empty Response"

  clogger.info("Making Text Completion Request...\n" + prompt + "\n")

  await openai
    .createCompletion({
      model: model,
      prompt: previousPrompts + previousResponses + prompt, // should look like "What is your name? ###endPrompt### My name is ###endResponse###"
      temperature: temperature,
      max_tokens: max_tokens,
      stop: ["###endPrompt###, ###endResponse###"],
    })
    .then((completion: any) => {
      clogger.info("Text Completion Request Results...\n" + completion.data.choices[0].text.toString() + "\n")
      res = completion.data.choices[0].text.toString()
      return completion.data.choices[0].text.toString()
    })
    .catch((error: any) => {
      clogger.error(error)
      res = "400"
      return "400"
    })

  return res
}

export default makeTextCompletionRequest
