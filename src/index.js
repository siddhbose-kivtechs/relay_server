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
  
const messages = [
  { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
  { role: "user", content: "Can you help me?" },
  { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
  { role: "user", content: "What's the best way to train a parrot?" },
];
  
async function getChatbotResponse() {
  console.log("== Chat Completions Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "gpt-35-turbo-16k";
  const result = await client.getChatCompletions(deploymentId, messages);

  for (const choice of result.choices) {
    console.log(choice.message);
    return (choice.message);
  }
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
