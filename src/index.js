import express from 'express';    
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";    
import cors from 'cors';    
import { createClient } from "@supabase/supabase-js";    
import { ulid } from 'ulid';    
import bodyParser from 'body-parser';     
import helmet from 'helmet';    
import morgan from 'morgan';    

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.use(morgan('combined'));
app.use(helmet());

const supabaseUri = process.env.SUPABASE_URI;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUri, supabaseKey);


// Load the .env file if it exists
import dotenv from "dotenv/config";


// You will need to set these environment variables or edit the following values
const endpoint = process.env.ENDPOINT;
const azureApiKey = process.env.AZURE_KEY;
  
const messages = [
  { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
  { role: "user", content: "Can you help me?" },
  { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
  { role: "user", content: "What's the best way to train a parrot?" },
];


function isValidFormat(message) {  
    if (typeof message !== 'object') return false; // Check if message is an object first.  
    if (!message.role || !message.content) return false;  
  
    return true;  
}  


// async function getChatbotResponse(messages) {
//   console.log("== Chat Completions Sample ==");

//   const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
//   const deploymentId = "gpt-35-turbo-16k";
//   const result = await client.getChatCompletions(deploymentId, messages);

//   for (const choice of result.choices) {
//     console.log(choice.message);
//     return (choice.message);
//   }
// }
async function getChatbotResponse(message) {
 

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "gpt-35-turbo-16k";
  const result = await client.getCompletions(deploymentId, message, { maxTokens: 128 });

  for (const choice of result.choices) {
    console.log(choice.text);
  }
}
  
app.all("*", async (req, res) => {  
      const data = req.body;
    const jsonString = JSON.stringify(data);
    const strippedStr = jsonString.replace(/`/g, '');

    if (!data.messages || !Array.isArray(data.messages)) {
        res.send('No messages found in request body');
        return;
    }
  else
    {
      // let message=[{"role": "system", "content": "You are an AI assistant that helps people find information."} ];
     const message=[ { "role": "user", "content": "hi: } ];
      res.send(getChatbotResponse(message));
      console.log(data.messages);
      // res.send(data);
      
    }
  // res.send(strippedStr);
  // try {  
  //    const message=req.body;
    
  //      if (isValidFormat(message)) {  
  //       // const response = await invokeOpenAIEndpoint(message.content); // Pass message.content if OpenAI endpoint expects a string.  
  //       // const response = await generateResponse(message.content); 
  //        // const response = await generateResponse(message); 
  //       res.send(message);  
  //   }
  //      else {  
  //       res.send('Invalid message format');  
  //   }  
  //   // const response = await getChatbotResponse();  
  //   // res.send(response);  
  // } catch (error) {  
  //   console.error("Error:", error);  
  //   res.status(500).send("Internal Server Error");  
  // }  
});  
  
app.listen(PORT, () => {  
  console.log(`Server listening on port ${PORT}`);  
});  
