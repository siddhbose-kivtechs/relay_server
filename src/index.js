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
    return response;  
  } catch (error) {  
    console.error(error);  
    return error;  
  }  
}  
  
app.all('*', async (req, res) => {  
// if(){
  //   const data = {  
  //     engine,  
  //     prompt: req.body.prompt,  
  //     max_tokens: 100,  
  //     temperature: 1,  
  //     top_p: 0.5,  
  //     frequency_penalty: 0,  
  //     presence_penalty: 0,  
  //   };  
  // console.log(data);
  //   try {  
  //     const response = await fetchCompletion(data);  
  //     res.json(response.data);  
  //   } 
  //   catch (error) {  
  //     res.status(500).json({ error: 'Internal Server Error' });  
  //   }  
  // }
  //       else {  
  //   res.status(404).json({ error: 'Route not found' });  
  // }  

  res.send(req.bpdy);
});  
  
app.listen(PORT, () => {  
  console.log(`Relay app is listening on port ${PORT}`);  
});  
