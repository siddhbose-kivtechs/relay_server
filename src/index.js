import express from 'express';    
import axios from 'axios';    
import cors from 'cors';  
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

const OPENAI_API_ENDPOINT = 'https://ginel-gpt.openai.azure.com/openai/deployments/gpt-35-turbo-16k/chat/completions?api-version=2023-07-01-preview';  
const OPENAI_API_KEY = process.env.AZURE_KEY;  


  
app.all('*', async (req, res) => {  
  try {  
    const  message = {"messages": [{"role": "system","content": "You are an AI assistant that helps people find information." }];
      
    // Make a request to the Azure OpenAI API  
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
          'Authorization': `Bearer ${OPENAI_API_KEY}`  
        }  
      }  
    );  
      
    const answer = response.data.choices[0].text.trim();  
      
    // Return the answer to the client  
    res.json({ answer });  
  } catch (error) {  
    console.error('Error:', error);  
    res.status(500).json({ error: 'Internal server error' });  
  }  
});  
  
app.listen(3000, () => {  
  console.log('Server running on port 3000');  
});  
