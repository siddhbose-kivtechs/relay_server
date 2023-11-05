import express from 'express';  
import axios from 'axios';  
import cors from 'cors';  
import { createClient } from "@supabase/supabase-js";  
import { ulid } from 'ulid';  
import bodyParser from 'body-parser';   
import helmet from 'helmet';  
import morgan from 'morgan';  
import openai from 'openai';    
  
  
const app = express();  
const PORT = process.env.PORT || 3000;  
app.use(cors());  
app.use(bodyParser.json());    
  
app.use(morgan('combined'));  
app.use(helmet());  
  
const supabaseUri = process.env.SUPABASE_URI;    
const supabaseKey = process.env.SUPABASE_KEY;    
const supabase = createClient(supabaseUri, supabaseKey);    
  
const parse_data = (data) => {    
  const keysArr = Object.keys(data);    
  console.log(keysArr);  
  const jsonLength = keysArr.length;    
  console.log(jsonLength);   
}  
  
const verify_data = (data) => {  
  try {    
    JSON.parse(data);    
    console.log('Valid JSON');  
    return true;    
  }  
  catch (error) {    
    console.log(' Not a valid JSON');  
    return false;    
  }    
}  
  
const apiKey = process.env.AZURE_KEY;  
  
async function invokeOpenAIEndpoint(message) {    
  const endpoint='https://ginel-gpt.openai.azure.com/openai/deployments/gpt-35-turbo-16k/chat/completions?api-version=2023-07-01-preview';  
    
  try {    
    const response = await axios.post(endpoint, {    
      prompt: message,    
      model: 'gpt-35-turbo-16k',    
      max_tokens: 800,    
      temperature: 0.7,    
      top_p: 0.95,    
      frequency_penalty: 0,    
      presence_penalty: 0    
    }, {    
      headers: {    
        'Content-Type': 'application/json',    
        'Authorization': `Bearer ${apiKey}`    
      }    
    });    
    
    return response.data.choices[0].text.trim();    
  } catch (error) {    
    console.error('Error invoking OpenAI endpoint:', error);    
    throw error;    
  }    
}    
  
const check_azure = async (data) => {    
  try {    
    const { messages, model, temperature, presence_penalty } = data;    
    
    const prompt = messages.map(message => `${message.role}: ${message.content}`).join('\n');    
    const openAIRequest = {    
      prompt,    
      model,    
      temperature,    
      presence_penalty    
    };    
    
    const response = await invokeOpenAIEndpoint(openAIRequest);    
    return response;  
  } catch (error) {    
    console.error('Error processing request:', error);    
    return 'ERROR occured';  
  }    
} 



// verify if it matches the open ai form 

function isValidFormat(data) {  
  if (!data) return false;  
  if (!Array.isArray(data.messages)) return false;  
  for (let msg of data.messages) {  
    if (typeof msg !== 'object' || !msg.role || !msg.content) return false;  
  }  
  if (typeof data.stream !== 'boolean') return false;  
  if (typeof data.model !== 'string') return false;  
  if (typeof data.temperature !== 'number') return false;  
  if (typeof data.presence_penalty !== 'number') return false;  
    
  return true;  
}  

// ***  ALL METHOD***

app.all("*", async(req, res) => {  
  const data = req.body;  
  
  if (verify_data && typeof data === 'object' && data) {    
    const jsonString = JSON.stringify(data);  
    const strippedStr = jsonString.replace(/`/g, '');    
    // res.send({ type: 'json data', data: strippedStr });   
      
    // console.log({ type: 'json data', data: strippedStr });
     // parse_data(strippedStr);
      // res.json('Hello ');
      res.send(isValidFormat(strippedStr));
      // res.send(check_azure(strippedStr));
      console.log('JSON DATA');
      
  } else {    
    res.json({ type: 'not a json data', data: data });    
    console.log({ type: 'not a json data', data: data });  
  }



    let log = {
    status: "ok",
    url: req.originalUrl,
    ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    request_body: req.body,
    request_method: req.method,
    lat: req.headers['x-vercel-ip-latitude'],
    lon: req.headers['x-vercel-ip-longitude'],
    city: req.headers['x-vercel-ip-city'],
    region: req.headers['x-vercel-ip-country-region'],
    country: req.headers['x-vercel-ip-country'],
    UA: req.headers['user-agent'],
    // uuid: uuidv4(),
    date_time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
    ulid: ulid()
  };

   // console.log(log);

  // Insert the log entry into Supabase
  const { data: logEntry, error } = await supabase
    .from("logs")
    .insert([log]);

if (error) {  
  console.error("Error inserting log:", error);  
  // Handle the error  
} 
else {  
  // Access the inserted data  
  console.log("Log entry inserted:", logEntry);  
}  
    const parsedData = JSON.parse(strippedStr);  
    console.log(parsedData);  
});  
  


app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});


