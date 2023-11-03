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


app.all('*', async (req, res) => 
    {
         let jsonData = req.body;
          console.log({data:jsonData});
        req.send(jsonData);
});

app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});
