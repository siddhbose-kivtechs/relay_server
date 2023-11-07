import express from 'express';  
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";  
import cors from 'cors';  
import { createClient } from "@supabase/supabase-js";  
import { ulid } from 'ulid';  
import bodyParser from 'body-parser';  
import helmet from 'helmet';  
import morgan from 'morgan';  
import dotenv from "dotenv/config";  
  
const app = express();  
const PORT = process.env.PORT || 3000;  
app.use(cors());  
app.use(bodyParser.json());  
app.use(morgan('combined'));  
app.use(helmet());  
  
const supabaseUri = process.env.SUPABASE_URI;  
const supabaseKey = process.env.SUPABASE_KEY;  
const supabase = createClient(supabaseUri, supabaseKey);  
  
// You will need to set these environment variables or edit the following values  
const endpoint = process.env.ENDPOINT;  
const azureApiKey = process.env.AZURE_KEY;  
  
const mess = [  
  { role: "system", content: "You are a helpful assistant." }];
  
function isValidFormat(message) {  
  if (typeof message !== 'object') return false; // Check if message is an object first.  
  if (!message.role || !message.content) return false;  
  return true;  
}  
  
// async function getChatbotResponse(message) {  
//   const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));  
//   const deploymentId = "gpt-35-turbo-16k";  
//   const result = await client.getCompletions(deploymentId, message, { maxTokens: 128 });  
//   for (const choice of result.choices) {  
//     console.log(choice.text);  
//   }  
// }  
async function getChatbotResponse(messa) {
  //  generate messages ultitlizing both the mess string and the user request
const messages = [...mess,...messa];  

  console.log(messages);

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "gpt-35-turbo-16k";
  const result = await client.getChatCompletions(deploymentId, messages);

  for (const choice of result.choices) {
    console.log(choice.message);
    return (choice.message);
  }
}

function test(messa)
{
return messa;
}

  
app.all("*", async (req, res) => {  
  const data = req.body;  
  const jsonString = JSON.stringify(data);  
  const strippedStr = jsonString.replace(/`/g, '');  
  
  if (!data.messages || !Array.isArray(data.messages)) {  
    res.send('No messages found in request body');  
    return;  
  } else {  
 
    res.send(getChatbotResponse(data.messages));
    // res.send(test(data.messages));

  }  
}); 


  
app.listen(PORT, () => {  
  console.log(`Server listening on port ${PORT}`);  
});  
