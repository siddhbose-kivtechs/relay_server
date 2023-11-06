import express from 'express';  
import axios from 'axios';  
import cors from 'cors';  
import bodyParser from 'body-parser';  
import helmet from 'helmet';  
import morgan from 'morgan';  
import openai from 'openai';  
import os from 'os';  
  
openai.api_type = "azure";  
openai.api_base = "https://ginel-gpt.openai.azure.com/";  
openai.api_version = "2023-07-01-preview";  
openai.api_key = os.getenv("OPENAI_API_KEY");  
  
const app = express();  
const PORT = process.env.PORT || 3000;  
app.use(cors());  
app.use(bodyParser.json());  
  
app.use(morgan('combined'));  
app.use(helmet());  
  
const OPENAI_API_ENDPOINT = `${openai.api_base}/openai/deployments/gpt-35-turbo-16k/chat/completions?api-version=${openai.api_version}`;  
  
app.all('*', async (req, res) => {  
  try {  
    const message = {  
      "messages": [{"role": "system","content": "You are an AI assistant that helps people find information." }]  
    };  
  
    const response = await axios.post(  
      OPENAI_API_ENDPOINT,  
      {  
        prompt: message,  
        max_tokens: 100,  
        temperature: 0.7,  
        top_p: 1.0,  
        frequency_penalty: 0.0,  
        presence_penalty: 0.6  
      },  
      {  
          headers: {  
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${openai.api_key}`  
        }  
      }  
    );  
  
    const answer = response.data.choices[0].text.trim();  
  
    res.json({ answer });  
  } catch (error) {  
    console.error('Error:', error);  
    res.status(500).json({ error: 'Internal server error' });  
  }  
});  
