import express from 'express';
// import axios or got instead of node-fetch
import axios from 'axios';
import cors from 'cors';
const openaiUrl = 'https://genos.openai.azure.com/';  
const openaiVersion = '2023-09-15-preview';  
const openaiKey = process.env.OPENAI_API_KEY;  
const engine = 'gpt-35-turbo'; 

const app = express();
  
async function fetchCompletion() {  
  try {  
    const response = await axios.post(`${openaiUrl}v1/engines/${engine}/completions`, data, { headers: headers });  
    return response;
    console.log(response);  
  } catch (error) {  
    console.error(error);  
    return error;
  }  
}  
  
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use('*', async (req, res) => {  
    const headers = {  
  'Content-Type': 'application/json',  
  'Authorization': `Bearer ${openaiKey}`,  
  'OpenAI-Version': openaiVersion  
};  
  
const data = {  
  'engine': engine,  
  'prompt': '',  
  'max_tokens': 100,  
  'temperature': 1,  
  'top_p': 0.5,  
  'frequency_penalty': 0,  
  'presence_penalty': 0  
}; 
 res.send(fetchCompletion());  
}); 




  
 
  
 




app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
