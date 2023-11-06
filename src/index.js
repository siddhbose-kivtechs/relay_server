import express from 'express';    
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";  
  
// Rest of your code...  


// Load the .env file if it exists
import dotenv from "dotenv/config";
const app = express();  
const port = 3000;  

// You will need to set these environment variables or edit the following values
const endpoint = process.env.ENDPOINT;
const azureApiKey = process.env.AZURE_KEY;
  
const prompt = ["What is Azure OpenAI?"];  
  
async function getChatbotResponse() {  
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));  
  const deploymentId = "text-davinci-003";  
  const result = await client.getCompletions(deploymentId, prompt, { maxTokens: 128 });  
  
  let chatbotResponse = "";  
  for (const choice of result.choices) {  
    chatbotResponse += choice.text;  
  }  
  
  return chatbotResponse;  
}  
  
app.all("*", async (req, res) => {  
  try {  
    const response = await getChatbotResponse();  
    res.send(response);  
  } catch (error) {  
    console.error("Error:", error);  
    res.status(500).send("Internal Server Error");  
  }  
});  
  
app.listen(port, () => {  
  console.log(`Server listening on port ${port}`);  
});  
