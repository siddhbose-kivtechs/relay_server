import express from 'express';
// import axios or got instead of node-fetch
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use('*', async (req, res) => {  
    const text = req.body.text;  
      
    const azureOpenAIPayload = {  
        "documents": [{  
            "language": "en",  
            "id": "1",  
            "text": text  
        }]  
    };  
      
    try {  
        const response = await axios.post('https://YOUR_RESOURCE_NAME.cognitiveservices.azure.com/text/analytics/v3.1-preview.5/languages', azureOpenAIPayload, {  
            headers: {  
                'Ocp-Apim-Subscription-Key': 'YOUR_AZURE_OPENAI_KEY'  
            }  
        });  
          
        res.send(response.data);  
    } catch (error) {  
        res.status(500).send(error.message);  
    }  
}); 

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
