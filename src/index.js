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
            data, { headers: { Authorization: `Bearer ${openaiKey}`, 'OpenAI-Version': openaiVersion } }
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
          console.log({data:jsonData});
        try {
            JSON.parse(jsonData);
            console.log('Valid JSON');

            res.status(200).json(jsonData);
        } 
        catch (error) {
            console.log('Invalid JSON');
          
              res.status(200).json({data:jsonData});
        }



    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});
