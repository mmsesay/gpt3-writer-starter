import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// create an instance of OpenAI
const openai = new OpenAIApi(configuration);

// this function will run the action and return the generated text
const generateAction = async (req, res) => {
  // will hold the base prompt
  const basePromptPrefix = `write a follow up email to ${req.body.recipientName} who works at ${req.body.recipientCompanyName} 
  about the ${req.body.jobTitle} job.My name is ${req.body.senderName} and share this additional info ${req.body.additionalInput}
  `;

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}`,
    temperature: 0.8,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
