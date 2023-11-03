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
        //  check wheter its data or not
        try {
        const jsonData = req.body;
          console.log({data:jsonData});
            //  check wheter its json or not
        try {
            JSON.parse(jsonData);
            console.log('Valid JSON');

            res.status(200).json(jsonData);
        } 
            //  json catch 
        catch (error) {
            console.log('Invalid JSON');
          
              res.status(200).json({data:jsonData});
        }


//  outer catch
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});
