import express from 'express';
import axios from 'axios';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


app.all('*', async (req, res) => 
    {
       
          console.log({data:req.body});
        req.send({data:req.body});
});

app.listen(PORT, () => {
    console.log(`Relay app is listening on port ${PORT}`);
});
