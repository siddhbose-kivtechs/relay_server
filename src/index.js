import express from 'express';  
import axios from 'axios';  
import cors from 'cors';  
  
const openaiUrl = 'https://genos.openai.azure.com/';  
const openaiVersion = '2023-09-15-preview';  
const openaiKey = process.env.OPENAI_API_KEY;  
const engine = 'gpt-35-turbo';  
  
const app = express();  
const PORT = process.env.PORT || 3000;  
app.use(cors());  
app.use(express.json());  
  
async function fetchCompletion(data) {  
  try {  
    const response = await axios.post(  
      `${openaiUrl}v1/engines/${engine}/completions`,  
      data,  
      { headers: { Authorization: `Bearer ${openaiKey}`, 'OpenAI-Version': openaiVersion } }  
    );  
    console.log(response);  
    return response.data;  
  } catch (error) {  
    console.error(error);  
    throw error;  
  }  
}  
  
app.all('*', async (req, res) => {  
  try {  
    const jsonData = req.body;  
    const parsedData = JSON.parse(jsonData);  
  
    // if (parsedData && parsedData.messages && Array.isArray(parsedData.messages)) {  
    //   const messages = parsedData.messages;  
    //   const prompt = messages.map((message) => message.content).join('\n');  
    //   console.log(prompt);
  
    //   if (prompt && parsedData.model) {  
    //     const data = {  
    //       engine: parsedData.model,  
    //       prompt,  
    //       max_tokens: 100,  
    //       temperature: parsedData.temperature || 1,  
    //       top_p: parsedData.top_p || 0.5,  
    //       frequency_penalty: parsedData.frequency_penalty || 0,  
    //       presence_penalty: parsedData.presence_penalty || 0,  
    //     };  
    console.log(parsedData);
  
        // const response = await fetchCompletion(data);  
        // res.json(response);  
        res.json(parsedData);
        return;  
      }  
    }  
  
    // Block relay to OpenAI if required parameters are not present  
    res.status(400).json({ error: 'Invalid request' });  
  } catch (error) {  
    console.error(error);  
    res.status(500).json({ error: 'Internal Server Error' });  
  }  
});  
  
app.listen(PORT, () => {  
  console.log(`Relay app is listening on port ${PORT}`);  
});  
