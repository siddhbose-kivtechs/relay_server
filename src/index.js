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

// Helper function to check the validity of the request structure  
function isValidRequest(requestData) {  
  // Implement your checks here based on the expected structure of the request data  
  // Return true if the request structure is valid, false otherwise  
  // For example:  
  if (  
    requestData &&  
    requestData.messages &&  
    Array.isArray(requestData.messages) &&  
    requestData.messages.length > 0 &&  
    typeof requestData.model === 'string' &&  
    typeof requestData.temperature === 'number' &&  
    typeof requestData.presence_penalty === 'number'  
  ) 
  {  
    return true;  
  }  
  return false;  
});  

app.all('*', async (req, res) => 
    {
         let jsonData = req.body;
          console.log({data:jsonData});
        req.send(jsonData);
});

app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});
