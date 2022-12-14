import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// create an instance of OpenAI
const openai = new OpenAIApi(configuration);

// this function will run the action and return the generated text
const generateAction = async (req, res) => {
  const {
    recipientName,
    recipientCompanyName,
    jobTitle,
    senderName,
    additionalInput,
    emailType,
  } = req.body;

  let prompt = "";

  // will hold the base prompt
  const followUpPrompt = `write a follow up email to ${recipientName} who works at ${recipientCompanyName} 
  about the ${jobTitle} job.My name is ${senderName} and share this additional info ${additionalInput}
  `;

  const jobApplicationPrompt = `
  write a job application to the ${recipientName} at ${recipientCompanyName} company for the ${jobTitle} position. 
  Please inform them kindly, that my name is ${senderName}. ${additionalInput}`;

  if (emailType === "followUp") {
    prompt = followUpPrompt;
  }

  if (emailType === "jobApplication") {
    prompt = jobApplicationPrompt;
  }

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    temperature: 0.8,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
